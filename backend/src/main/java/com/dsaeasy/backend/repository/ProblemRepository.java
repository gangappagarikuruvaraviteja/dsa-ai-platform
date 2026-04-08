package com.dsaeasy.backend.repository;

import com.dsaeasy.backend.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    List<Problem> findByTopic(String topic);
    List<Problem> findByDifficulty(String difficulty);
    List<Problem> findByTitleContainingIgnoreCase(String title);
}
