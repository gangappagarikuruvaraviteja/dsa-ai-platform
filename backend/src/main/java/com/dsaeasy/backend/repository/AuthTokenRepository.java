package com.dsaeasy.backend.repository;

import com.dsaeasy.backend.model.AuthToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface AuthTokenRepository extends JpaRepository<AuthToken, Long> {
    Optional<AuthToken> findByTokenAndRevokedFalse(String token);
    List<AuthToken> findByUserIdAndRevokedFalse(Long userId);
    long deleteByExpiresAtBefore(Instant instant);
}
