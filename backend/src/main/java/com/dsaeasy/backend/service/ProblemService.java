package com.dsaeasy.backend.service;

import com.dsaeasy.backend.model.DsaProblem;
import com.dsaeasy.backend.repository.DsaProblemRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProblemService {
    private final DsaProblemRepository problemRepository;

    public ProblemService(DsaProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public List<DsaProblem> getAllProblems() {
        return problemRepository.findAll();
    }

    public DsaProblem getProblemById(Long id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem not found"));
    }
}
