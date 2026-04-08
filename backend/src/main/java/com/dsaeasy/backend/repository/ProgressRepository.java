package com.dsaeasy.backend.repository;

import com.dsaeasy.backend.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findByUserId(Long userId);
    List<Progress> findByProblemId(Long problemId);
    Progress findFirstByUserIdAndProblemId(Long userId, Long problemId);
}
