package com.dsaeasy.backend.controller;

import com.dsaeasy.backend.model.Profile;
import com.dsaeasy.backend.model.Progress;
import com.dsaeasy.backend.model.Problem;
import com.dsaeasy.backend.repository.ProfileRepository;
import com.dsaeasy.backend.repository.ProgressRepository;
import com.dsaeasy.backend.repository.ProblemRepository;
import com.dsaeasy.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class DataController {
    private final ProblemRepository problemRepository;
    private final ProfileRepository profileRepository;
    private final ProgressRepository progressRepository;

    public DataController(ProblemRepository problemRepository, ProfileRepository profileRepository, ProgressRepository progressRepository) {
        this.problemRepository = problemRepository;
        this.profileRepository = profileRepository;
        this.progressRepository = progressRepository;
    }

    @GetMapping("/problems")
    public ResponseEntity<?> getProblems(@RequestParam(required = false) String topic,
                                         @RequestParam(required = false) String difficulty,
                                         @RequestParam(required = false) String search) {
        List<Problem> problems;
        if (topic != null) {
            problems = problemRepository.findByTopic(topic);
        } else if (difficulty != null) {
            problems = problemRepository.findByDifficulty(difficulty);
        } else if (search != null) {
            problems = problemRepository.findByTitleContainingIgnoreCase(search);
        } else {
            problems = problemRepository.findAll();
        }
        return ResponseEntity.ok(problems);
    }

    @GetMapping("/problems/{id}")
    public ResponseEntity<?> getProblem(@PathVariable Long id) {
        return problemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/progress")
    public ResponseEntity<?> getProgress() {
        return ResponseEntity.ok(progressRepository.findAll());
    }

    @GetMapping("/progress/{problemId}")
    public ResponseEntity<?> getProgressByProblem(@PathVariable Long problemId) {
        var list = progressRepository.findByProblemId(problemId);
        if (list.isEmpty()) return ResponseEntity.ok(Map.of("solved", false));
        return ResponseEntity.ok(list.get(0));
    }

    @PostMapping("/progress")
    public ResponseEntity<?> markSolved(@RequestBody Map<String, Object> body) {
        Long problemId = Long.valueOf(String.valueOf(body.get("problemId")));
        Boolean solved = Boolean.valueOf(String.valueOf(body.getOrDefault("solved", true)));
        // For demo we use one userId 1
        Progress progress = new Progress(1L, problemId, solved, Instant.now());
        progressRepository.save(progress);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/profiles/me")
    public ResponseEntity<?> getProfile() {
        var profile = profileRepository.findByUserId(1L).orElse(null);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profiles/me")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, Object> body) {
        var profile = profileRepository.findByUserId(1L).orElse(new Profile(1L, "Demo", "demo", "", 0, 0));
        if (body.containsKey("displayName")) profile.setDisplayName(String.valueOf(body.get("displayName")));
        if (body.containsKey("username")) profile.setUsername(String.valueOf(body.get("username")));
        if (body.containsKey("bio")) profile.setBio(String.valueOf(body.get("bio")));
        profileRepository.save(profile);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/profiles/leaderboard")
    public ResponseEntity<?> leaderboard() {
        var all = profileRepository.findAllByOrderByProblemsSolvedDesc();
        List<Map<String, Object>> result = new ArrayList<>();
        for (var p : all) {
            result.add(Map.of(
                "userId", p.getUserId(),
                "displayName", p.getDisplayName(),
                "avatarUrl", null,
                "problemsSolved", p.getProblemsSolved(),
                "streak", p.getStreak(),
                "username", p.getUsername()
            ));
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/daily-challenge")
    public ResponseEntity<?> dailyChallenge() {
        var problems = problemRepository.findAll();
        if (problems.isEmpty()) return ResponseEntity.ok(Map.of("problemId", null));
        var p = problems.get(0);
        return ResponseEntity.ok(Map.of("problemId", p.getId(), "challengeDate", "2026-03-15", "solvers", List.of()));
    }

    @PostMapping("/daily-challenge/solve")
    public ResponseEntity<?> solveDailyChallenge() {
        return ResponseEntity.ok(Map.of("message", "Solved daily challenge (mock)"));
    }

    @PostMapping("/enrich-problems")
    public ResponseEntity<?> enrichProblems(@RequestBody Map<String, Object> body) {
        int batchSize = Integer.parseInt(String.valueOf(body.getOrDefault("batchSize", 3)));
        int offset = Integer.parseInt(String.valueOf(body.getOrDefault("offset", 0)));

        var problems = problemRepository.findAll();
        if (offset >= problems.size()) {
            return ResponseEntity.ok(Map.of(
                    "done", true,
                    "remaining", 0,
                    "results", List.of(),
                    "nextOffset", offset
            ));
        }

        var end = Math.min(offset + batchSize, problems.size());
        var items = problems.subList(offset, end);
        var r = new ArrayList<Map<String, Object>>();
        for (var p : items) {
            r.add(Map.of("id", p.getId(), "title", p.getTitle(), "status", "success"));
        }

        return ResponseEntity.ok(Map.of(
                "done", end >= problems.size(),
                "remaining", Math.max(0, problems.size() - end),
                "results", r,
                "nextOffset", end
        ));
    }

    @PostMapping("/ai-tutor")
    public ResponseEntity<?> aiTutor(@RequestBody Map<String, Object> body) {
        String type = String.valueOf(body.getOrDefault("type", "hint"));
        String title = String.valueOf(body.getOrDefault("problemTitle", "Problem"));
        String response;
        switch (type) {
            case "explain" -> response = "Explain your approach step-by-step for " + title + ".";
            case "complexity" -> response = "Time complexity is O(n), space O(1) for typical solutions.";
            case "similar" -> response = "Try similar problems such as " + title + " variations.";
            default -> response = "Try breaking the problem down into smaller sub-problems.";
        }
        return ResponseEntity.ok(Map.of("response", response));
    }

    @GetMapping("/topics")
    public ResponseEntity<?> topics() {
        var list = problemRepository.findAll();
        Map<String, Long> counts = new HashMap<>();
        for (var p : list) {
            counts.put(p.getTopic(), counts.getOrDefault(p.getTopic(), 0L) + 1);
        }
        List<Map<String, Object>> result = new ArrayList<>();
        counts.forEach((topic, count) -> result.add(Map.of("topic", topic, "count", count)));
        return ResponseEntity.ok(result);
    }
}
