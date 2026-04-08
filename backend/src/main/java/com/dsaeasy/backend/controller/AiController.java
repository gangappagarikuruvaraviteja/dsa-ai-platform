package com.dsaeasy.backend.controller;

import com.dsaeasy.backend.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

record AiExplainRequest(String question, String problemTitle, String problemDescription) {}

@RestController
@RequestMapping("/ai")
public class AiController {
    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/explain")
    public ResponseEntity<Map<String, String>> explain(@RequestBody AiExplainRequest request) {
        String answer = aiService.explain(
                request.question(),
                request.problemTitle() == null ? "" : request.problemTitle(),
                request.problemDescription() == null ? "" : request.problemDescription()
        );
        return ResponseEntity.ok(Map.of("answer", answer));
    }
}
