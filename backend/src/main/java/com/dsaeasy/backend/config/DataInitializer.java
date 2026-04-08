package com.dsaeasy.backend.config;

import com.dsaeasy.backend.model.DsaProblem;
import com.dsaeasy.backend.repository.DsaProblemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedProblems(DsaProblemRepository problemRepository) {
        return args -> {
            if (problemRepository.count() > 0) {
                return;
            }

            problemRepository.save(new DsaProblem(
                    "Two Sum",
                    "Easy",
                    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                    "https://leetcode.com/problems/two-sum/"
            ));

            problemRepository.save(new DsaProblem(
                    "Longest Substring Without Repeating Characters",
                    "Medium",
                    "Given a string s, find the length of the longest substring without repeating characters.",
                    "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
            ));

            problemRepository.save(new DsaProblem(
                    "Binary Tree Maximum Path Sum",
                    "Hard",
                    "Given the root of a binary tree, return the maximum path sum of any non-empty path.",
                    "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
            ));
        };
    }
}
