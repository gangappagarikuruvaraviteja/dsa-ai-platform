package com.dsaeasy.backend.controller;

import com.dsaeasy.backend.model.AuthToken;
import com.dsaeasy.backend.model.Profile;
import com.dsaeasy.backend.model.User;
import com.dsaeasy.backend.repository.AuthTokenRepository;
import com.dsaeasy.backend.repository.ProfileRepository;
import com.dsaeasy.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

record AuthRequest(String email, String password, String username) {}
record LoginResponse(String token, Map<String, Object> user) {}
record ResetRequest(String token, String newPassword) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final AuthTokenRepository authTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private static final long TOKEN_TTL_DAYS = 7;

    public AuthController(UserRepository userRepository,
                          ProfileRepository profileRepository,
                          AuthTokenRepository authTokenRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.authTokenRepository = authTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest req) {
        if (req == null || isBlank(req.email()) || isBlank(req.password()) || isBlank(req.username())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email, username, and password are required"));
        }
        if (req.password().length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password must be at least 6 characters"));
        }

        String email = req.email().trim().toLowerCase();
        String username = req.username().trim();

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already in use"));
        }
        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username already in use"));
        }

        var user = new User(email, passwordEncoder.encode(req.password()), username, username);
        userRepository.save(user);
        var profile = new Profile(user.getId(), username, username, "", 0, 0);
        profileRepository.save(profile);

        String token = issueToken(user.getId());
        return ResponseEntity.ok(new LoginResponse(token, buildUserPayload(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        if (req == null || isBlank(req.email()) || isBlank(req.password())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
        }

        Optional<User> userOpt = userRepository.findByEmail(req.email().trim().toLowerCase());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid login"));
        }

        User user = userOpt.get();
        boolean passwordMatches = passwordEncoder.matches(req.password(), user.getPassword());
        if (!passwordMatches && req.password().equals(user.getPassword())) {
            // One-time migration path for legacy plain-text records.
            user.setPassword(passwordEncoder.encode(req.password()));
            userRepository.save(user);
            passwordMatches = true;
        }

        if (!passwordMatches) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid login"));
        }

        String token = issueToken(user.getId());
        return ResponseEntity.ok(new LoginResponse(token, buildUserPayload(user)));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String authz) {
        Long userId = getUserIdFromHeader(authz);
        if (userId == null) return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        return userRepository.findById(userId)
                .map(u -> ResponseEntity.ok(buildUserPayload(u)))
                .orElse(ResponseEntity.status(401).body(Map.of("message", "User not found")));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization", required = false) String authz) {
        String token = extractToken(authz);
        if (token == null) {
            return ResponseEntity.ok(Map.of("message", "Logged out"));
        }

        authTokenRepository.findByTokenAndRevokedFalse(token).ifPresent(t -> {
            t.setRevoked(true);
            authTokenRepository.save(t);
        });

        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(Map.of("message", "If your email exists, we sent a reset link."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetRequest req) {
        return ResponseEntity.ok(Map.of("message", "Password reset complete (mock)"));
    }

    private String issueToken(Long userId) {
        authTokenRepository.deleteByExpiresAtBefore(Instant.now());

        String token = UUID.randomUUID().toString();
        AuthToken authToken = new AuthToken(
                token,
                userId,
                Instant.now(),
                Instant.now().plus(TOKEN_TTL_DAYS, ChronoUnit.DAYS),
                false
        );
        authTokenRepository.save(authToken);
        return token;
    }

    private Long getUserIdFromHeader(String authz) {
        String token = extractToken(authz);
        if (token == null) return null;

        Optional<AuthToken> tokenEntity = authTokenRepository.findByTokenAndRevokedFalse(token);
        if (tokenEntity.isEmpty()) return null;

        AuthToken authToken = tokenEntity.get();
        if (authToken.getExpiresAt().isBefore(Instant.now())) {
            authToken.setRevoked(true);
            authTokenRepository.save(authToken);
            return null;
        }
        return authToken.getUserId();
    }

    private String extractToken(String authz) {
        if (authz == null || !authz.startsWith("Bearer ")) return null;
        return authz.substring(7).trim();
    }

    private Map<String, Object> buildUserPayload(User u) {
        return Map.of(
                "id", u.getId(),
                "email", u.getEmail(),
                "username", u.getUsername(),
                "displayName", u.getDisplayName()
        );
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
