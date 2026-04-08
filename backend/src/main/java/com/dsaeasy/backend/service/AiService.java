package com.dsaeasy.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class AiService {
    private final String apiKey;
    private final String apiUrl;
    private final String model;
    private final RestTemplate restTemplate = new RestTemplate();

    public AiService(@Value("${app.ai.api-key}") String apiKey,
                     @Value("${app.ai.api-url}") String apiUrl,
                     @Value("${app.ai.model}") String model) {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.model = model;
    }

    public String explain(String question, String problemTitle, String problemDescription) {
        if (apiKey == null || apiKey.isBlank()) {
            return "AI key is not configured yet. Add AI_API_KEY to backend environment variables to enable real explanations.";
        }

        String prompt = "You are a DSA tutor. Explain clearly with approach, intuition, and complexity."
                + "\\nQuestion: " + question
                + "\\nProblem title: " + problemTitle
                + "\\nProblem description: " + problemDescription;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", "You are an expert DSA mentor."),
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.3
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, Map.class);

        if (response.getBody() == null) {
            return "No AI response received.";
        }

        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
        if (choices == null || choices.isEmpty()) {
            return "No AI response choices returned.";
        }

        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
        return String.valueOf(message.get("content"));
    }
}
