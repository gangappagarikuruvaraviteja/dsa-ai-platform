package com.dsaeasy.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "problems")
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String difficulty;
    private String topic;
    private String tags;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "TEXT")
    private String constraints;
    private String starterCode;
    private Integer acceptanceRate;
    private Integer leetcodeNumber;

    public Problem() {}

    public Problem(String title, String difficulty, String topic, String tags, String description, String constraints, String starterCode, Integer acceptanceRate, Integer leetcodeNumber) {
        this.title = title;
        this.difficulty = difficulty;
        this.topic = topic;
        this.tags = tags;
        this.description = description;
        this.constraints = constraints;
        this.starterCode = starterCode;
        this.acceptanceRate = acceptanceRate;
        this.leetcodeNumber = leetcodeNumber;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getConstraints() { return constraints; }
    public void setConstraints(String constraints) { this.constraints = constraints; }
    public String getStarterCode() { return starterCode; }
    public void setStarterCode(String starterCode) { this.starterCode = starterCode; }
    public Integer getAcceptanceRate() { return acceptanceRate; }
    public void setAcceptanceRate(Integer acceptanceRate) { this.acceptanceRate = acceptanceRate; }
    public Integer getLeetcodeNumber() { return leetcodeNumber; }
    public void setLeetcodeNumber(Integer leetcodeNumber) { this.leetcodeNumber = leetcodeNumber; }
}
