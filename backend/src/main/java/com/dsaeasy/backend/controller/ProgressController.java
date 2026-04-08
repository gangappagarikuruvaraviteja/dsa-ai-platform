package com.dsaeasy.backend.controller;

import com.dsaeasy.backend.model.UserProgress;
import com.dsaeasy.backend.service.JwtService;
import com.dsaeasy.backend.service.ProgressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

record ProgressRequest(Long problemId, String status) {}

@RestController
@RequestMapping("/progress")
public class ProgressController {
    private final ProgressService progressService;
    private final JwtService jwtService;

    public ProgressController(ProgressService progressService, JwtService jwtService) {
        this.progressService = progressService;
        this.jwtService = jwtService;
    }

    @GetMapping("/me")
    public ResponseEntity<List<UserProgress>> getMyProgress(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        Long userId = extractUserId(authorizationHeader);
        return ResponseEntity.ok(progressService.getMyProgress(userId));
    }

    @PostMapping
    public ResponseEntity<UserProgress> markSolved(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody ProgressRequest request
    ) {
        Long userId = extractUserId(authorizationHeader);
        String status = request.status() == null || request.status().isBlank() ? "SOLVED" : request.status();
        UserProgress saved = progressService.markSolved(userId, request.problemId(), status);
        return ResponseEntity.ok(saved);
    }

    private Long extractUserId(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing bearer token");
        }
        String token = authorizationHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        return jwtService.extractUserId(token);
    }
}
