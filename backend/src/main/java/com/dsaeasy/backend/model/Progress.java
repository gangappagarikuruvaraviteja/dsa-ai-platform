package com.dsaeasy.backend.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "progress")
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long problemId;
    private Boolean solved;
    private Instant solvedAt;

    public Progress() {}

    public Progress(Long userId, Long problemId, Boolean solved, Instant solvedAt) {
        this.userId = userId;
        this.problemId = problemId;
        this.solved = solved;
        this.solvedAt = solvedAt;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getProblemId() { return problemId; }
    public void setProblemId(Long problemId) { this.problemId = problemId; }
    public Boolean getSolved() { return solved; }
    public void setSolved(Boolean solved) { this.solved = solved; }
    public Instant getSolvedAt() { return solvedAt; }
    public void setSolvedAt(Instant solvedAt) { this.solvedAt = solvedAt; }
}
