package com.dsaeasy.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String displayName;
    private String username;
    private String bio;
    private Integer problemsSolved;
    private Integer streak;

    public Profile() {}

    public Profile(Long userId, String displayName, String username, String bio, Integer problemsSolved, Integer streak) {
        this.userId = userId;
        this.displayName = displayName;
        this.username = username;
        this.bio = bio;
        this.problemsSolved = problemsSolved;
        this.streak = streak;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public Integer getProblemsSolved() { return problemsSolved; }
    public void setProblemsSolved(Integer problemsSolved) { this.problemsSolved = problemsSolved; }
    public Integer getStreak() { return streak; }
    public void setStreak(Integer streak) { this.streak = streak; }
}
