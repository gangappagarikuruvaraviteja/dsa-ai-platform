import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { USE_SPRING_BOOT } from "@/config/backend";
import { problemsApi, progressApi, topicsApi } from "@/services/api";
import { additionalProblems } from "@/data/additionalProblems";
import { additionalProblems2 } from "@/data/additionalProblems2";
import { additionalProblems3 } from "@/data/additionalProblems3";
import { mockProblems } from "@/data/mockData";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  topic: string;
  tags: string[];
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  acceptance_rate: number;
  starter_code: Record<string, string>;
  neetcode_link: string | null;
  leetcode_number: number | null;
  problem_set: string;
  solved?: boolean;
}

interface SupplementalProblemContent {
  description?: string;
  examples?: { input: string; output: string; explanation?: string }[];
  constraints?: string[];
  starterCode?: { java?: string; python?: string; javascript?: string };
}

function normalizeTitle(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const SUPPLEMENTAL_PROBLEMS = [
  ...additionalProblems,
  ...additionalProblems2,
  ...additionalProblems3,
] as any[];

const SUPPLEMENTAL_BY_TITLE = new Map<string, SupplementalProblemContent>(
  SUPPLEMENTAL_PROBLEMS.map((p: any) => [
    normalizeTitle(p.title || ""),
    {
      description: p.description,
      examples: Array.isArray(p.examples) ? p.examples : undefined,
      constraints: Array.isArray(p.constraints) ? p.constraints : undefined,
      starterCode: p.starterCode,
    },
  ])
);

function findSupplementalByTitle(title: string): SupplementalProblemContent | null {
  const key = normalizeTitle(title);
  if (SUPPLEMENTAL_BY_TITLE.has(key)) {
    return SUPPLEMENTAL_BY_TITLE.get(key) || null;
  }

  // Fuzzy title resolution to map close variants.
  for (const [k, v] of SUPPLEMENTAL_BY_TITLE.entries()) {
    if (key.includes(k) || k.includes(key)) {
      return v;
    }
  }
  return null;
}

function findExamplesByTitle(title: string): { input: string; output: string; explanation?: string }[] | null {
  const key = normalizeTitle(title);
  if (EXAMPLE_LIBRARY[key]) {
    return EXAMPLE_LIBRARY[key];
  }

  // Fuzzy match to avoid generic fallbacks for close title variants
  const keys = Object.keys(EXAMPLE_LIBRARY).sort((a, b) => b.length - a.length);
  const matched = keys.find((k) => key.includes(k) || k.includes(key));
  return matched ? EXAMPLE_LIBRARY[matched] : null;
}

const EXAMPLE_LIBRARY: Record<string, { input: string; output: string; explanation?: string }[]> = {
  "contains duplicate": [
    { input: "nums = [1,2,3,1]", output: "true", explanation: "1 appears at least twice." },
    { input: "nums = [1,2,3,4]", output: "false" },
  ],
  "valid anagram": [
    { input: 's = "anagram", t = "nagaram"', output: "true" },
    { input: 's = "rat", t = "car"', output: "false" },
  ],
  "find all anagrams": [
    { input: 's = "cbaebabacd", p = "abc"', output: "[0,6]" },
    { input: 's = "abab", p = "ab"', output: "[0,1,2]" },
  ],
  "find all anagrams in a string": [
    { input: 's = "cbaebabacd", p = "abc"', output: "[0,6]" },
    { input: 's = "abab", p = "ab"', output: "[0,1,2]" },
  ],
  "two sum": [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
  ],
  "group anagrams": [
    { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["eat","tea","ate"],["tan","nat"],["bat"]]' },
    { input: 'strs = [""]', output: '[[""]]' },
  ],
  "top k frequent elements": [
    { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
    { input: "nums = [1], k = 1", output: "[1]" },
  ],
  "product of array except self": [
    { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
    { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
  ],
  "longest consecutive": [
    { input: "nums = [100,4,200,1,3,2]", output: "4" },
    { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
  ],
  "valid palindrome": [
    { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
    { input: 's = "race a car"', output: "false" },
  ],
  "three sum": [
    { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
    { input: "nums = [0,1,1]", output: "[]" },
  ],
  "container with most water": [
    { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
    { input: "height = [1,1]", output: "1" },
  ],
  "best time to buy and sell stock": [
    { input: "prices = [7,1,5,3,6,4]", output: "5" },
    { input: "prices = [7,6,4,3,1]", output: "0" },
  ],
  "longest substring without repeating characters": [
    { input: 's = "abcabcbb"', output: "3" },
    { input: 's = "bbbbb"', output: "1" },
  ],
  "longest repeating character replacement": [
    { input: 's = "ABAB", k = 2', output: "4" },
    { input: 's = "AABABBA", k = 1', output: "4" },
  ],
  "minimum window substring": [
    { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
    { input: 's = "a", t = "aa"', output: '""' },
  ],
  "valid parentheses": [
    { input: 's = "()[]{}"', output: "true" },
    { input: 's = "(]"', output: "false" },
  ],
  "binary search": [
    { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
    { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
  ],
  "search in rotated sorted array": [
    { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
    { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
  ],
  "reverse linked list": [
    { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
    { input: "head = [1,2]", output: "[2,1]" },
  ],
  "merge two sorted lists": [
    { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
    { input: "list1 = [], list2 = []", output: "[]" },
  ],
  "linked list cycle": [
    { input: "head = [3,2,0,-4], pos = 1", output: "true" },
    { input: "head = [1], pos = -1", output: "false" },
  ],
  "invert binary tree": [
    { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
    { input: "root = []", output: "[]" },
  ],
  "maximum depth of binary tree": [
    { input: "root = [3,9,20,null,null,15,7]", output: "3" },
    { input: "root = [1,null,2]", output: "2" },
  ],
  "same tree": [
    { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
    { input: "p = [1,2], q = [1,null,2]", output: "false" },
  ],
  "last stone weight": [
    { input: "stones = [2,7,4,1,8,1]", output: "1" },
    { input: "stones = [1]", output: "1" },
  ],
  "climbing stairs": [
    { input: "n = 2", output: "2" },
    { input: "n = 3", output: "3" },
  ],
  "house robber": [
    { input: "nums = [1,2,3,1]", output: "4" },
    { input: "nums = [2,7,9,3,1]", output: "12" },
  ],
  "coin change": [
    { input: "coins = [1,2,5], amount = 11", output: "3" },
    { input: "coins = [2], amount = 3", output: "-1" },
  ],
  "word break": [
    { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true" },
    { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: "false" },
  ],
  "number of islands": [
    { input: "grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]", output: "1" },
    { input: "grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]", output: "3" },
  ],
  "course schedule": [
    { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
    { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
  ],
  "lru cache": [
    {
      input: "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)",
      output: "[null,null,null,1,null,-1,null,-1,3,4]",
      explanation: "Use a doubly linked list plus hash map to keep the least recently used item at the tail.",
    },
  ],
  "sort colors": [
    {
      input: "nums = [2,0,2,1,1,0]",
      output: "[0,0,1,1,2,2]",
      explanation: "Use the Dutch National Flag partitioning approach to sort in-place.",
    },
    { input: "nums = [2,0,1]", output: "[0,1,2]" },
  ],
  "binary tree level order traversal": [
    {
      input: "root = [3,9,20,null,null,15,7]",
      output: "[[3],[9,20],[15,7]]",
      explanation: "Traverse the tree level by level using a queue.",
    },
    { input: "root = [1]", output: "[[1]]" },
  ],
  "kth largest element in a stream": [
    {
      input: "k = 3, nums = [4,5,8,2], add(3), add(5), add(10), add(9), add(4)",
      output: "[4,5,5,8,8]",
      explanation: "Maintain a min heap of size k.",
    },
  ],
  "game of life": [
    {
      input: "board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]",
      output: "[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]",
      explanation: "Apply the Game of Life rules to update the board for the next generation.",
    },
    {
      input: "board = [[1,1],[1,0]]",
      output: "[[1,1],[1,1]]",
    },
  ],
  "set matrix zeroes": [
    {
      input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
      output: "[[1,0,1],[0,0,0],[1,0,1]]",
    },
    {
      input: "matrix = [[0,1],[1,1]]",
      output: "[[0,0],[0,1]]",
    },
  ],
  "rotate array": [
    { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" },
    { input: "nums = [-1,-100,3,99], k = 2", output: "[3,99,-1,-100]" },
  ],
  "merge intervals": [
    { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
    { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
  ],
  "insert interval": [
    { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" },
    { input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]", output: "[[1,2],[3,10],[12,16]]" },
  ],
  "non-overlapping intervals": [
    { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1" },
    { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2" },
  ],
  "jump game": [
    { input: "nums = [2,3,1,1,4]", output: "true" },
    { input: "nums = [3,2,1,0,4]", output: "false" },
  ],
};

function buildFallbackExamples(title: string, topic: string): { input: string; output: string; explanation?: string }[] {
  const titleExamples = findExamplesByTitle(title);
  if (titleExamples) {
    return titleExamples;
  }

  const key = normalizeTitle(title);
  if (key.includes("anagram")) {
    return [
      { input: 's = "cbaebabacd", p = "abc"', output: "[0,6]" },
      { input: 's = "abab", p = "ab"', output: "[0,1,2]" },
    ];
  }

  if (topic.includes("Array") || topic.includes("Hash")) {
    return [
      { input: "nums = [1,2,2,3]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
    ];
  }

  if (topic.includes("Two Pointers")) {
    return [
      { input: "nums = [1,2,3,4,6], target = 6", output: "[2,4]" },
      { input: "nums = [1,2,3], target = 7", output: "[]" },
    ];
  }

  if (topic.includes("Sliding Window")) {
    return [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" },
    ];
  }

  if (topic.includes("Stack")) {
    return [
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "([)]"', output: "false" },
    ];
  }

  if (topic.includes("Binary Search")) {
    return [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ];
  }

  if (topic.includes("Tree")) {
    return [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ];
  }

  if (topic.includes("Graph")) {
    return [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
    ];
  }

  if (topic.includes("Linked List")) {
    return [
      { input: "head = [1,2,3,4]", output: "[4,3,2,1]" },
      { input: "head = []", output: "[]" },
    ];
  }

  if (topic.includes("DP") || topic.includes("Greedy")) {
    return [
      { input: "nums = [1,2,3,1]", output: "4" },
      { input: "nums = [2,7,9,3,1]", output: "12" },
    ];
  }

  if (topic.includes("Interval")) {
    return [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ];
  }

  if (topic.includes("Heap") || topic.includes("Priority")) {
    return [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ];
  }

  if (topic.includes("Backtracking")) {
    return [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" },
    ];
  }

  return [
    {
      input: "Input crafted from the problem constraints",
      output: "Expected output after applying the algorithm",
      explanation: `Use ${topic} fundamentals to derive the correct result for ${title}.`,
    },
    {
      input: "Minimal edge-case input",
      output: "Correct edge-case output",
    },
  ];
}

function buildFallbackDescription(title: string, topic: string, difficulty: Difficulty): string {
  const key = normalizeTitle(title);
  let focusLine = "Identify the right pattern and implement a correct, efficient solution.";

  if (key.includes("anagram")) focusLine = "Track character frequencies and compare counts accurately.";
  else if (key.includes("duplicate")) focusLine = "Use hashing/set logic to detect repeated values efficiently.";
  else if (key.includes("two sum")) focusLine = "Use a map to find complements in linear time.";
  else if (key.includes("binary search") || topic.includes("Binary Search")) focusLine = "Maintain correct low/high boundaries and midpoint updates.";
  else if (key.includes("tree") || topic.includes("Tree")) focusLine = "Traverse tree nodes consistently and handle null/base cases correctly.";
  else if (key.includes("graph") || topic.includes("Graph")) focusLine = "Model graph traversal/state carefully and prevent revisiting nodes.";
  else if (key.includes("interval")) focusLine = "Sort and merge/scan intervals while preserving boundary correctness.";

  return [
    `Solve ${title} using a ${topic} strategy.`,
    "",
    "Requirements:",
    "- Return exactly the output format described by the problem.",
    "- Handle edge cases (empty input, duplicates, and boundaries).",
    `- ${focusLine}`,
    "",
    `Target difficulty: ${difficulty}. Explain the chosen approach and complexity in your code comments if helpful.`,
  ].join("\n");
}

function buildFallbackConstraints(topic: string, difficulty: Difficulty): string[] {
  if (topic.includes("Tree") || topic.includes("Graph")) {
    return [
      "1 <= n <= 10^5",
      "Aim for O(n) or O((V+E) log V) depending on traversal/path requirements",
      "Use iterative/recursive traversal safely for edge cases",
    ];
  }

  if (difficulty === "Easy") {
    return [
      "1 <= n <= 10^4",
      "Target O(n) or O(n log n) time",
      "Use O(1) to O(n) extra space",
    ];
  }

  if (difficulty === "Hard") {
    return [
      "1 <= n <= 2 * 10^5",
      "Optimize for near-linear or n log n time where possible",
      "Avoid brute-force quadratic solutions on large input",
    ];
  }

  return [
    "1 <= n <= 10^5",
    "Prefer O(n) or O(n log n) time",
    "Use O(1) to O(n) auxiliary space depending on approach",
  ];
}

function isWeakExamples(examples: { input: string; output: string; explanation?: string }[]): boolean {
  if (!Array.isArray(examples) || examples.length === 0) return true;
  const blob = examples
    .map((ex) => `${ex?.input || ""} ${ex?.output || ""} ${ex?.explanation || ""}`.toLowerCase())
    .join(" ");
  return (
    blob.includes("representative input") ||
    blob.includes("input crafted from") ||
    blob.includes("expected output") ||
    blob.includes("edge-case") ||
    blob.includes("unable to verify")
  );
}

function isWeakConstraints(constraints: string[]): boolean {
  if (!Array.isArray(constraints) || constraints.length === 0) return true;
  const blob = constraints.join(" ").toLowerCase();
  return (
    blob.includes("small input size expected") ||
    blob.includes("moderate input size expected") ||
    blob.includes("large input size expected")
  );
}

function isWeakDescription(description: string): boolean {
  const text = (description || "").trim();
  if (!text) return true;
  return text.startsWith("Goal: solve \"") || text.includes("Target approach: a clean");
}

function buildJavaStarterTemplate(title: string): string {
  return [
    "import java.util.*;",
    "",
    "class Solution {",
    "    public static Object solution(Object args) {",
    `        // TODO: implement your solution for ${title}`,
    "        return null;",
    "    }",
    "}",
    "",
  ].join("\n");
}

function looksLikePythonStarter(code: string): boolean {
  const text = code.trim();
  return text.includes("def solution(") || text.includes("return None") || text.includes("pass");
}

function normalizeSpringProblem(raw: any): Problem {
  const tagsArray = Array.isArray(raw?.tags)
    ? raw.tags
    : typeof raw?.tags === "string"
    ? raw.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter((t: string) => t.length > 0 && t !== "&")
    : [];

  const constraintsArray = Array.isArray(raw?.constraints)
    ? raw.constraints
    : typeof raw?.constraints === "string"
    ? raw.constraints
        .split(/\r?\n/)
        .map((c: string) => c.trim())
        .filter((c: string) => c.length > 0)
    : [];

  const normalizedTitle = raw?.title || "Untitled Problem";
  const normalizedDifficulty = (raw?.difficulty || "Medium") as Difficulty;
  const normalizedTopic = raw?.topic || "Arrays & Hashing";
  const supplemental = findSupplementalByTitle(normalizedTitle);

  const rawExamples = Array.isArray(raw?.examples) && raw.examples.length > 0 ? raw.examples : [];
  const examplesArray = rawExamples.length > 0 && !isWeakExamples(rawExamples)
    ? rawExamples
    : supplemental?.examples && supplemental.examples.length > 0
    ? supplemental.examples
    : buildFallbackExamples(normalizedTitle, normalizedTopic);

  const descriptionText = isWeakDescription(raw?.description || "")
    ? (supplemental?.description || buildFallbackDescription(normalizedTitle, normalizedTopic, normalizedDifficulty))
    : raw.description;

  const constraintsText = constraintsArray.length > 0 && !isWeakConstraints(constraintsArray)
    ? constraintsArray
    : supplemental?.constraints && supplemental.constraints.length > 0
    ? supplemental.constraints
    : buildFallbackConstraints(normalizedTopic, normalizedDifficulty);

  const starterText =
    typeof raw?.starter_code === "string"
      ? raw.starter_code
      : typeof raw?.starterCode === "string"
      ? raw.starterCode
      : "";

  const supplementalJavaStarter = supplemental?.starterCode?.java || "";
  const supplementalPythonStarter = supplemental?.starterCode?.python || "";
  const supplementalJsStarter = supplemental?.starterCode?.javascript || "";

  const title = raw?.title || "Problem";
  const javaStarter = starterText && !looksLikePythonStarter(starterText)
    ? starterText
    : supplementalJavaStarter
    ? supplementalJavaStarter
    : buildJavaStarterTemplate(title);
  const pythonStarter = starterText && looksLikePythonStarter(starterText)
    ? starterText
    : supplementalPythonStarter
    ? supplementalPythonStarter
    : "# Write your solution here\n";

  const starterCode =
    raw?.starter_code && typeof raw.starter_code === "object"
      ? raw.starter_code
      : {
          python: pythonStarter,
          java: javaStarter,
          javascript: supplementalJsStarter || starterText || "// Write your solution here\n",
        };

  return {
    id: Number(raw?.id),
    title: normalizedTitle,
    difficulty: normalizedDifficulty,
    topic: normalizedTopic,
    tags: tagsArray.length ? tagsArray : [normalizedTopic || "General"],
    description: descriptionText,
    examples: examplesArray,
    constraints: constraintsText,
    acceptance_rate:
      typeof raw?.acceptance_rate === "number"
        ? raw.acceptance_rate
        : typeof raw?.acceptanceRate === "number"
        ? raw.acceptanceRate
        : 0,
    starter_code: starterCode,
    neetcode_link: raw?.neetcode_link ?? null,
    leetcode_number: raw?.leetcode_number ?? raw?.leetcodeNumber ?? null,
    problem_set: raw?.problem_set || "NeetCode",
    solved: !!raw?.solved,
  };
}

function normalizeLocalProblem(raw: any): Problem {
  const title = String(raw?.title || "Untitled Problem");
  const topic = (Array.isArray(raw?.tags) && raw.tags.length > 0
    ? String(raw.tags[0])
    : String(raw?.topic || "Arrays & Hashing"));

  return {
    id: Number(raw?.id),
    title,
    difficulty: (raw?.difficulty || "Medium") as Difficulty,
    topic,
    tags: Array.isArray(raw?.tags) ? raw.tags : [topic],
    description: String(raw?.description || ""),
    examples: Array.isArray(raw?.examples) ? raw.examples : buildFallbackExamples(title, topic),
    constraints: Array.isArray(raw?.constraints) ? raw.constraints : buildFallbackConstraints(topic, (raw?.difficulty || "Medium") as Difficulty),
    acceptance_rate: typeof raw?.acceptanceRate === "number" ? raw.acceptanceRate : 0,
    starter_code: raw?.starterCode || {
      java: buildJavaStarterTemplate(title),
      python: "# Write your solution here\n",
      javascript: "// Write your solution here\n",
    },
    neetcode_link: raw?.neetcodeLink || null,
    leetcode_number: typeof raw?.leetcode_number === "number" ? raw.leetcode_number : null,
    problem_set: "NeetCode",
    solved: !!raw?.solved,
  };
}

function getLocalProblemsFiltered(
  filters: { topic?: string | null; difficulty?: Difficulty | null; search?: string; problemSet?: string } | undefined
): Problem[] {
  const all = (mockProblems || []).map(normalizeLocalProblem);
  return all.filter((p) => {
    if (filters?.topic && p.topic !== filters.topic) return false;
    if (filters?.difficulty && p.difficulty !== filters.difficulty) return false;
    if (filters?.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
}

// ── Supabase-based fetchers (existing) ──

async function fetchProblemsFromSupabase(
  filters: { topic?: string | null; difficulty?: Difficulty | null; search?: string; problemSet?: string } | undefined,
  userId?: string
) {
  let query = supabase
    .from("problems")
    .select("*")
    .order("id", { ascending: true });

  if (filters?.topic) query = query.eq("topic", filters.topic);
  if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);
  if (filters?.search) query = query.ilike("title", `%${filters.search}%`);
  if (filters?.problemSet) query = query.eq("problem_set", filters.problemSet);

  const { data: problems, error } = await query.limit(1000);
  if (error) throw error;

  let progressMap: Record<number, boolean> = {};
  if (userId) {
    const { data: progress } = await supabase
      .from("user_problem_progress")
      .select("problem_id, solved")
      .eq("user_id", userId)
      .eq("solved", true);

    if (progress) {
      progressMap = Object.fromEntries(progress.map((p: any) => [p.problem_id, true]));
    }
  }

  return (problems || []).map((p: any) => ({
    ...p,
    solved: progressMap[p.id] || false,
  })) as unknown as Problem[];
}

// ── Spring Boot-based fetchers ──

async function fetchProblemsFromSpring(
  filters: { topic?: string | null; difficulty?: Difficulty | null; search?: string; problemSet?: string } | undefined
) {
  const params: Record<string, string> = {};
  if (filters?.topic) params.topic = filters.topic;
  if (filters?.difficulty) params.difficulty = filters.difficulty;
  if (filters?.search) params.search = filters.search;
  if (filters?.problemSet) params.problemSet = filters.problemSet;

  let problems: any[] = [];
  try {
    problems = Object.keys(params).length > 0
      ? await problemsApi.getFiltered(params)
      : await problemsApi.getAll();
  } catch {
    return getLocalProblemsFiltered(filters);
  }

  // Backend is currently seeded with only a few rows; keep full learning catalog available.
  const hasNarrowFilters = Boolean(filters?.topic || filters?.difficulty || filters?.search || filters?.problemSet);
  if (!hasNarrowFilters && (!Array.isArray(problems) || problems.length < 20)) {
    return getLocalProblemsFiltered(filters);
  }

  // Spring Boot should return solved status merged, but if not:
  try {
    const progress = await progressApi.getAll();
    const solvedSet = new Set(progress.filter((p: any) => p.solved).map((p: any) => p.problemId));
    return problems.map((p: any) => normalizeSpringProblem({ ...p, solved: solvedSet.has(p.id) })) as Problem[];
  } catch {
    return problems.map((p: any) => normalizeSpringProblem(p)) as Problem[];
  }
}

// ── Hooks ──

export function useProblems(filters?: {
  topic?: string | null;
  difficulty?: Difficulty | null;
  search?: string;
  problemSet?: string;
}) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["problems", filters, user?.id, USE_SPRING_BOOT],
    queryFn: () =>
      USE_SPRING_BOOT
        ? fetchProblemsFromSpring(filters)
        : fetchProblemsFromSupabase(filters, user?.id),
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useProblemById(id: number | string) {
  const { user } = useAuth();
  const numId = typeof id === "string" ? parseInt(id) : id;

  return useQuery({
    queryKey: ["problem", numId, user?.id, USE_SPRING_BOOT],
    queryFn: async () => {
      if (USE_SPRING_BOOT) {
        let problem: any;
        try {
          problem = await problemsApi.getById(numId);
        } catch {
          const local = getLocalProblemsFiltered(undefined).find((p) => p.id === numId);
          return local || null;
        }

        if (!problem) {
          const local = getLocalProblemsFiltered(undefined).find((p) => p.id === numId);
          return local || null;
        }
        try {
          const progress = await progressApi.getByProblemId(numId);
          return normalizeSpringProblem({ ...problem, solved: progress?.solved || false });
        } catch {
          return normalizeSpringProblem(problem);
        }
      }

      // Supabase path
      let { data, error } = await supabase
        .from("problems")
        .select("*")
        .eq("id", numId)
        .maybeSingle();

      if (!data && !error) {
        const result = await supabase
          .from("problems")
          .select("*")
          .eq("leetcode_number", numId)
          .maybeSingle();
        data = result.data;
        error = result.error;
      }

      if (error) throw error;
      if (!data) return null;

      let solved = false;
      if (user) {
        const { data: progress } = await supabase
          .from("user_problem_progress")
          .select("solved")
          .eq("user_id", user.id)
          .eq("problem_id", data.id)
          .eq("solved", true)
          .maybeSingle();
        solved = !!progress;
      }

      return { ...data, solved } as unknown as Problem;
    },
    enabled: !!numId,
  });
}

// Canonical topic order
const TOPIC_ORDER: string[] = [
  'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 'Binary Search', 'Linked List',
  'Trees', 'Tries', 'Heap / Priority Queue', 'Backtracking', 'Graphs', '1-D DP',
  'Intervals', 'Greedy', 'Advanced Graphs', 'Math & Geometry', '2-D DP', 'Bit Manipulation',
];

export function useTopics() {
  return useQuery({
    queryKey: ["topics", USE_SPRING_BOOT],
    queryFn: async () => {
      if (USE_SPRING_BOOT) {
        try {
          return await topicsApi.getAll();
        } catch {
          // Fallback: local mock dataset
          const problems = getLocalProblemsFiltered(undefined);
          const topicCounts: Record<string, number> = {};
          problems.forEach((p: any) => {
            topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1;
          });
          return TOPIC_ORDER
            .filter(t => topicCounts[t])
            .map(topic => ({ topic, count: topicCounts[topic] }));
        }
      }

      // Supabase path
      const { data, error } = await supabase
        .from("problems")
        .select("topic")
        .limit(1000);

      if (error) throw error;

      const topicCounts: Record<string, number> = {};
      (data || []).forEach((p: any) => {
        topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1;
      });

      return TOPIC_ORDER
        .filter(t => topicCounts[t])
        .map(topic => ({ topic, count: topicCounts[topic] }));
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
