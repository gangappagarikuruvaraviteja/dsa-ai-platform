import { additionalProblems } from "./additionalProblems";
import { additionalProblems2 } from "./additionalProblems2";
import { additionalProblems3 } from "./additionalProblems3";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Topic =
  | "Arrays"
  | "Arrays & Hashing"
  | "Two Pointers"
  | "Sliding Window"
  | "Stack"
  | "Binary Search"
  | "Linked List"
  | "Trees"
  | "Tries"
  | "Heap / Priority Queue"
  | "Backtracking"
  | "Graphs"
  | "1-D DP"
  | "Intervals"
  | "Greedy"
  | "Design"
  | "Advanced Graphs"
  | "Math & Geometry"
  | "2-D DP"
  | "Bit Manipulation";

export interface TopicConcept {
  topic: Topic;
  description: string;
  keyConcepts: string[];
  prerequisites: Topic[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  tags: Topic[];
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  acceptanceRate: number;
  solved?: boolean;
  starterCode: Record<string, string>;
  neetcodeLink?: string;
}

export interface UserProgress {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  streak: number;
  submissions: number;
  topicProgress: Record<string, { solved: number; total: number }>;
}

export const allTopics: Topic[] = [
  "Arrays",
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Backtracking",
  "Graphs",
  "1-D DP",
  "Intervals",
  "Greedy",
  "Design",
  "Advanced Graphs",
  "Math & Geometry",
  "2-D DP",
  "Bit Manipulation",
];

export const topicConcepts: TopicConcept[] = [
  {
    topic: "Arrays",
    description: "Foundational array reasoning: scan, transform, and index data efficiently.",
    keyConcepts: ["Indexing", "Traversal", "In-place updates"],
    prerequisites: [],
    difficulty: "Beginner",
  },
  {
    topic: "Arrays & Hashing",
    description: "Use hash maps and sets to count, deduplicate, and group values quickly.",
    keyConcepts: ["Hash maps", "Sets", "Frequency counting"],
    prerequisites: ["Arrays"],
    difficulty: "Beginner",
  },
  {
    topic: "Two Pointers",
    description: "Move two indices together to shrink work on sorted arrays and strings.",
    keyConcepts: ["Opposing pointers", "Partitioning", "Sorted input"],
    prerequisites: ["Arrays"],
    difficulty: "Beginner",
  },
  {
    topic: "Sliding Window",
    description: "Track a moving range to solve substring and subarray problems in linear time.",
    keyConcepts: ["Fixed window", "Variable window", "Window counts"],
    prerequisites: ["Arrays & Hashing", "Two Pointers"],
    difficulty: "Intermediate",
  },
  {
    topic: "Stack",
    description: "Use last-in, first-out state for parsing, matching, and monotonic tracking.",
    keyConcepts: ["LIFO state", "Monotonic stack", "Expression parsing"],
    prerequisites: ["Arrays & Hashing"],
    difficulty: "Intermediate",
  },
  {
    topic: "Binary Search",
    description: "Search sorted spaces and answer spaces by halving the candidate range.",
    keyConcepts: ["Sorted arrays", "Lower/upper bounds", "Binary search on answer"],
    prerequisites: ["Arrays"],
    difficulty: "Intermediate",
  },
  {
    topic: "Linked List",
    description: "Manipulate next pointers carefully while preserving list structure.",
    keyConcepts: ["Pointer rewiring", "Fast and slow pointers", "Dummy nodes"],
    prerequisites: ["Arrays"],
    difficulty: "Intermediate",
  },
  {
    topic: "Trees",
    description: "Apply DFS and BFS on hierarchical structures and reason about recursion.",
    keyConcepts: ["Traversal", "Recursion", "Subtree state"],
    prerequisites: ["Linked List"],
    difficulty: "Intermediate",
  },
  {
    topic: "Tries",
    description: "Store strings by prefix to support efficient word search and autocomplete.",
    keyConcepts: ["Prefix nodes", "Word lookup", "Character branching"],
    prerequisites: ["Arrays & Hashing"],
    difficulty: "Intermediate",
  },
  {
    topic: "Heap / Priority Queue",
    description: "Keep the current best candidate available for top-k and scheduling problems.",
    keyConcepts: ["Top-k selection", "Streaming data", "Min/max heaps"],
    prerequisites: ["Arrays & Hashing"],
    difficulty: "Intermediate",
  },
  {
    topic: "Backtracking",
    description: "Explore a decision tree, prune invalid paths, and build all valid answers.",
    keyConcepts: ["Recursive search", "Pruning", "State rollback"],
    prerequisites: ["Trees"],
    difficulty: "Advanced",
  },
  {
    topic: "Graphs",
    description: "Model relationships with BFS, DFS, and topological ordering on connected data.",
    keyConcepts: ["Adjacency lists", "DFS/BFS", "Cycle detection"],
    prerequisites: ["Trees"],
    difficulty: "Advanced",
  },
  {
    topic: "1-D DP",
    description: "Build answers from smaller linear subproblems using state recurrence.",
    keyConcepts: ["State transition", "Memoization", "Tabulation"],
    prerequisites: ["Arrays"],
    difficulty: "Intermediate",
  },
  {
    topic: "Intervals",
    description: "Sort ranges, merge overlaps, and reason about coverage and gaps.",
    keyConcepts: ["Sorting ranges", "Merge logic", "Overlap detection"],
    prerequisites: ["Arrays"],
    difficulty: "Intermediate",
  },
  {
    topic: "Greedy",
    description: "Make the best local choice each step when it can be proven globally safe.",
    keyConcepts: ["Local optimum", "Sorting for choice", "Exchange arguments"],
    prerequisites: ["Arrays", "Intervals"],
    difficulty: "Intermediate",
  },
  {
    topic: "Design",
    description: "Create reusable data structures with clean operations and predictable state.",
    keyConcepts: ["API design", "Encapsulation", "State management"],
    prerequisites: ["Arrays & Hashing"],
    difficulty: "Advanced",
  },
  {
    topic: "Advanced Graphs",
    description: "Handle shortest paths, strongly connected components, and spanning structure.",
    keyConcepts: ["Shortest paths", "Topo order", "MST / SCC"],
    prerequisites: ["Graphs"],
    difficulty: "Advanced",
  },
  {
    topic: "Math & Geometry",
    description: "Use arithmetic, coordinate reasoning, and number properties to simplify problems.",
    keyConcepts: ["Arithmetic reasoning", "Coordinate math", "Bitwise helpers"],
    prerequisites: ["Arrays"],
    difficulty: "Beginner",
  },
  {
    topic: "2-D DP",
    description: "Extend dynamic programming to grids, strings, and pairwise state spaces.",
    keyConcepts: ["Grid DP", "String DP", "Two-dimensional state"],
    prerequisites: ["1-D DP", "Arrays"],
    difficulty: "Advanced",
  },
  {
    topic: "Bit Manipulation",
    description: "Work with binary representations using masks, XOR, shifts, and bit checks.",
    keyConcepts: ["Bit masks", "XOR tricks", "Shift operations"],
    prerequisites: ["Arrays & Hashing"],
    difficulty: "Intermediate",
  },
];

export const mockProblems: Problem[] = [
  ...additionalProblems,
  ...additionalProblems2,
  ...additionalProblems3,
];

export const mockUserProgress: UserProgress = {
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  streak: 0,
  submissions: 0,
  topicProgress: Object.fromEntries(
    allTopics.map((topic) => {
      const topicProblems = mockProblems.filter((p) => p.tags.includes(topic));
      return [topic, { solved: 0, total: topicProblems.length }];
    }),
  ),
};