package com.dsaeasy.backend;

import com.dsaeasy.backend.model.*;
import com.dsaeasy.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner init(UserRepository userRepository,
                           ProblemRepository problemRepository,
                           ProfileRepository profileRepository,
                           PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                var user = new User("demo@example.com", passwordEncoder.encode("password"), "demo", "Demo User");
                userRepository.save(user);
                profileRepository.save(new Profile(user.getId(), "Demo User", "demo", "I love DSA", 0, 0));
            }
            if (problemRepository.count() == 0) {
                final int maxSeedProblems = 150;
                String[][] topicProblems = {
                        {"Arrays & Hashing", "Contains Duplicate", "Valid Anagram", "Two Sum", "Group Anagrams", "Top K Frequent Elements", "Product of Array Except Self", "Valid Sudoku", "Encode and Decode Strings", "Longest Consecutive", "LRU Cache", "Two Sum III", "Majority Element", "Find All Duplicates", "First Unique Character", "Ransom Note", "Isomorphic Strings", "Word Pattern", "Happy Number", "Isomorphic Elements", "Set Matrix Zeroes", "Game of Life", "Increasing Triplet Subsequence", "Rotate Array", "Duplicate Emails", "Intersection of Two Arrays", "Intersection of Two Arrays II", "Happy Number", "Contains Duplicate II", "Contains Duplicate III", "Merge Similar Items", "Find the Celebrity", "Valid Parentheses", "Majority Element", "Majority Element II", "Single Number", "Single Number II", "Single Number III", "Find All Numbers Disappeared", "Find the Duplicate Number", "Find All Anagrams", "Intersection", "Union", "Difference", "Symmetric Difference", "Cartesian Product", "Power Set", "Permutations", "Combinations", "Subsets", "Permutations II", "Combinations Sum", "Letter Case Permutation", "Generate Parentheses", "Restore IP Addresses", "Palindromic Subsets", "Next Permutation", "Previous Permutation", "Permutations Sequence", "N Permutations", "Majority Vote", "Boyer Moore Voting", "Randomized Set", "Time Complexity", "Space Complexity", "Amortized Analysis", "Data Structures", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs", "Dynamic Programming", "Greedy Algorithms", "Divide Conquer", "Backtracking", "Bit Manipulation", "String Matching", "Pattern Matching", "Regular Expression", "Hashing", "Sorting", "Searching", "BFS DFS", "Dijkstra", "Floyd Warshall", "Bellman Ford", "Prim MST", "Kruskal MST", "Union Find", "Trie", "Segment Tree", "Fenwick Tree", "Suffix Array", "KMP Algorithm", "Rabin Karp", "Z Algorithm", "Manacher Algorithm"},
                        {"Two Pointers", "Valid Palindrome", "Is Palindrome", "Two Sum II", "3Sum", "Container With Most Water", "Trapping Rain Water", "Sorted Array Squares", "Remove Duplicates from Sorted Array", "Move Zeroes", "Reverse String", "Reverse String II", "Palindrome Permutation", "Rotate Array", "Remove Element", "Partition Array", "Dutch National Flag", "Sort Colors", "Sum Symmetric Pairs", "Merge Sorted Array", "Remove K Digits", "Product Gap", "Distance Between Each Pair", "Closest Pair Sum", "Target Sum Pairs", "K Sum", "4Sum", "Next Permutation", "Palindrome Check", "String Compression", "Valid Triangle Number", "11 Container With Most Water", "26 Remove Duplicates", "27 Remove Element", "28 Implement strStr", "35 Search Insert", "41 First Missing Positive", "42 Trapping Rain Water", "75 Sort Colors", "76 Minimum Window", "88 Merge Sorted", "125 Valid Palindrome", "167 Two Sum II", "170 Two Sum III", "209 Minimum Subarray", "633 Perfect Square", "680 Valid Palindrome II", "977 Squares Sorted"},
                        {"Binary Search", "Binary Search", "Search 2D Matrix", "Koko Eating Bananas", "Search in Rotated Sorted Array", "Find Minimum in Rotated Sorted Array", "Time Based Key-Value Store", "Median of Two Sorted Arrays", "Find First and Last Position", "Search in Unknown Sized", "Closest Binary Search", "Find K Closest", "Single Element in Sorted", "H-Index", "Split Array", "Min Days to Bloom", "Capacity Ship", "Magnetic Force", "Coffee Shop", "Optimal Division", "Find Smallest Divisor", "Nth Magical Number", "Single Element", "Valid Perfect Square", "Arrangement Combinations", "Powerful Integers", "Number of Beautiful Partitions", "Count Alphabetic Consonants", "Simple Encrypt Decrypt", "Smallest Good Base", "Super Pow", "Cherry Pickup", "Number of Dice Rolls", "Count Digit One", "Minimum Absolute Difference", "Nth Digit", "Guess Higher Lower", "Arranging Coins", "Super Ugly Number", "Ugly Number II", "Ugly Number III", "Perfect Squares"},
                        {"Stack", "Valid Parentheses", "Min Stack", "Evaluate Reverse Polish Notation", "Generate Parentheses", "Daily Temperatures", "Car Fleet", "Largest Rectangle in Histogram", "Next Greater Element", "Next Greater Element II", "Monotonic Stack", "Remove K Digits", "Simplify Path", "Integer to English", "Basic Calculator", "Decode String", "Asteroid Collision", "Score Parentheses", "Remove Duplicate Letters", "Lexicographically Smallest", "Online Stock Data", "Sum of Subarray Minimums", "Shortest Subarray", "Shortest Path", "Trapping Rain Water II", "Maximal Rectangle", "Largest Rectangle", "Remove All Adjacent", "Remove Duplicate Letters", "Online Stock Span", "Vertical Order", "Binary Tree Zigzag"},
                        {"Sliding Window", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating", "Longest Repeating Character Replacement", "Minimum Window Substring", "Sliding Window Maximum", "Permutation in String", "Find All Anagrams", "Repeated DNA Sequences", "Max Consecutive Ones", "Subarray Sum Equals", "Minimum Size Subarray", "Longest Increasing Subsequence", "Minimum Window Substring Unique", "Substring Concatenation", "Shortest Word Distance", "Paint House", "Ternary Expression Parser", "Number of Subarrays", "Max Sum Subarray K", "Minimum Operations", "Delete Columns", "Minimize Deviation", "Get Equal Substrings", "Partition Array Chunks", "Longest Subarray", "Contains Duplicate III", "Minimum Recolors", "Fruit Into Baskets"},
                        {"Linked List", "Reverse Linked List", "Merge Two Sorted Lists", "Reorder List", "Remove Nth Node From End", "Copy List with Random Pointer", "Add Two Numbers", "Linked List Cycle", "Reverse Nodes in K Group", "Merge K Sorted Lists", "Intersection of Two Lists", "Partition List", "Sort List", "Delete Duplicates", "Palindrome Linked List", "Swap Nodes Pairs", "Remove Linked Duplicates", "Plus One", "Odd Even List", "Remove Duplicates II", "Rotate List", "Insert Sort List", "LRU Cache", "Flatten Multilevel", "Copy Random Pointer", "LFU Cache", "Design Phone Directory", "Design Browser History", "Double Number", "Reverse Between", "Reorder Even Odd", "Separate Linked", "Design Circular", "Design Circular Deque"},
                        {"Trees", "Invert Binary Tree", "Maximum Depth of Binary Tree", "Diameter of Binary Tree", "Balanced Binary Tree", "Same Tree", "Subtree of Another Tree", "Lowest Common Ancestor of BST", "Binary Tree Level Order Traversal", "Binary Tree Right Side View", "Validate Binary Search Tree", "Kth Smallest Element in BST", "Construct Binary Tree", "Binary Tree Maximum Path Sum", "Serialize Deserialize", "Path Sum", "Path Sum II", "Path Sum III", "Sum Root to Leaf", "Count Pathes", "Binary Search Tree Iterator", "Closest BST Value", "Closest BST Value II", "All O One", "Vertical Order Traversal", "Boundary Binary Tree", "Binary Tree Cameras", "Distribute Coins", "Binary Tree Cameras II", "Deepest Leaves", "Even Odd Tree", "Smallest Subtree Deepest", "Maximum Average Subtree", "Count Completed Trees", "Binary Tree Tilt", "Trim Binary Search", "Smallest Range II", "Find Mode BST"},
                        {"Tries", "Implement Trie Prefix Tree", "Design Add and Search Words", "Word Search II", "Replace Words", "Concatenated Words", "Stream of Characters", "Dictionary Trie", "Number of Distinct Substrings", "Shortest Unique Prefix", "Prefix Matches", "Implement Phone", "Design Search Autocomplete"},
                        {"Heap / Priority Queue", "Kth Largest Element in a Stream", "Last Stone Weight", "K Closest Points to Origin", "Reorganize String", "Task Scheduler", "Design Twitter", "Find Median from Data Stream", "Merge K Sorted Lists", "Ugly Number II", "Super Ugly Number", "Rearrange String", "Minimum Cost", "Closest Meeting", "Top K Frequent Words", "Sliding Window Maximum", "Maximum Performance", "Construct Target Array", "Minimum Refills", "Minimum Operations", "Minimum Cost Hire"},
                        {"Backtracking", "Subsets", "Combination Sum", "Permutations", "N-Queens", "Palindrome Partitioning", "Letter Combinations of Phone Number", "Word Search", "Sudoku Solver", "Generate Parentheses", "Restore IP Addresses", "Combination Sum II", "Permutations II", "Gray Code", "Generate All", "Factor Combinations", "Stickers to Spell", "Android Unlock Patterns", "Brace Expansion", "Regular Expression", "Word Ladder II", "Unique Binary Trees", "Partition to K Equal", "Unique Paths III", "Couples Holding"},
                        {"Graphs", "Number of Islands", "Clone Graph", "Max Area of Island", "Pacific Atlantic Water Flow", "Surrounded Regions", "Rotting Oranges", "Is Graph Bipartite", "Course Schedule", "Course Schedule II", "Alien Dictionary", "Word Ladder", "Word Ladder II", "Tree Diameter", "Network Delay Time", "Find Critical", "Strongly Connected", "All Paths", "Cycle Detection", "Topological Sort", "Minimum Spanning Tree", "Shortest Path", "Traveling Salesman", "Knight Shortest"},
                        {"1-D DP", "Climbing Stairs", "Min Cost Climbing Stairs", "House Robber", "House Robber II", "Longest Increasing Subsequence", "Partition Equal Subset Sum", "Word Break", "Coin Change", "Coin Change II", "Maximum Product Subarray", "Delete Earn", "Integer Break", "Decode Ways", "Fibonacci Number", "Minimum Cost Jump", "Jump Game", "Jump Game II", "Longest Increasing Pair", "Perfect Squares", "Counting Bits", "Palindrome Substrings", "Distinct Subsequences", "Range Sum Immutable", "Best Time Buy Sell", "Best Time Buy Sell II", "Best Time Buy Sell III", "Best Time Buy Sell IV", "Decode Ways II", "Domino Tromino", "Arithmetic Slices", "Arithmetic Slices II", "Knight Dialer"},
                        {"2-D DP", "Unique Paths", "Unique Paths II", "Longest Common Subsequence", "Best Time to Buy Sell Stock III", "Interleaving String", "Edit Distance", "Burst Balloons", "Regular Expression Matching", "Dungeon Game", "Number Distinct Islands", "Minimum Triangle", "Perfect Rectangle", "Distinct Subseqs", "Number of Dice", "Delete Rotten", "Maximal Square", "Distinct Subseqs II"},
                        {"Greedy", "Jump Game", "Jump Game II", "Gas Station", "Hand of Straights", "Merge Triplets to Form Target", "Partition Labels", "Valid Parenthesis String", "Assign Cookies", "Lemonade Change", "Reconstruction", "Fraction Addition Subtraction", "Minimum Arrow", "Meeting Rooms II", "Queue Reconstruction", "Largest Number", "Remove K Digits", "Create Maximum", "Most Competitive", "Smallest Viable", "Smallest Good Base"},
                        {"Intervals", "Insert Interval", "Merge Intervals", "Non-Overlapping Intervals", "Meeting Rooms", "Meeting Rooms II", "Minimum Interval to Include Query", "Video Stitching", "Minimum Number", "Range Addition", "Range Addition II", "Interval List Intersections", "Amount Parking", "The Skyline"},
                        {"Math & Geometry", "Rotate Array", "Plus One", "Pow(x, n)", "Multiply Strings", "Rectangle Area", "Happy Number", "Number of 1 Bits", "Number of Trailing Zeros", "Excel Sheet Column Title", "Excel Sheet Column Number", "Valid Sudoku", "Solve Sudoku", "Single Number", "Single Number II", "Single Number III", "Majority Element", "Majority Element II", "Fraction to Recurring", "Unique Binary Trees", "Permutation Sequence", "Shuffle Array", "Random Pick", "Implement Rand10", "Random Pick Weighted", "Random Pick Index", "Leetcode Shuffle", "Shuffle Array", "Reservoir Sampling"},
                        {"Advanced Graphs", "Alien Dictionary", "Minimum Height Trees", "Network Delay Time", "Critical Connections", "Strongly Connected Components", "Largest Component", "Accounts Merge", "Word Ladder", "Path With Min Effort", "Find Path", "Minimum Cost", "Swimming Rising", "Clone Graph", "Islands Perimeter", "Number of Islands II"}
                };
                int id = 1;
                seedProblems:
                for (String[] group : topicProblems) {
                    String topic = group[0];
                    for (int i = 1; i < group.length; i++) {
                        if (id > maxSeedProblems) {
                            break seedProblems;
                        }
                        String originalTitle = group[i];
                        String title = normalizeSeedTitle(topic, originalTitle);
                        String normalizedTopic = normalizeSeedTopic(topic, originalTitle);
                        String difficulty = getDifficultyForProblem(title);
                        String tags = normalizedTopic.toLowerCase().replace(" ", ",");
                        
                        String description = getDescriptionForProblem(title, normalizedTopic, difficulty);
                        String constraints = getConstraintsForProblem(title, difficulty);
                        String starter = "import java.util.*;\n\n" +
                            "class Solution {\n" +
                            "    public static Object solution(Object args) {\n" +
                            "        // TODO: implement your solution for " + title + "\n" +
                            "        return null;\n" +
                            "    }\n" +
                            "}";
                        int acceptance = 30 + ((id * 7) % 65);
                        problemRepository.save(new Problem(title, difficulty, normalizedTopic, tags, description, constraints, starter, acceptance, id));
                        id++;
                    }
                }
            }
        };
    }

    private static String getDifficultyForProblem(String title) {
        return switch (title) {
            // Easy
            case "Contains Duplicate", "Valid Anagram", "Two Sum", "Valid Palindrome", "Best Time to Buy and Sell Stock",
                 "Valid Parentheses", "Binary Search", "Reverse Linked List", "Merge Two Sorted Lists",
                 "Invert Binary Tree", "Maximum Depth of Binary Tree", "Diameter of Binary Tree", "Balanced Binary Tree",
                 "Same Tree", "Linked List Cycle", "Climbing Stairs", "Min Cost Climbing Stairs", "House Robber",
                 "Number of 1 Bits", "Happy Number", "Meeting Rooms", "Kth Largest Element in a Stream", "Last Stone Weight",
                 "Majority Element", "Single Number", "Power of Two", "Contains Duplicate II", "Find All Numbers Disappeared",
                 "Intersection of Two Arrays", "Intersection of Two Arrays II" -> "Easy";

            // Hard
            case "Median of Two Sorted Arrays", "Trapping Rain Water", "Minimum Window Substring", "Sliding Window Maximum",
                 "Largest Rectangle in Histogram", "Reverse Nodes in K Group", "Merge K Sorted Lists",
                 "Binary Tree Maximum Path Sum", "Serialize Deserialize", "Word Search II", "Find Median from Data Stream",
                 "N-Queens", "Sudoku Solver", "Word Ladder II", "Regular Expression Matching", "Burst Balloons",
                 "Minimum Interval to Include Query", "Critical Connections", "Network Delay Time", "Alien Dictionary" -> "Hard";

            // NeetCode core is mostly Medium outside explicit Easy/Hard lists above
            default -> "Medium";
        };
    }
    
    private static String getDescriptionForProblem(String title, String topic, String difficulty) {
        return switch(title) {
            case "Contains Duplicate" -> "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.";
            case "Valid Anagram" -> "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.";
            case "Two Sum" -> "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.";
            case "Group Anagrams" -> "Given an array of strings strs, group the anagrams together. You can return the answer in any order.";
            case "Top K Frequent Elements" -> "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.";
            case "Valid Palindrome" -> "A phrase is a palindrome if it reads the same forward and backward after converting all uppercase letters to lowercase and removing all non-alphanumeric characters.";
            case "Two Sum II" -> "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.";
            case "3Sum" -> "Given an integer array nums of length n, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.";
            case "Container With Most Water" -> "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.";
            case "Best Time to Buy and Sell Stock" -> "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell that stock.";
            case "Longest Substring Without Repeating" -> "Given a string s, find the length of the longest substring without repeating characters.";
            case "Game of Life" -> "According to the rules of Conway's Game of Life, update the board in place to produce the next state of the board after one iteration.";
            case "Reverse Linked List" -> "Given the head of a singly linked list, reverse the list, and return the reversed list.";
            case "Merge Two Sorted Lists" -> "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the two lists.";
            case "Invert Binary Tree" -> "Given the root of a binary tree, invert the tree, and return its root.";
            case "Binary Search" -> "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.";
            case "Climbing Stairs" -> "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?";
            case "House Robber" -> "You are a professional robber planning to rob houses along a street. You are given an integer array nums representing the amount of money in each house, and an integer representing a maximum amount you could rob.";
            case "Word Break" -> "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.";
            case "Coin Change" -> "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.";
            case "Generate Parentheses" -> "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.";
            case "Subsets" -> "Given an integer array nums of unique elements, return all the possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.";
            case "Number of Islands" -> "Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.";
            case "Course Schedule" -> "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.";
            default -> buildDefaultDescription(title, topic, difficulty);
        };
    }
    
    private static String buildDefaultDescription(String title, String topic, String difficulty) {
        return "Goal: solve \"" + title + "\" as a focused " + topic + " problem.\n\n" +
                "What it requires:\n" +
                "- Identify the core pattern behind the input and output.\n" +
                "- Handle edge cases such as empty input, duplicates, boundary values, and ordering constraints.\n" +
                "- Return the exact format requested by the problem statement.\n\n" +
                "Target approach: a clean " + difficulty.toLowerCase() + "-level solution with the best time and space complexity you can justify.";
    }

    private static String normalizeSeedTitle(String topic, String title) {
        return switch (title) {
            case "Searching" -> "Search in Rotated Sorted Array";
            case "Sorting" -> "Sort Colors";
            case "Data Structures" -> "LRU Cache";
            case "Linked Lists" -> "Reverse Linked List";
            case "Stacks" -> "Valid Parentheses";
            case "Queues" -> "Kth Largest Element in a Stream";
            case "Trees" -> "Binary Tree Level Order Traversal";
            case "Graphs" -> "Number of Islands";
            case "Dynamic Programming" -> "Climbing Stairs";
            case "Greedy Algorithms" -> "Jump Game";
            case "Divide Conquer" -> "Binary Search";
            case "Backtracking" -> "Subsets";
            case "Bit Manipulation" -> "Single Number";
            case "String Matching" -> "Longest Substring Without Repeating Characters";
            case "Pattern Matching" -> "Group Anagrams";
            case "Regular Expression" -> "Regular Expression Matching";
            case "Hashing" -> "Contains Duplicate";
            case "BFS DFS" -> "Number of Islands";
            case "Dijkstra" -> "Network Delay Time";
            case "Floyd Warshall" -> "Network Delay Time";
            case "Bellman Ford" -> "Network Delay Time";
            case "Prim MST", "Kruskal MST" -> "Minimum Spanning Tree";
            case "Union Find" -> "Number of Islands";
            case "Trie" -> "Implement Trie Prefix Tree";
            case "Segment Tree" -> "Segment Tree";
            case "Fenwick Tree" -> "Fenwick Tree";
            case "Suffix Array" -> "Suffix Array";
            case "KMP Algorithm" -> "KMP Algorithm";
            case "Rabin Karp" -> "Rabin Karp";
            case "Z Algorithm" -> "Z Algorithm";
            case "Manacher Algorithm" -> "Longest Palindromic Substring";
            default -> title;
        };
    }

    private static String normalizeSeedTopic(String topic, String title) {
        return switch (title) {
            case "Searching" -> "Binary Search";
            case "Sorting" -> "Arrays & Hashing";
            case "Data Structures" -> "Design";
            case "Linked Lists" -> "Linked List";
            case "Stacks" -> "Stack";
            case "Queues" -> "Heap / Priority Queue";
            case "Trees" -> "Trees";
            case "Graphs" -> "Graphs";
            case "Dynamic Programming" -> "1-D DP";
            case "Greedy Algorithms" -> "Greedy";
            case "Divide Conquer" -> "Binary Search";
            case "Backtracking" -> "Backtracking";
            case "Bit Manipulation" -> "Bit Manipulation";
            case "String Matching", "Pattern Matching", "Regular Expression", "Hashing" -> "Arrays & Hashing";
            case "BFS DFS", "Dijkstra", "Floyd Warshall", "Bellman Ford", "Prim MST", "Kruskal MST", "Union Find" -> "Graphs";
            case "Trie" -> "Tries";
            case "Segment Tree", "Fenwick Tree" -> "Design";
            case "Suffix Array", "KMP Algorithm", "Rabin Karp", "Z Algorithm", "Manacher Algorithm" -> "Arrays & Hashing";
            default -> topic;
        };
    }

    private static String getConstraintsForProblem(String title, String difficulty) {
        return switch(title) {
                case "Contains Duplicate", "Valid Anagram", "Two Sum" -> "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9\nTime: O(n)\nSpace: O(n)";
                case "Valid Palindrome", "Two Sum II", "3Sum" -> "1 <= s.length <= 10^5\nTime: O(n) or O(n log n)\nSpace: O(1) or O(n)";
                case "Best Time to Buy and Sell Stock" -> "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4\nTime: O(n)\nSpace: O(1) or O(n)";
                case "Longest Substring Without Repeating" -> "0 <= s.length <= 5 * 10^4\n`s` may contain letters, digits, symbols, and spaces\nTime: O(n)\nSpace: O(min(n, charset))";
            case "Reverse Linked List", "Merge Two Sorted Lists" -> "Number of nodes in the list: [0, 100]\n-100 <= Node.val <= 100\nTime: O(n)\nSpace: O(1)";
            case "Invert Binary Tree", "Binary Search" -> "Number of nodes: [0, 100]\nTime: O(n) or O(log n)\nSpace: O(h) where h is height";
            case "Climbing Stairs", "House Robber" -> "1 <= n <= 45\n0 <= nums[i] <= 100\nTime: O(n)\nSpace: O(1) or O(n)";
            case "Word Break", "Coin Change" -> "1 <= s.length <= 300\nTime: O(n^2) or O(amount * len(coins))\nSpace: O(n) or O(amount)";
            case "Generate Parentheses", "Subsets" -> "0 <= n <= 8\nTime: O(2^n)\nSpace: O(2^n)";
            case "Number of Islands", "Course Schedule" -> "m == grid.length, n == grid[i].length\n1 <= m, n <= 300\nTime: O(m*n)\nSpace: O(m*n)";
                case "Game of Life" -> "m == board.length, n == board[i].length\n1 <= m, n <= 100\nTime: O(m*n)\nSpace: O(1)";
                case "Set Matrix Zeroes" -> "m == matrix.length, n == matrix[i].length\n1 <= m, n <= 200\nTime: O(m*n)\nSpace: O(1)";
                case "Rotate Array" -> "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1\nTime: O(n)\nSpace: O(1)";
            default -> difficulty.equals("Easy")
                    ? "Small input size expected for a foundational problem.\nTime: O(n) or O(n log n)\nSpace: O(1) or O(n)"
                    : difficulty.equals("Hard")
                    ? "Large input size expected with tighter constraints.\nTime: O(n log n) or better when possible\nSpace: O(1) to O(n)"
                    : "Moderate input size expected with standard interview constraints.\nTime: O(n) or O(n log n)\nSpace: O(1) or O(n)";
        };
    }
}
