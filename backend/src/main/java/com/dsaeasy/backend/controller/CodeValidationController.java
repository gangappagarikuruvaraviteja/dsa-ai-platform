package com.dsaeasy.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

record ValidateCodeRequest(String code, String language, String problemTitle, String problemDescription, List<Map<String, String>> examples, List<String> constraints, String mode) {}

@RestController
@RequestMapping("/api/validate-code")
public class CodeValidationController {

    @PostMapping("/run")
    public ResponseEntity<?> run(@RequestBody ValidateCodeRequest req) {
        return ResponseEntity.ok(buildMockResult(req.examples(), "run"));
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@RequestBody ValidateCodeRequest req) {
        Map<String, Object> result = buildMockResult(req.examples(), "submit");
        result.put("accepted", true);
        result.put("runtime", 15);
        result.put("runtimePercentile", 75);
        result.put("memory", 45.3);
        result.put("memoryPercentile", 62);
        result.put("codeQualityNotes", "Mock judge: code appears correct.");
        return ResponseEntity.ok(result);
    }

    private Map<String, Object> buildMockResult(List<Map<String, String>> examples, String mode) {
        List<Map<String, Object>> testCases = new ArrayList<>();
        int passed = 0;
        for (int i = 0; i < examples.size(); i++) {
            boolean pass = i == 0;
            if (pass) passed++;
            testCases.add(Map.of(
                "testCase", i + 1,
                "input", examples.get(i).get("input"),
                "expectedOutput", examples.get(i).get("output"),
                "actualOutput", pass ? examples.get(i).get("output") : "wrong",
                "passed", pass,
                "executionTime", 5,
                "memoryUsed", 42
            ));
        }
        Map<String, Object> r = new LinkedHashMap<>();
        r.put("status", passed == examples.size() ? "success" : "error");
        r.put("testCases", testCases);
        r.put("totalPassed", passed);
        r.put("totalTests", examples.size());
        return r;
    }
}
