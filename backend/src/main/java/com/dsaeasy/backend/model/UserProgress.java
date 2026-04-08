package com.dsaeasy.backend.model;

import jakarta.persistence.*;

@Entity
@Table(
        name = "user_progress",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "problem_id"})
)
public class UserProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "problem_id", nullable = false)
    private Long problemId;

    @Column(nullable = false)
    private String status;

    public UserProgress() {
    }

    public UserProgress(Long userId, Long problemId, String status) {
        this.userId = userId;
        this.problemId = problemId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
