package com.dsaeasy.backend.service;

import com.dsaeasy.backend.model.UserProgress;
import com.dsaeasy.backend.repository.UserProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {
    private final UserProgressRepository progressRepository;

    public ProgressService(UserProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public List<UserProgress> getMyProgress(Long userId) {
        return progressRepository.findByUserId(userId);
    }

    public UserProgress markSolved(Long userId, Long problemId, String status) {
        UserProgress progress = progressRepository
                .findByUserIdAndProblemId(userId, problemId)
                .orElse(new UserProgress(userId, problemId, status));

        progress.setStatus(status);
        return progressRepository.save(progress);
    }
}
