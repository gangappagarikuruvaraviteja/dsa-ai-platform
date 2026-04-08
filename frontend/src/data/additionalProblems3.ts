// Additional NeetCode Problems - Part 3
import type { Problem } from "./mockData";

export const additionalProblems3: Problem[] = [
  // ==================== MORE DP ====================
  {
    id: 238,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    tags: ["1-D DP"],
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell that stock.`,
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
      },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    acceptanceRate: 54.3,
    starterCode: {
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        pass`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
    }
}`,
      javascript: `var maxProfit = function(prices) {
};`,
    },
  },

  {
    id: 243,
    title: "Edit Distance",
    difficulty: "Hard",
    tags: ["2-D DP"],
    description: `Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.`,
    examples: [
      {
        input: `word1 = "horse", word2 = "ros"`,
        output: "3",
        explanation: `horse -> rorse -> rose -> ros`,
      },
    ],
    constraints: ["0 <= word1.length, word2.length <= 500"],
    acceptanceRate: 55.8,
    starterCode: {
      python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        pass`,
      java: `class Solution {
    public int minDistance(String word1, String word2) {
    }
}`,
      javascript: `var minDistance = function(word1, word2) {
};`,
    },
  },

  {
    id: 245,
    title: "Decode Ways",
    difficulty: "Medium",
    tags: ["1-D DP"],
    description: `A message containing letters from A-Z can be encoded into numbers using mapping: 'A' -> "1" ... 'Z' -> "26". Given an encoded message containing digits, determine total ways to decode.`,
    examples: [
      {
        input: `s = "12"`,
        output: "2",
        explanation: `"12" -> "AB" or "L"`,
      },
    ],
    constraints: ["1 <= s.length <= 100"],
    acceptanceRate: 38.2,
    starterCode: {
      python: `class Solution:
    def numDecodings(self, s: str) -> int:
        pass`,
      java: `class Solution {
    public int numDecodings(String s) {
    }
}`,
      javascript: `var numDecodings = function(s) {
};`,
    },
  },

  // ==================== GRAPHS ====================

  {
    id: 246,
    title: "Topological Sort (Kahn's Algorithm)",
    difficulty: "Medium",
    tags: ["Graphs"],
    description: `Given a DAG of n nodes labeled 0 to n-1, return a topological ordering of nodes.`,
    examples: [
      {
        input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        output: "[0,1,2,3]",
      },
    ],
    constraints: ["1 <= numCourses <= 2000"],
    acceptanceRate: 57.3,
    starterCode: {
      python: `class Solution:
    def topologicalSort(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        pass`,
      java: `class Solution {
    public int[] topologicalSort(int numCourses, int[][] prerequisites) {
    }
}`,
      javascript: `var topologicalSort = function(numCourses, prerequisites) {
};`,
    },
  },

  {
    id: 248,
    title: "Alien Dictionary",
    difficulty: "Hard",
    tags: ["Graphs"],
    description: `Given sorted words from an alien dictionary, return the order of characters.`,
    examples: [
      {
        input: `words = ["wrt","wrf","er","ett","rftt"]`,
        output: `"wertf"`,
      },
    ],
    constraints: ["1 <= words.length <= 100"],
    acceptanceRate: 38.1,
    starterCode: {
      python: `class Solution:
    def alienOrder(self, words: List[str]) -> str:
        pass`,
      java: `class Solution {
    public String alienOrder(List<String> words) {
    }
}`,
      javascript: `var alienOrder = function(words) {
};`,
    },
  },

  // ==================== INTERVALS ====================

  {
    id: 252,
    title: "Meeting Rooms",
    difficulty: "Easy",
    tags: ["Intervals"],
    description: `Given meeting intervals, determine if a person can attend all meetings.`,
    examples: [
      {
        input: "intervals = [[0,30],[5,10],[15,20]]",
        output: "false",
      },
    ],
    constraints: ["0 <= intervals.length <= 50000"],
    acceptanceRate: 65.8,
    starterCode: {
      python: `class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        pass`,
      java: `class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
    }
}`,
      javascript: `var canAttendMeetings = function(intervals) {
};`,
    },
  },

  {
    id: 254,
    title: "LRU Cache",
    difficulty: "Medium",
    tags: ["Design"],
    description: `Design a Least Recently Used (LRU) cache with O(1) operations.`,
    examples: [
      {
        input: "LRUCache(2), put(1,1), put(2,2), get(1)",
        output: "1",
      },
    ],
    constraints: ["1 <= capacity <= 3000"],
    acceptanceRate: 37.5,
    starterCode: {
      python: `class LRUCache:
    def __init__(self, capacity: int):
        pass`,
      java: `class LRUCache {
    public LRUCache(int capacity) {
    }
}`,
      javascript: `var LRUCache = function(capacity) {
};`,
    },
  },

  {
    id: 255,
    title: "Basic Calculator",
    difficulty: "Hard",
    tags: ["Stack"],
    description: `Evaluate a mathematical expression string.`,
    examples: [
      { input: `s = "1 + 1"`, output: "2" },
      { input: `s = "2-1 + 2"`, output: "3" },
    ],
    constraints: ["1 <= s.length <= 3 * 10^5"],
    acceptanceRate: 39.8,
    starterCode: {
      python: `class Solution:
    def calculate(self, s: str) -> int:
        pass`,
      java: `class Solution {
    public int calculate(String s) {
    }
}`,
      javascript: `var calculate = function(s) {
};`,
    },
  },

  {
    id: 256,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    tags: ["Arrays & Hashing"],
    description: `Find the longest common prefix among an array of strings.`,
    examples: [
      {
        input: `strs = ["flower","flow","flight"]`,
        output: `"fl"`,
      },
    ],
    constraints: ["1 <= strs.length <= 200"],
    acceptanceRate: 42.5,
    starterCode: {
      python: `class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        pass`,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
    }
}`,
      javascript: `var longestCommonPrefix = function(strs) {
};`,
    },
  },
];