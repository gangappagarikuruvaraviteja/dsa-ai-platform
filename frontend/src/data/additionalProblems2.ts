// Additional NeetCode Problems - Part 2
import type { Problem } from "./mockData";

export const additionalProblems2: Problem[] = [
  // ==================== MORE BACKTRACKING ====================
  {
    id: 209, title: "N-Queens", difficulty: "Hard", tags: ["Backtracking"],
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.",
    examples: [
      { input: "n = 4", output: '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]' },
    ],
    constraints: ["1 <= n <= 9"],
    acceptanceRate: 67.5,
    starterCode: { python: "class Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        pass", java: "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n    }\n}", javascript: "var solveNQueens = function(n) {\n};" },
  },
  {
    id: 210, title: "Letter Combinations of a Phone Number", difficulty: "Medium", tags: ["Backtracking"],
    description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.",
    examples: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
    ],
    constraints: ["0 <= digits.length <= 4"],
    acceptanceRate: 58.7,
    starterCode: { python: "class Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        pass", java: "class Solution {\n    public List<String> letterCombinations(String digits) {\n    }\n}", javascript: "var letterCombinations = function(digits) {\n};" },
  },
  {
    id: 211, title: "Palindrome Partitioning", difficulty: "Medium", tags: ["Backtracking"],
    description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
    examples: [
      { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' },
    ],
    constraints: ["1 <= s.length <= 16"],
    acceptanceRate: 71.3,
    starterCode: { python: "class Solution:\n    def partition(self, s: str) -> List[List[str]]:\n        pass", java: "class Solution {\n    public List<List<String>> partition(String s) {\n    }\n}", javascript: "var partition = function(s) {\n};" },
  },
  {
    id: 212, title: "Word Search II", difficulty: "Hard", tags: ["Backtracking", "Tries"],
    description: "Given an m x n board of characters and a list of strings words, return all words on the board.",
    examples: [
      { input: 'board = [[\"o\",\"a\",\"a\"],[\"e\",\"t\",\"a\"],[\"t\",\"a\",\"r\"]], words = [\"oath\",\"pea\",\"eat\",\"ra\"]', output: '["eat","oath"]' },
    ],
    constraints: ["m == board.length", "n == board[i].length"],
    acceptanceRate: 42.3,
    starterCode: { python: "class Solution:\n    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:\n        pass", java: "class Solution {\n    public List<String> findWords(char[][] board, String[] words) {\n    }\n}", javascript: "var findWords = function(board, words) {\n};" },
  },

  // ==================== MORE ARRAYS & SORTING ====================
  {
    id: 213, title: "Merge Sorted Array", difficulty: "Easy", tags: ["Arrays & Hashing"],
    description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of valid elements in nums1 and nums2 respectively.",
    examples: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" },
    ],
    constraints: ["nums1.length == m + n"],
    acceptanceRate: 49.5,
    starterCode: { python: "class Solution:\n    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n        pass", java: "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n    }\n}", javascript: "var merge = function(nums1, m, nums2, n) {\n};" },
  },
  {
    id: 214, title: "Rotate Array", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.",
    examples: [
      { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-2^31 <= nums[i] <= 2^31 - 1"],
    acceptanceRate: 40.2,
    starterCode: { python: "class Solution:\n    def rotate(self, nums: List[int], k: int) -> None:\n        pass", java: "class Solution {\n    public void rotate(int[] nums, int k) {\n    }\n}", javascript: "var rotate = function(nums, k) {\n};" },
  },
  {
    id: 215, title: "Kth Largest Element in an Array", difficulty: "Medium", tags: ["Heap / Priority Queue"],
    description: "Given an integer array nums and an integer k, return the kth largest element in the array.",
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
    ],
    constraints: ["1 <= k <= nums.length <= 10^5"],
    acceptanceRate: 68.3,
    starterCode: { python: "class Solution:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        pass", java: "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n    }\n}", javascript: "var findKthLargest = function(nums, k) {\n};" },
  },
  {
    id: 216, title: "Sort Colors", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Given an array nums with n objects colored red, white, or blue, sorted in-place so that objects of the same color are adjacent, with the colors in order red, white, and blue.",
    examples: [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
    ],
    constraints: ["n == nums.length", "1 <= n <= 300"],
    acceptanceRate: 60.4,
    starterCode: { python: "class Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        pass", java: "class Solution {\n    public void sortColors(int[] nums) {\n    }\n}", javascript: "var sortColors = function(nums) {\n};" },
  },

  // ==================== STRING MANIPULATION ====================
  {
    id: 217, title: "Longest Palindromic Substring", difficulty: "Medium", tags: ["Sliding Window"],
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: [
      { input: 's = "babad"', output: '"bab" or "aba"' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
    acceptanceRate: 36.6,
    starterCode: { python: "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass", java: "class Solution {\n    public String longestPalindrome(String s) {\n    }\n}", javascript: "var longestPalindrome = function(s) {\n};" },
  },
  {
    id: 218, title: "Palindrome Substrings", difficulty: "Medium", tags: ["Sliding Window"],
    description: "Given a string s, return the number of palindromic substrings in it.",
    examples: [
      { input: 's = "abc"', output: "3" },
      { input: 's = "aaaa"', output: "10" },
    ],
    constraints: ["1 <= s.length <= 1000"],
    acceptanceRate: 70.9,
    starterCode: { python: "class Solution:\n    def countSubstrings(self, s: str) -> int:\n        pass", java: "class Solution {\n    public int countSubstrings(String s) {\n    }\n}", javascript: "var countSubstrings = function(s) {\n};" },
  },
  {
    id: 219, title: "Encode and Decode Strings", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.",
    examples: [
      { input: 'strs = ["Hello","World"]', output: 'strs = ["Hello","World"]' },
    ],
    constraints: ["0 <= strs.length < 100", "0 <= strs[i].length < 200"],
    acceptanceRate: 45.2,
    starterCode: { python: "class Solution:\n    def encode(self, strs: List[str]) -> str:\n        pass", java: "class Solution {\n    public String encode(List<String> strs) {\n    }\n}", javascript: "var encode = function(strs) {\n};" },
  },
  {
    id: 220, title: "String to Integer (atoi)", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
    examples: [
      { input: 's = "42"', output: "42" },
      { input: 's = "   -42"', output: "-42" },
    ],
    constraints: ["0 <= s.length <= 200"],
    acceptanceRate: 16.6,
    starterCode: { python: "class Solution:\n    def myAtoi(self, s: str) -> int:\n        pass", java: "class Solution {\n    public int myAtoi(String s) {\n    }\n}", javascript: "var myAtoi = function(s) {\n};" },
  },

  // ==================== MORE TREES ====================
  {
    id: 221, title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Easy", tags: ["Trees"],
    description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    examples: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" },
    ],
    constraints: ["2 <= Node.val <= 10^9"],
    acceptanceRate: 57.4,
    starterCode: { python: "class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        pass", java: "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    }\n}", javascript: "var lowestCommonAncestor = function(root, p, q) {\n};" },
  },
  {
    id: 222, title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", tags: ["Trees"],
    description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
    examples: [
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3" },
    ],
    constraints: ["2 <= Node.val <= 10^9"],
    acceptanceRate: 61.8,
    starterCode: { python: "class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        pass", java: "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    }\n}", javascript: "var lowestCommonAncestor = function(root, p, q) {\n};" },
  },
  {
    id: 223, title: "Binary Tree Right Side View", difficulty: "Medium", tags: ["Trees"],
    description: "Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
    examples: [
      { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 100]"],
    acceptanceRate: 67.2,
    starterCode: { python: "class Solution:\n    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:\n        pass", java: "class Solution {\n    public List<Integer> rightSideView(TreeNode root) {\n    }\n}", javascript: "var rightSideView = function(root) {\n};" },
  },
  {
    id: 224, title: "Validate Binary Search Tree", difficulty: "Medium", tags: ["Trees"],
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    examples: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false" },
    ],
    constraints: ["The number of nodes in the tree is in the range [1, 10^4]"],
    acceptanceRate: 33.8,
    starterCode: { python: "class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        pass", java: "class Solution {\n    public boolean isValidBST(TreeNode root) {\n    }\n}", javascript: "var isValidBST = function(root) {\n};" },
  },
  {
    id: 225, title: "Kth Smallest Element in a BST", difficulty: "Medium", tags: ["Trees"],
    description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
    examples: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1" },
    ],
    constraints: ["The number of nodes in the tree is n.", "1 <= k <= n <= 10^4"],
    acceptanceRate: 76.5,
    starterCode: { python: "class Solution:\n    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:\n        pass", java: "class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n    }\n}", javascript: "var kthSmallest = function(root, k) {\n};" },
  },

  // ==================== BIT MANIPULATION ====================
  {
    id: 226, title: "Single Number", difficulty: "Easy", tags: ["Bit Manipulation"],
    description: "Given a non-empty array of integers nums, every element appears twice except for one element that appears once. Find that single element.",
    examples: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" },
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    acceptanceRate: 79.8,
    starterCode: { python: "class Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int singleNumber(int[] nums) {\n    }\n}", javascript: "var singleNumber = function(nums) {\n};" },
  },
  {
    id: 227, title: "Single Number II", difficulty: "Medium", tags: ["Bit Manipulation"],
    description: "Given an integer array nums where every element appears three times except for one element that appears once. Find the single element and return it.",
    examples: [
      { input: "nums = [2,2,3,2]", output: "3" },
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    acceptanceRate: 63.5,
    starterCode: { python: "class Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        pass", java: "class Solution {\n    public int singleNumber(int[] nums) {\n    }\n}", javascript: "var singleNumber = function(nums) {\n};" },
  },
  {
    id: 228, title: "Reverse Bits", difficulty: "Easy", tags: ["Bit Manipulation"],
    description: "Reverse bits of a given 32-bit unsigned integer.",
    examples: [
      { input: "n = 43261596", output: "964176192" },
    ],
    constraints: ["The input must be a binary string of length 32"],
    acceptanceRate: 60.9,
    starterCode: { python: "class Solution:\n    def reverseBits(self, n: int) -> int:\n        pass", java: "class Solution {\n    public int reverseBits(int n) {\n    }\n}", javascript: "var reverseBits = function(n) {\n};" },
  },
  {
    id: 229, title: "Power of Two", difficulty: "Easy", tags: ["Bit Manipulation"],
    description: "Given an integer n, return true if it is a power of two. Otherwise, return false.",
    examples: [
      { input: "n = 1", output: "true" },
      { input: "n = 5", output: "false" },
    ],
    constraints: ["-2^31 <= n <= 2^31 - 1"],
    acceptanceRate: 48.1,
    starterCode: { python: "class Solution:\n    def isPowerOfTwo(self, n: int) -> bool:\n        pass", java: "class Solution {\n    public boolean isPowerOfTwo(int n) {\n    }\n}", javascript: "var isPowerOfTwo = function(n) {\n};" },
  },

  // ==================== MATRIX ====================
  {
    id: 230, title: "Rotate Matrix", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).",
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
    ],
    constraints: ["n == matrix.length == matrix[i].length", "1 <= n <= 20"],
    acceptanceRate: 66.5,
    starterCode: { python: "class Solution:\n    def rotate(self, matrix: List[List[int]]) -> None:\n        pass", java: "class Solution {\n    public void rotate(int[][] matrix) {\n    }\n}", javascript: "var rotate = function(matrix) {\n};" },
  },
  {
    id: 231, title: "Search a 2D Matrix", difficulty: "Medium", tags: ["Binary Search"],
    description: "Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix.",
    examples: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length"],
    acceptanceRate: 44.4,
    starterCode: { python: "class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        pass", java: "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n    }\n}", javascript: "var searchMatrix = function(matrix, target) {\n};" },
  },
  {
    id: 232, title: "Spiral Matrix", difficulty: "Medium", tags: ["Arrays & Hashing"],
    description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length"],
    acceptanceRate: 55.3,
    starterCode: { python: "class Solution:\n    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:\n        pass", java: "class Solution {\n    public List<Integer> spiralOrder(List<List<Integer>> matrix) {\n    }\n}", javascript: "var spiralOrder = function(matrix) {\n};" },
  },
  {
    id: 233, title: "Word Search", difficulty: "Medium", tags: ["Backtracking"],
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid.",
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
    ],
    constraints: ["m == board.length", "n == board[i].length"],
    acceptanceRate: 41.8,
    starterCode: { python: "class Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        pass", java: "class Solution {\n    public boolean exist(char[][] board, String word) {\n    }\n}", javascript: "var exist = function(board, word) {\n};" },
  },

  // ==================== MATH & GEOMETRY ====================
  {
    id: 234, title: "Pow(x, n)", difficulty: "Medium", tags: ["Math & Geometry"],
    description: "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).",
    examples: [
      { input: "x = 2.00000, n = 10", output: "1024.00000" },
    ],
    constraints: ["-100.0 < x < 100.0", "-2^31 <= n <= 2^31 - 1"],
    acceptanceRate: 34.5,
    starterCode: { python: "class Solution:\n    def myPow(self, x: float, n: int) -> float:\n        pass", java: "class Solution {\n    public double myPow(double x, int n) {\n    }\n}", javascript: "var myPow = function(x, n) {\n};" },
  },
  {
    id: 235, title: "Sqrt(x)", difficulty: "Easy", tags: ["Binary Search", "Math & Geometry"],
    description: "Given a non-negative integer x, return the square root of x rounded down to the nearest integer.",
    examples: [
      { input: "x = 4", output: "2" },
      { input: "x = 8", output: "2" },
    ],
    constraints: ["0 <= x <= 2^31 - 1"],
    acceptanceRate: 38.2,
    starterCode: { python: "class Solution:\n    def mySqrt(self, x: int) -> int:\n        pass", java: "class Solution {\n    public int mySqrt(int x) {\n    }\n}", javascript: "var mySqrt = function(x) {\n};" },
  },
  {
    id: 236, title: "Happy Number", difficulty: "Easy", tags: ["Math & Geometry"],
    description: "Write an algorithm to determine if a number n is happy. A number is called happy if the process defined below eventually reaches 1.",
    examples: [
      { input: "n = 7", output: "true" },
      { input: "n = 2", output: "false" },
    ],
    constraints: ["1 <= n <= 2^31 - 1"],
    acceptanceRate: 55.9,
    starterCode: { python: "class Solution:\n    def isHappy(self, n: int) -> bool:\n        pass", java: "class Solution {\n    public boolean isHappy(int n) {\n    }\n}", javascript: "var isHappy = function(n) {\n};" },
  },
  {
    id: 237, title: "Isomorphic Strings", difficulty: "Easy", tags: ["Arrays & Hashing"],
    description: "Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t.",
    examples: [
      { input: 's = "egg", t = "add"', output: "true" },
      { input: 's = "badc", t = "baba"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 5 * 10^4"],
    acceptanceRate: 43.4,
    starterCode: { python: "class Solution:\n    def isIsomorphic(self, s: str, t: str) -> bool:\n        pass", java: "class Solution {\n    public boolean isIsomorphic(String s, String t) {\n    }\n}", javascript: "var isIsomorphic = function(s, t) {\n};" },
  },
];
