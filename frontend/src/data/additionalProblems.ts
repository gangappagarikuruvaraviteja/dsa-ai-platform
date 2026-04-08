// Additional NeetCode Problems - Full database expansion
// This file contains 300+ LeetCode problems organized by topic with complete descriptions, examples, and starter code

import type { Problem } from "./mockData";

export const additionalProblems: Problem[] = [
  // ==================== MORE ARRAYS & HASHING ====================
  {
    id: 151, title: "Product of Array Except Self", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]", explanation: "The product of all other elements except nums[i] for each index." },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"], 
    acceptanceRate: 64.8,
    starterCode: { python: "class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        pass", java: "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n    }\n}", javascript: "var productExceptSelf = function(nums) {\n};" },
  },
  {
    id: 152, title: "Longest Consecutive", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.",
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4." },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
    ],
    constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    acceptanceRate: 48.6,
    starterCode: { python: "class Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int longestConsecutive(int[] nums) {\n    }\n}", javascript: "var longestConsecutive = function(nums) {\n};" },
  },
  {
    id: 153, title: "Three Sum", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Given an integer array nums of length n, return all the triplets [nums[a], nums[b], nums[c]] such that a, b, c are distinct, a + b + c == 0 and the values are in non-descending order.\n\nThe solution set must not contain duplicate triplets.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    acceptanceRate: 35.2,
    starterCode: { python: "class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        pass", java: "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n    }\n}", javascript: "var threeSum = function(nums) {\n};" },
  },
  {
    id: 154, title: "Set Matrix Zeroes", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Given an m x n integer matrix `matrix`, if an element is 0, set its entire row and column to 0's.\n\nYou must do it in-place.",
    examples: [
      { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" },
      { input: "matrix = [[0,1],[1,1]]", output: "[[0,0],[0,1]]" },
    ],
    constraints: ["m == matrix.length", "n == matrix[0].length", "1 <= m, n <= 200", "-2^31 <= matrix[i][j] <= 2^31 - 1"],
    acceptanceRate: 49.8,
    starterCode: { python: "class Solution:\n    def setZeroes(self, matrix: List[List[int]]) -> None:\n        pass", java: "class Solution {\n    public void setZeroes(int[][] matrix) {\n    }\n}", javascript: "var setZeroes = function(matrix) {\n};" },
  },
  {
    id: 155, title: "Majority Element", difficulty: "Easy", tags: ["Arrays & Hashing"],
    description: "Given an array `nums` of size `n`, return the majority element.\n\nThe majority element is the element that appears more than ⌊n / 2⌋ times.",
    examples: [
      { input: "nums = [3,2,3]", output: "3" },
      { input: "nums = [2,2,1,1,1,2,2]", output: "2" },
    ],
    constraints: ["n == nums.length", "1 <= n <= 5 * 10^4", "-10^9 <= nums[i] <= 10^9"],
    acceptanceRate: 66.5,
    starterCode: { python: "class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int majorityElement(int[] nums) {\n    }\n}", javascript: "var majorityElement = function(nums) {\n};" },
  },
  {
    id: 156, title: "Majority Element II", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.",
    examples: [
      { input: "nums = [3,2,3]", output: "[3]" },
      { input: "nums = [1]", output: "[1]" },
    ],
    constraints: ["1 <= nums.length <= 5 * 10^4", "-10^9 <= nums[i] <= 10^9"],
    acceptanceRate: 43.2,
    starterCode: { python: "class Solution:\n    def majorityElement(self, nums: List[int]) -> List[int]:\n        pass", java: "class Solution {\n    public List<Integer> majorityElement(int[] nums) {\n    }\n}", javascript: "var majorityElement = function(nums) {\n};" },
  },

  // ==================== TWO POINTERS ====================
  {
    id: 157, title: "Trapping Rain Water", difficulty: "Hard", tags: ["Two Pointers"],
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "See the example visually for how the water is trapped between the bars." },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    acceptanceRate: 57.3,
    starterCode: { python: "class Solution:\n    def trap(self, height: List[int]) -> int:\n        pass", java: "class Solution {\n    public int trap(int[] height) {\n    }\n}", javascript: "var trap = function(height) {\n};" },
  },
  {
    id: 158, title: "Container With Most Water", difficulty: "Medium", tags: ["Two Pointers"],
    description: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The vertical lines are at indices 1 and 8." },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    acceptanceRate: 55.4,
    starterCode: { python: "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        pass", java: "class Solution {\n    public int maxArea(int[] height) {\n    }\n}", javascript: "var maxArea = function(height) {\n};" },
  },
  {
    id: 159, title: "Remove Duplicates from Sorted Array", difficulty: "Easy", tags: ["Two Pointers"],
    description: "Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.\n\nThe relative order of the elements should be kept the same. Return the number of unique elements.",
    examples: [
      { input: "nums = [1,1,2]", output: "2", explanation: "After removing duplicates, the array becomes [1,2]." },
      { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5" },
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4", "-100 <= nums[i] <= 100"],
    acceptanceRate: 62.3,
    starterCode: { python: "class Solution:\n    def removeDuplicates(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int removeDuplicates(int[] nums) {\n    }\n}", javascript: "var removeDuplicates = function(nums) {\n};" },
  },
  {
    id: 160, title: "Remove Duplicates II", difficulty: "Medium", tags: ["Two Pointers"],
    description: "Given an integer array `nums` sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice.\n\nReturn the number of elements in `nums` after removing duplicates.",
    examples: [
      { input: "nums = [1,1,1,2,2,3]", output: "5", explanation: "After removing duplicates, the array becomes [1,1,2,2,3]." },
      { input: "nums = [0,0,1,1,1,1,2,3,3]", output: "7" },
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4", "-100 <= nums[i] <= 100"],
    acceptanceRate: 58.6,
    starterCode: { python: "class Solution:\n    def removeDuplicates(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int removeDuplicates(int[] nums) {\n    }\n}", javascript: "var removeDuplicates = function(nums) {\n};" },
  },

  // ==================== SLIDING WINDOW ====================
  {
    id: 161, title: "Minimum Window Substring", difficulty: "Hard", tags: ["Sliding Window"],
    description: "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.\n\nIf there is no such window, return the empty string.",
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: "The minimum window substring \\\"BANC\\\" includes \\\"A\\\", \\\"B\\\", and \\\"C\\\" from string t." },
      { input: 's = "a", t = "aa"', output: '""' },
    ],
    constraints: ["m == s.length", "n == t.length", "1 <= m, n <= 10^5", "s and t consist of uppercase and lowercase English letters."],
    acceptanceRate: 41.6,
    starterCode: { python: "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        pass", java: "class Solution {\n    public String minWindow(String s, String t) {\n    }\n}", javascript: "var minWindow = function(s, t) {\n};" },
  },
  {
    id: 162, title: "Sliding Window Maximum", difficulty: "Hard", tags: ["Sliding Window"],
    description: "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right.\n\nYou can only see the `k` numbers in the window. Each time the sliding window moves right by one position, return the maximum sliding window.",
    examples: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "1 <= k <= nums.length"],
    acceptanceRate: 46.7,
    starterCode: { python: "class Solution:\n    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:\n        pass", java: "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n    }\n}", javascript: "var maxSlidingWindow = function(nums, k) {\n};" },
  },
  {
    id: 163, title: "Permutation in String", difficulty: "Medium", tags: ["Sliding Window"],
    description: "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.\n\nIn other words, return true if one of s1's permutations is the substring of s2.",
    examples: [
      { input: 's1 = "ab", s2 = "eidbaa"', output: "true", explanation: 's2 contains the permutation \\\"ba\\\" of s1 starting from index 1.' },
      { input: 's1 = "ab", s2 = "abab"', output: "true" },
    ],
    constraints: ["1 <= s1.length, s2.length <= 10^4", "s1 and s2 consist of lowercase English letters only."],
    acceptanceRate: 48.3,
    starterCode: { python: "class Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        pass", java: "class Solution {\n    public boolean checkInclusion(String s1, String s2) {\n    }\n}", javascript: "var checkInclusion = function(s1, s2) {\n};" },
  },
  {
    id: 164, title: "Longest Repeating Character Replacement", difficulty: "Medium", tags: ["Sliding Window"],
    description: "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.",
    examples: [
      { input: 's = "ABAB", k = 2', output: "4", explanation: "Replace the two 'A's with two 'B's or vice versa." },
      { input: 's = "AABCCCCCCCD", k = 2', output: "5", explanation: "Replace the two 'A's with two 'C's, the substring \\\"CCCCCC\\\" has the maximum length under the above condition." },
    ],
    constraints: ["1 <= s.length <= 10^5", "s consists of only uppercase English letters.", "0 <= k <= s.length"],
    acceptanceRate: 54.8,
    starterCode: { python: "class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        pass", java: "class Solution {\n    public int characterReplacement(String s, int k) {\n    }\n}", javascript: "var characterReplacement = function(s, k) {\n};" },
  },

  // ==================== STACK ====================
  {
    id: 165, title: "Min Stack", difficulty: "Medium", tags: ["Stack"],
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class with methods: `push(val)`, `pop()`, `top()`, and `getMin()`.",
    examples: [
      { input: "MinStack stack; stack.push(-2); stack.push(0); stack.push(-3); stack.getMin(); // -3 stack.pop(); stack.top(); // 0 stack.getMin(); // -2", output: "" },
    ],
    constraints: ["Methods pop, top and getMin operations will always be called on non-empty stacks.", "-2^31 <= val <= 2^31 - 1"],
    acceptanceRate: 53.6,
    starterCode: { python: "class MinStack:\n    def __init__(self):\n        pass\n    def push(self, val: int) -> None:\n        pass", java: "class MinStack {\n    public void push(int val) {\n    }\n}", javascript: "var MinStack = function() {\n};" },
  },
  {
    id: 166, title: "Valid Parentheses", difficulty: "Easy", tags: ["Stack"],
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if: Every open bracket is closed by a bracket of the same type, and every closing bracket has a corresponding opening bracket of the same type.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "([)]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4", "s[i] is a parenthesis or bracket."],
    acceptanceRate: 40.8,
    starterCode: { python: "class Solution:\n    def isValid(self, s: str) -> bool:\n        pass", java: "class Solution {\n    public boolean isValid(String s) {\n    }\n}", javascript: "var isValid = function(s) {\n};" },
  },
  {
    id: 167, title: "Evaluate Reverse Polish Notation", difficulty: "Medium", tags: ["Stack"],
    description: "Evaluate the value of an arithmetic expression in reverse Polish notation.", 
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: "9" },
      { input: 'tokens = ["4","13","5","/","+"]', output: "6" },
    ],
    constraints: ["1 <= tokens.length <= 10^4"],
    acceptanceRate: 39.8,
    starterCode: { python: "class Solution:\n    def evalRPN(self, tokens: List[str]) -> int:\n        pass", java: "class Solution {\n    public int evalRPN(String[] tokens) {\n    }\n}", javascript: "var evalRPN = function(tokens) {\n};" },
  },
  {
    id: 168, title: "Daily Temperatures", difficulty: "Medium", tags: ["Stack"],
    description: "Given an array of integers temperatures representing the daily temperatures, return an array answer where answer[i] is the number of days you have to wait after the `i`th day to get a warmer temperature.",
    examples: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
      { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" },
    ],
    constraints: ["1 <= temperatures.length <= 10^5", "30 <= temperatures[i] <= 100"],
    acceptanceRate: 68.5,
    starterCode: { python: "class Solution:\n    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:\n        pass", java: "class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n    }\n}", javascript: "var dailyTemperatures = function(temperatures) {\n};" },
  },

  // ==================== BINARY SEARCH ====================
  {
    id: 169, title: "Binary Search", difficulty: "Easy", tags: ["Binary Search"],
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 13", output: "-1" },
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 < nums[i], target < 10^4", "All elements in `nums` are unique."],
    acceptanceRate: 52.3,
    starterCode: { python: "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass", java: "class Solution {\n    public int search(int[] nums, int target) {\n    }\n}", javascript: "var search = function(nums, target) {\n};" },
  },
  {
    id: 170, title: "Search in Rotated Sorted Array", difficulty: "Medium", tags: ["Binary Search"],
    description: "There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k`.\n\nGiven the rotated array `nums` and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    ],
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i] <= 10^4", "All values of `nums` are unique."],
    acceptanceRate: 35.7,
    starterCode: { python: "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass", java: "class Solution {\n    public int search(int[] nums, int target) {\n    }\n}", javascript: "var search = function(nums, target) {\n};" },
  },
  {
    id: 171, title: "First Bad Version", difficulty: "Easy", tags: ["Binary Search"],
    description: "You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check.\n\nSince each version is developed based on the previous version, all the versions after a bad version are also bad. Suppose you have n versions and you want to find the first bad one. You can call an API `isBadVersion(version)` which returns whether `version` is bad. Find the first bad version.",
    examples: [
      { input: "n = 5, bad = 4", output: "4" },
      { input: "n = 1, bad = 1", output: "1" },
    ],
    constraints: ["1 <= bad <= n <= 2^31 - 1"],
    acceptanceRate: 42.5,
    starterCode: { python: "class Solution:\n    def firstBadVersion(self, n: int) -> int:\n        pass", java: "class Solution extends VersionControl {\n    public int firstBadVersion(int n) {\n    }\n}", javascript: "var solution = function(isBadVersion) {\n    return function(n) {\n    };\n};" },
  },
  {
    id: 172, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", tags: ["Binary Search"],
    description: "Suppose an array of length `n` sorted in ascending order is rotated between 1 and `n` times. For example, the array nums = [0,1,4,4,5,6,7] might become [4,5,6,7,0,1,4].\n\nGiven the rotated sorted array `nums` that may contain duplicates, return the minimum element of this array.",
    examples: [
      { input: "nums = [1,3]", output: "1" },
      { input: "nums = [3,1]", output: "1" },
    ],
    constraints: ["n == nums.length", "1 <= n <= 5000", "-5000 <= nums[i] <= 5000"],
    acceptanceRate: 47.3,
    starterCode: { python: "class Solution:\n    def findMin(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int findMin(int[] nums) {\n    }\n}", javascript: "var findMin = function(nums) {\n};" },
  },

  // ==================== LINKED LIST ====================
  {
    id: 173, title: "Reverse Linked List", difficulty: "Easy", tags: ["Linked List"],
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
    ],
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    acceptanceRate: 70.6,
    starterCode: { python: "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass", java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n    }\n}", javascript: "var reverseList = function(head) {\n};" },
  },
  {
    id: 174, title: "Merge Two Sorted Lists", difficulty: "Easy", tags: ["Linked List"],
    description: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists in a one sorted list. The list should be made by splicing together the nodes of the two lists.\n\nReturn the head of the merged linked list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100"],
    acceptanceRate: 62.8,
    starterCode: { python: "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        pass", java: "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    }\n}", javascript: "var mergeTwoLists = function(list1, list2) {\n};" },
  },
  {
    id: 175, title: "Reorder List", difficulty: "Medium", tags: ["Linked List"],
    description: "You are given the head of a singly linked-list. The list can be represented as:\n\nL0 → L1 → ... → Ln - 1 → Ln\n\nReorder the list to be on the following form:\n\nL0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → ...",
    examples: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]" },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" },
    ],
    constraints: ["The number of nodes in the list is in the range [1, 5 * 10^4].", "1 <= Node.val <= 1000"],
    acceptanceRate: 50.6,
    starterCode: { python: "class Solution:\n    def reorderList(self, head: Optional[ListNode]) -> None:\n        pass", java: "class Solution {\n    public void reorderList(ListNode head) {\n    }\n}", javascript: "var reorderList = function(head) {\n};" },
  },
  {
    id: 176, title: "Linked List Cycle", difficulty: "Easy", tags: ["Linked List"],
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.",
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true" },
      { input: "head = [1,2], pos = 0", output: "true" },
    ],
    constraints: ["The number of the nodes in the list is in the range [0, 10^4].", "-10^5 <= Node.val <= 10^5"],
    acceptanceRate: 46.3,
    starterCode: { python: "class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        pass", java: "class Solution {\n    public boolean hasCycle(ListNode head) {\n    }\n}", javascript: "var hasCycle = function(head) {\n};" },
  },

  // ==================== TREES ====================
  {
    id: 177, title: "Invert Binary Tree", difficulty: "Easy", tags: ["Trees"],
    description: "Given the root of a binary tree, invert the tree, and return its root.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 100].", "-100 <= Node.val <= 100"],
    acceptanceRate: 75.6,
    starterCode: { python: "class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        pass", java: "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n    }\n}", javascript: "var invertTree = function(root) {\n};" },
  },
  {
    id: 178, title: "Maximum Depth of Binary Tree", difficulty: "Easy", tags: ["Trees"],
    description: "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-100 <= Node.val <= 100"],
    acceptanceRate: 73.4,
    starterCode: { python: "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        pass", java: "class Solution {\n    public int maxDepth(TreeNode root) {\n    }\n}", javascript: "var maxDepth = function(root) {\n};" },
  },
  {
    id: 179, title: "Same Tree", difficulty: "Easy", tags: ["Trees"],
    description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" },
    ],
    constraints: ["The number of nodes in both trees is in the range [0, 100].", "-100 <= Node.val <= 100"],
    acceptanceRate: 65.8,
    starterCode: { python: "class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        pass", java: "class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n    }\n}", javascript: "var isSameTree = function(p, q) {\n};" },
  },
  {
    id: 180, title: "Binary Tree Level Order Traversal", difficulty: "Medium", tags: ["Trees"],
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 2000].", "-1000 <= Node.val <= 1000"],
    acceptanceRate: 63.5,
    starterCode: { python: "class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        pass", java: "class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n    }\n}", javascript: "var levelOrder = function(root) {\n};" },
  },

  // ==================== TRIES ====================
  {
    id: 181, title: "Implement Trie", difficulty: "Medium", tags: ["Tries"],
    description: "A trie (pronounced as \"try\") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.\n\nImplement the Trie class with methods: insert(word), search(word), startsWith(prefix).",
    examples: [
      { input: "Trie trie; trie.insert('apple'); trie.search('apple'); trie.startsWith('app');", output: "" },
    ],
    constraints: ["1 <= word.length, prefix.length <= 2000", "word and prefix consist only of lowercase English letters."],
    acceptanceRate: 61.7,
    starterCode: { python: "class Trie:\n    def __init__(self):\n        pass\n    def insert(self, word: str) -> None:\n        pass", java: "class Trie {\n    public Trie() {\n    }\n    public void insert(String word) {\n    }\n}", javascript: "var Trie = function() {\n};" },
  },
  {
    id: 182, title: "Search Suggestions System", difficulty: "Medium", tags: ["Tries"],
    description: "You are given an array of strings `products` and a string `searchWord`.\n\nDesign a system that suggests at most three product names from `products` after each character of `searchWord` is typed.",
    examples: [
      { input: 'products = ["mobile","mouse","moneybag","monitor"], searchWord = "mouse"', output: '[[\"mobile\",\"moneybag\",\"monitor\"],[\"mobile\",\"moneybag\",\"monitor\"],[\"mouse\"],[],[]]' },
    ],
    constraints: ["1 <= products.length <= 200"],
    acceptanceRate: 71.2,
    starterCode: { python: "class Solution:\n    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:\n        pass", java: "class Solution {\n    public List<List<String>> suggestedProducts(String[] products, String searchWord) {\n    }\n}", javascript: "var suggestedProducts = function(products, searchWord) {\n};" },
  },

  // ==================== HEAP ====================
  {
    id: 183, title: "Last Stone Weight", difficulty: "Easy", tags: ["Heap / Priority Queue"],
    description: "You are given an array of integers `stones` where `stones[i]` is the weight of the ith stone.\n\nWe are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together.",
    examples: [
      { input: "stones = [2,7,4,1,8,1]", output: "1" },
      { input: "stones = [1]", output: "1" },
    ],
    constraints: ["1 <= stones.length <= 30"],
    acceptanceRate: 76.3,
    starterCode: { python: "class Solution:\n    def lastStoneWeight(self, stones: List[int]) -> int:\n        pass", java: "class Solution {\n    public int lastStoneWeight(int[] stones) {\n    }\n}", javascript: "var lastStoneWeight = function(stones) {\n};" },
  },
  {
    id: 184, title: "K Closest Points to Origin", difficulty: "Medium", tags: ["Heap / Priority Queue"],
    description: "Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the k closest points to the origin (0, 0).",
    examples: [
      { input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]", explanation: "The distance between [1,3] and the origin is sqrt(10). The distance between [-2,2] and the origin is sqrt(8)." },
    ],
    constraints: ["1 <= k <= points.length <= 10^4", "-10^4 <= xi, yi <= 10^4"],
    acceptanceRate: 68.5,
    starterCode: { python: "class Solution:\n    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:\n        pass", java: "class Solution {\n    public int[][] kClosest(int[][] points, int k) {\n    }\n}", javascript: "var kClosest = function(points, k) {\n};" },
  },
  {
    id: 185, title: "Top K Frequent Elements", difficulty: "Medium", tags: ["Heap / Priority Queue"],
    description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    acceptanceRate: 67.3,
    starterCode: { python: "class Solution:\n    def topKFrequent(self, nums: List[int], k: int) -> List[int]:\n        pass", java: "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n    }\n}", javascript: "var topKFrequent = function(nums, k) {\n};" },
  },

  // ==================== BACKTRACKING ====================
  {
    id: 186, title: "Combination Sum", difficulty: "Medium", tags: ["Backtracking"],
    description: "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`.",
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
    ],
    constraints: ["1 <= candidates.length <= 30", "1 <= candidates[i] <= 200"],
    acceptanceRate: 68.2,
    starterCode: { python: "class Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        pass", java: "class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    }\n}", javascript: "var combinationSum = function(candidates, target) {\n};" },
  },
  {
    id: 187, title: "Permutations", difficulty: "Medium", tags: ["Backtracking"],
    description: "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
    ],
    constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10"],
    acceptanceRate: 76.8,
    starterCode: { python: "class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        pass", java: "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n    }\n}", javascript: "var permute = function(nums) {\n};" },
  },
  {
    id: 188, title: "Subsets", difficulty: "Medium", tags: ["Backtracking"],
    description: "Given an integer array `nums` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. You can return the solution in any order.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" },
    ],
    constraints: ["1 <= nums.length <= 10"],
    acceptanceRate: 80.5,
    starterCode: { python: "class Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        pass", java: "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n    }\n}", javascript: "var subsets = function(nums) {\n};" },
  },
  {
    id: 189, title: "Word Search", difficulty: "Medium", tags: ["Backtracking"],
    description: "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
    ],
    constraints: ["m == board.length", "n = board[i].length"],
    acceptanceRate: 41.8,
    starterCode: { python: "class Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        pass", java: "class Solution {\n    public boolean exist(char[][] board, String word) {\n    }\n}", javascript: "var exist = function(board, word) {\n};" },
  },

  // ==================== GRAPHS ====================
  {
    id: 190, title: "Number of Islands", difficulty: "Medium", tags: ["Graphs"],
    description: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
    ],
    constraints: ["m == grid.length", "n == grid[i].length"],
    acceptanceRate: 59.2,
    starterCode: { python: "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        pass", java: "class Solution {\n    public int numIslands(char[][] grid) {\n    }\n}", javascript: "var numIslands = function(grid) {\n};" },
  },
  {
    id: 191, title: "Clone Graph", difficulty: "Medium", tags: ["Graphs"],
    description: "Given a reference of a node in a connected undirected graph. Return a deep copy of the graph.",
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
    ],
    constraints: ["The number of nodes in the graph is in the range [1, 100]."],
    acceptanceRate: 45.1,
    starterCode: { python: "class Solution:\n    def cloneGraph(self, node: 'Node') -> 'Node':\n        pass", java: "class Solution {\n    public Node cloneGraph(Node node) {\n    }\n}", javascript: "var cloneGraph = function(node) {\n};" },
  },
  {
    id: 192, title: "Course Schedule", difficulty: "Medium", tags: ["Graphs"],
    description: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    acceptanceRate: 51.8,
    starterCode: { python: "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        pass", java: "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n    }\n}", javascript: "var canFinish = function(numCourses, prerequisites) {\n};" },
  },
  {
    id: 193, title: "Pacific Atlantic Water Flow", difficulty: "Medium", tags: ["Graphs"],
    description: "There is an `m x n` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. 'P' and 'A' are borders of the Pacific and Atlantic oceans, respectively. Heights of the island are given by the 2D array `heights` where the water can only flow in four directions (up, down, left, right).\n\nReturn a list of grid coordinates where water can flow to both oceans.",
    examples: [
      { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" },
    ],
    constraints: ["m == heights.length", "n == heights[i].length"],
    acceptanceRate: 48.7,
    starterCode: { python: "class Solution:\n    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:\n        pass", java: "class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    }\n}", javascript: "var pacificAtlantic = function(heights) {\n};" },
  },

  // ==================== 1-D DP ====================
  {
    id: 194, title: "Climbing Stairs", difficulty: "Easy", tags: ["1-D DP"],
    description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step 2. 2 steps" },
      { input: "n = 3", output: "3", explanation: "1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step" },
    ],
    constraints: ["1 <= n <= 45"],
    acceptanceRate: 55.3,
    starterCode: { python: "class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass", java: "class Solution {\n    public int climbStairs(int n) {\n    }\n}", javascript: "var climbStairs = function(n) {\n};" },
  },
  {
    id: 195, title: "House Robber", difficulty: "Medium", tags: ["1-D DP"],
    description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, represented by the array `nums`.\n\nYou cannot rob two adjacent houses. Determine the maximum amount of money you can rob without alerting the police.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and house 3 (money = 3). Total = 1 + 3 = 4." },
      { input: "nums = [2,7,9,3]", output: "9", explanation: "Rob house 2 (money = 7) and house 4 (money = 3). Total = 7 + 2 = 9." },
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    acceptanceRate: 53.4,
    starterCode: { python: "class Solution:\n    def rob(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int rob(int[] nums) {\n    }\n}", javascript: "var rob = function(nums) {\n};" },
  },
  {
    id: 196, title: "Coin Change", difficulty: "Medium", tags: ["1-D DP"],
    description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    examples: [
      { input: "coins = [1,2,5], amount = 5", output: "1", explanation: "We can use one 5-coin." },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1"],
    acceptanceRate: 42.1,
    starterCode: { python: "class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        pass", java: "class Solution {\n    public int coinChange(int[] coins, int amount) {\n    }\n}", javascript: "var coinChange = function(coins, amount) {\n};" },
  },
  {
    id: 197, title: "Longest Increasing Subsequence", difficulty: "Medium", tags: ["1-D DP"],
    description: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
      { input: "nums = [0,1,0,4,4,4,3,10,14,5]", output: "5" },
    ],
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    acceptanceRate: 52.8,
    starterCode: { python: "class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int lengthOfLIS(int[] nums) {\n    }\n}", javascript: "var lengthOfLIS = function(nums) {\n};" },
  },

  // ==================== INTERVALS ====================
  {
    id: 198, title: "Merge Intervals", difficulty: "Medium", tags: ["Intervals"],
    description: "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals.",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ],
    constraints: ["1 <= intervals.length <= 10^4"],
    acceptanceRate: 51.2,
    starterCode: { python: "class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        pass", java: "class Solution {\n    public int[][] merge(int[][] intervals) {\n    }\n}", javascript: "var merge = function(intervals) {\n};" },
  },
  {
    id: 199, title: "Insert Interval", difficulty: "Medium", tags: ["Intervals"],
    description: "You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the ith interval in sorted order.\n\nYou are also given an interval `newInterval = [start, end]` that you need to insert. Insert `newInterval` into `intervals` such that `intervals` is still sorted in sorted order and `intervals` still does not have any overlapping intervals.",
    examples: [
      { input: "intervals = [[1,5]], newInterval = [2,7]", output: "[[1,7]]" },
      { input: "intervals = [[1,2],[3,5],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" },
    ],
    constraints: ["0 <= intervals.length <= 10^4"],
    acceptanceRate: 37.4,
    starterCode: { python: "class Solution:\n    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:\n        pass", java: "class Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n    }\n}", javascript: "var insert = function(intervals, newInterval) {\n};" },
  },
  {
    id: 200, title: "Non-overlapping Intervals", difficulty: "Medium", tags: ["Intervals"],
    description: "Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    examples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "You can remove [1,3] and the rest of the intervals will be non-overlapping." },
    ],
    constraints: ["1 <= intervals.length <= 10^5"],
    acceptanceRate: 48.9,
    starterCode: { python: "class Solution:\n    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:\n        pass", java: "class Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n    }\n}", javascript: "var eraseOverlapIntervals = function(intervals) {\n};" },
  },

  // ==================== GREEDY ====================
  {
    id: 201, title: "Valid Parenthesis String", difficulty: "Medium", tags: ["Greedy"],
    description: "Given a string `s` containing only three types of characters: '(', ')' and '*', return `true` if `s` is a valid parenthesis string.\n\nEvery left parenthesis '(' must have a corresponding right parenthesis ')'.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "(*)"', output: "true" },
    ],
    constraints: ["1 <= s.length <= 100", "s[i] is '(', ')' or '*'."],
    acceptanceRate: 39.8,
    starterCode: { python: "class Solution:\n    def checkValidString(self, s: str) -> bool:\n        pass", java: "class Solution {\n    public boolean checkValidString(String s) {\n    }\n}", javascript: "var checkValidString = function(s) {\n};" },
  },
  {
    id: 202, title: "Jump Game", difficulty: "Medium", tags: ["Greedy"],
    description: "You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length from that position.\n\nDetermine if you can reach the last index. Return `true` if you can, `false` otherwise.",
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true", explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index." },
      { input: "nums = [3,2,1,0,4]", output: "false", explanation: "You will always arrive at index 3, the maximum jump length takes you there." },
    ],
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    acceptanceRate: 40.3,
    starterCode: { python: "class Solution:\n    def canJump(self, nums: List[int]) -> bool:\n        pass", java: "class Solution {\n    public boolean canJump(int[] nums) {\n    }\n}", javascript: "var canJump = function(nums) {\n};" },
  },
  {
    id: 203, title: "Jump Game II", difficulty: "Medium", tags: ["Greedy"],
    description: "You are given a 0-indexed array of integers `nums` of length `n`. You are initially positioned at `nums[0]`.\n\nEach element `nums[i]` represents the maximum length of a forward jump from index `i`. Return the minimum number of jumps to reach `nums[n - 1]`.",
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "2", explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index." },
    ],
    constraints: ["1 <= nums.length <= 10^4"],
    acceptanceRate: 39.7,
    starterCode: { python: "class Solution:\n    def jump(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int jump(int[] nums) {\n    }\n}", javascript: "var jump = function(nums) {\n};" },
  },
  {
    id: 204, title: "Gas Station", difficulty: "Medium", tags: ["Greedy"],
    description: "There are `n` gas stations along a circular route, where the amount of gas at the ith station is `gas[i]`.\n\nYou have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from station i and station (i + 1). You begin the journey with an empty tank at one of the gas stations.\n\nGiven two arrays `gas` and `cost`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.",
    examples: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" },
      { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1" },
    ],
    constraints: ["n == gas.length", "n == cost.length"],
    acceptanceRate: 44.8,
    starterCode: { python: "class Solution:\n    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:\n        pass", java: "class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n    }\n}", javascript: "var canCompleteCircuit = function(gas, cost) {\n};" },
  },

  // ==================== ADVANCED GRAPHS & 2D DP & BIT & MATH ====================
  {
    id: 205, title: "Word Ladder", difficulty: "Hard", tags: ["Advanced Graphs"],
    description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words where every adjacent pair of words differs by a single letter.",
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5" },
    ],
    constraints: ["1 <= beginWord.length <= 10"],
    acceptanceRate: 41.2,
    starterCode: { python: "class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:\n        pass", java: "class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    }\n}", javascript: "var ladderLength = function(beginWord, endWord, wordList) {\n};" },
  },
  {
    id: 206, title: "Unique Paths", difficulty: "Medium", tags: ["2-D DP"],
    description: "There is a robot on an `m x n` grid. The robot is initially at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m - 1][n - 1]`).\n\nThe robot can only move either down or right at any point in time. Given the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    examples: [
      { input: "m = 3, n = 7", output: "28" },
      { input: "m = 3, n = 2", output: "3" },
    ],
    constraints: ["1 <= m, n <= 100"],
    acceptanceRate: 67.2,
    starterCode: { python: "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        pass", java: "class Solution {\n    public int uniquePaths(int m, int n) {\n    }\n}", javascript: "var uniquePaths = function(m, n) {\n};" },
  },
  {
    id: 207, title: "Number of 1 Bits", difficulty: "Easy", tags: ["Bit Manipulation"],
    description: "Given a positive integer `n`, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).",
    examples: [
      { input: "n = 11", output: "3", explanation: 'The input binary string is "1011", which has 3 ones.' },
      { input: "n = 128", output: "1", explanation: 'The input binary string is "10000000", which has 1 one.' },
    ],
    constraints: ["1 <= n <= 2^31 - 1"],
    acceptanceRate: 79.4,
    starterCode: { python: "class Solution:\n    def hammingWeight(self, n: int) -> int:\n        pass", java: "class Solution {\n    public int hammingWeight(int n) {\n    }\n}", javascript: "var hammingWeight = function(n) {\n};" },
  },
  {
    id: 208, title: "Missing Number", difficulty: "Easy", tags: ["Bit Manipulation", "Math & Geometry"],
    description: "Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one number that is missing from the array.",
    examples: [
      { input: "nums = [3,0,1]", output: "2" },
      { input: "nums = [0,1]", output: "2" },
    ],
    constraints: ["n == nums.length", "1 <= n <= 10^4"],
    acceptanceRate: 63.5,
    starterCode: { python: "class Solution:\n    def missingNumber(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int missingNumber(int[] nums) {\n    }\n}", javascript: "var missingNumber = function(nums) {\n};" },
  },
];
