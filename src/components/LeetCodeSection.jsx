import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Flame,
  Trophy,
  ExternalLink,
  Github,
  Cpu,
  Clock,
  Check,
  Copy,
  ChevronRight,
  Terminal,
  RefreshCw
} from 'lucide-react'

const difficultyColors = {
  Easy: {
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  Medium: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    dot: 'bg-amber-400',
  },
  Hard: {
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    dot: 'bg-rose-500',
  },
}

// Metadata & optimal Python implementations for problems in D-ENCODER/leet-code
const KNOWN_PROBLEMS = {
  1: {
    title: 'Two Sum',
    difficulty: 'Easy',
    pattern: 'Hash Map Lookup',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    notes: 'Single-pass hash table storing seen values and their indices to find target complements in O(1) lookup time.',
    codeSnippet: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i`,
  },
  2: {
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    pattern: 'Linked List Math',
    timeComplexity: 'O(max(m, n))',
    spaceComplexity: 'O(max(m, n))',
    notes: 'Simulated digit-by-digit addition across two reversed linked lists while propagating carry values.',
    codeSnippet: `class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = cur = ListNode(0)
        carry = 0
        while l1 or l2 or carry:
            v1 = l1.val if l1 else 0
            v2 = l2.val if l2 else 0
            carry, val = divmod(v1 + v2 + carry, 10)
            cur.next = ListNode(val)
            cur = cur.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return dummy.next`,
  },
  3: {
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m, n))',
    notes: 'Maintained a dynamic sliding window with a character-index map to jump the left pointer past duplicate characters.',
    codeSnippet: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_index = {}
        left = max_len = 0
        for right, ch in enumerate(s):
            if ch in char_index and char_index[ch] >= left:
                left = char_index[ch] + 1
            char_index[ch] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
  },
  4: {
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    pattern: 'Binary Search Partition',
    timeComplexity: 'O(log(min(m, n)))',
    spaceComplexity: 'O(1)',
    notes: 'Binary searched the optimal partition on the smaller array such that all left-half elements are less than or equal to right-half elements.',
    codeSnippet: `class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        A, B = nums1, nums2
        total = len(A) + len(B)
        half = total // 2
        if len(B) < len(A):
            A, B = B, A
        l, r = 0, len(A) - 1
        while True:
            i = (l + r) // 2
            j = half - i - 2
            Aleft = A[i] if i >= 0 else float('-inf')
            Aright = A[i + 1] if (i + 1) < len(A) else float('inf')
            Bleft = B[j] if j >= 0 else float('-inf')
            Bright = B[j + 1] if (j + 1) < len(B) else float('inf')
            if Aleft <= Bright and Bleft <= Aright:
                if total % 2:
                    return min(Aright, Bright)
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
            elif Aleft > Bright:
                r = i - 1
            else:
                l = i + 1`,
  },
  5: {
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    pattern: 'Expand Around Center',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    notes: 'Expanded outward from each character (odd & even centers) to find the longest palindrome in O(1) extra space.',
    codeSnippet: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        res = ""
        for i in range(len(s)):
            for l, r in ((i, i), (i, i + 1)):
                while l >= 0 and r < len(s) and s[l] == s[r]:
                    if (r - l + 1) > len(res):
                        res = s[l:r + 1]
                    l -= 1
                    r += 1
        return res`,
  },
  6: {
    title: 'Zigzag Conversion',
    difficulty: 'Medium',
    pattern: 'Row Direction Simulation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    notes: 'Simulated row-by-row character placement using a direction toggle at top and bottom row boundaries.',
    codeSnippet: `class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1 or numRows >= len(s):
            return s
        rows = [""] * numRows
        cur_row, step = 0, 1
        for ch in s:
            rows[cur_row] += ch
            if cur_row == 0:
                step = 1
            elif cur_row == numRows - 1:
                step = -1
            cur_row += step
        return "".join(rows)`,
  },
  7: {
    title: 'Reverse Integer',
    difficulty: 'Medium',
    pattern: 'Math & 32-Bit Overflow Check',
    timeComplexity: 'O(log₁₀(x))',
    spaceComplexity: 'O(1)',
    notes: 'Extracted digits via modulo arithmetic and checked 32-bit signed integer bounds [-2³¹, 2³¹ - 1].',
    codeSnippet: `class Solution:
    def reverse(self, x: int) -> int:
        sign = -1 if x < 0 else 1
        rev = int(str(abs(x))[::-1]) * sign
        return rev if -(2**31) <= rev <= 2**31 - 1 else 0`,
  },
  8: {
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    pattern: 'Deterministic State Parsing',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Trimmed leading whitespace, parsed optional sign, accumulated digits, and clamped output to 32-bit signed integer limits.',
    codeSnippet: `class Solution:
    def myAtoi(self, s: str) -> int:
        s = s.lstrip()
        if not s:
            return 0
        sign, i, res = 1, 0, 0
        if s[0] in "+-":
            sign = -1 if s[0] == "-" else 1
            i += 1
        while i < len(s) and s[i].isdigit():
            res = res * 10 + int(s[i])
            i += 1
        return max(-(2**31), min(sign * res, 2**31 - 1))`,
  },
  9: {
    title: 'Palindrome Number',
    difficulty: 'Easy',
    pattern: 'Half-Integer Reversal',
    timeComplexity: 'O(log₁₀(n))',
    spaceComplexity: 'O(1)',
    notes: 'Reversed only the second half of the integer digits to avoid string allocation and integer overflow.',
    codeSnippet: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x % 10 == 0 and x != 0):
            return False
        rev = 0
        while x > rev:
            rev = rev * 10 + x % 10
            x //= 10
        return x == rev or x == rev // 10`,
  },
  10: {
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    pattern: '2D Dynamic Programming',
    timeComplexity: 'O(m · n)',
    spaceComplexity: 'O(m · n)',
    notes: "Top-down memoized DP handling '.' single-character wildcards and '*' zero-or-more Kleene star transitions.",
    codeSnippet: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        memo = {}
        def dp(i: int, j: int) -> bool:
            if (i, j) in memo:
                return memo[(i, j)]
            if j == len(p):
                return i == len(s)
            first_match = i < len(s) and p[j] in {s[i], '.'}
            if j + 1 < len(p) and p[j + 1] == '*':
                ans = dp(i, j + 2) or (first_match and dp(i + 1, j))
            else:
                ans = first_match and dp(i + 1, j + 1)
            memo[(i, j)] = ans
            return ans
        return dp(0, 0)`,
  },
  11: {
    title: 'Container With Most Water',
    difficulty: 'Medium',
    pattern: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Started pointers at both ends and greedily inward-shifted the shorter vertical line to maximize container area.',
    codeSnippet: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        l, r = 0, len(height) - 1
        max_water = 0
        while l < r:
            width = r - l
            max_water = max(max_water, width * min(height[l], height[r]))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return max_water`,
  },
  12: {
    title: 'Integer to Roman',
    difficulty: 'Medium',
    pattern: 'Greedy Value Symbols',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    notes: 'Greedily subtracted descending Roman numeral values (including subtractive pairs like 900 CM, 400 CD) to build the numeral string.',
    codeSnippet: `class Solution:
    def intToRoman(self, num: int) -> str:
        pairs = [
            (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
            (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
            (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")
        ]
        res = []
        for val, sym in pairs:
            if num == 0:
                break
            count, num = divmod(num, val)
            res.append(sym * count)
        return "".join(res)`,
  },
  13: {
    title: 'Roman to Integer',
    difficulty: 'Easy',
    pattern: 'Left-to-Right Pass',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Subtracted symbol value when followed by a larger symbol (e.g. IV, IX), otherwise added value.',
    codeSnippet: `class Solution:
    def romanToInt(self, s: str) -> int:
        roman = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        total = 0
        for i in range(len(s)):
            if i + 1 < len(s) and roman[s[i]] < roman[s[i + 1]]:
                total -= roman[s[i]]
            else:
                total += roman[s[i]]
        return total`,
  },
  14: {
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    pattern: 'Lexicographical Min/Max Scan',
    timeComplexity: 'O(S)',
    spaceComplexity: 'O(1)',
    notes: 'Compared characters across the lexicographically smallest and largest strings in the array.',
    codeSnippet: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""
        s1, s2 = min(strs), max(strs)
        for i, ch in enumerate(s1):
            if ch != s2[i]:
                return s1[:i]
        return s1`,
  },
  15: {
    title: '3Sum',
    difficulty: 'Medium',
    pattern: 'Sorting + Two Pointers',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    notes: 'Sorted input array and combined a fixed first element with a deduplicated two-pointer sweep for zero-sum triplets.',
    codeSnippet: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        res = []
        for i, a in enumerate(nums):
            if i > 0 and a == nums[i - 1]:
                continue
            l, r = i + 1, len(nums) - 1
            while l < r:
                three_sum = a + nums[l] + nums[r]
                if three_sum > 0:
                    r -= 1
                elif three_sum < 0:
                    l += 1
                else:
                    res.append([a, nums[l], nums[r]])
                    l += 1
                    while l < r and nums[l] == nums[l - 1]:
                        l += 1
        return res`,
  },
  16: {
    title: '3Sum Closest',
    difficulty: 'Medium',
    pattern: 'Sorting + Two Pointers',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    notes: 'Sorted array and converged two pointers while tracking the triplet sum with minimum absolute difference from target.',
    codeSnippet: `class Solution:
    def threeSumClosest(self, nums: list[int], target: int) -> int:
        nums.sort()
        closest = nums[0] + nums[1] + nums[2]
        for i in range(len(nums) - 2):
            l, r = i + 1, len(nums) - 1
            while l < r:
                cur = nums[i] + nums[l] + nums[r]
                if abs(cur - target) < abs(closest - target):
                    closest = cur
                if cur < target:
                    l += 1
                elif cur > target:
                    r -= 1
                else:
                    return target
        return closest`,
  },
  17: {
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    pattern: 'Backtracking / DFS',
    timeComplexity: 'O(4ⁿ · n)',
    spaceComplexity: 'O(n)',
    notes: 'Explored all keypad character combinations recursively via DFS backtracking.',
    codeSnippet: `class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        if not digits:
            return []
        phone = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        }
        res = []
        def backtrack(idx: int, path: str) -> None:
            if idx == len(digits):
                res.append(path)
                return
            for ch in phone[digits[idx]]:
                backtrack(idx + 1, path + ch)
        backtrack(0, "")
        return res`,
  },
}

function formatTitleFromSlug(slug) {
  return slug
    .replace(/^\d+[\.\-_]*/, '')
    .replace(/\.(md|py|cpp|c|java|js|ts)$/i, '')
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function detectLanguageFromPath(path) {
  if (path.endsWith('.cpp') || path.endsWith('.cc') || path.endsWith('.cxx')) return 'C++'
  if (path.endsWith('.c')) return 'C'
  if (path.endsWith('.java')) return 'Java'
  if (path.endsWith('.js') || path.endsWith('.ts')) return 'TypeScript'
  return 'Python'
}

export default function LeetCodeSection({ leetcode }) {
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [problems, setProblems] = useState(leetcode.recentUploads || [])
  const [selectedProblem, setSelectedProblem] = useState(
    leetcode.recentUploads?.[0] || null
  )
  const [liveContentCache, setLiveContentCache] = useState({})
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState('Live GitHub Sync')
  const [copiedId, setCopiedId] = useState(null)

  const fallbackById = React.useMemo(() => {
    const map = {}
    for (const item of leetcode.recentUploads || []) {
      map[item.id] = item
    }
    return map
  }, [leetcode.recentUploads])

  // Fetch repository file tree dynamically from GitHub API (D-ENCODER/leetcode-challenges)
  const syncFromGitHub = useCallback(async () => {
    setIsSyncing(true)
    try {
      let branch = 'main'
      let res = await fetch(
        'https://api.github.com/repos/D-ENCODER/leetcode-challenges/git/trees/main?recursive=1'
      )
      if (!res.ok) {
        branch = 'master'
        res = await fetch(
          'https://api.github.com/repos/D-ENCODER/leetcode-challenges/git/trees/master?recursive=1'
        )
      }
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      const data = await res.json()
      if (!Array.isArray(data.tree)) throw new Error('Invalid tree')

      const problemFiles = data.tree.filter((node) => {
        if (node.type !== 'blob') return false
        if (node.path.startsWith('.')) return false
        const base = node.path.split('/').pop()
        if (['README.md', 'TEMPLATE.md', 'SUMMARY.md', 'LICENSE'].includes(base))
          return false
        return /\.(md|py|cpp|c|java|js|ts)$/i.test(base)
      })

      if (problemFiles.length > 0) {
        const parsed = problemFiles.map((file, index) => {
          const parts = file.path.split('/')
          const filename = parts[parts.length - 1]
          const folder = parts.length > 1 ? parts[0].toLowerCase() : ''
          const folderDifficulty =
            folder === 'easy'
              ? 'Easy'
              : folder === 'medium'
              ? 'Medium'
              : folder === 'hard'
              ? 'Hard'
              : null

          const idMatch = filename.match(/^0*(\d+)/)
          const id = idMatch ? parseInt(idMatch[1], 10) : index + 1
          const known = KNOWN_PROBLEMS[id] || {}
          const fallback = fallbackById[id] || {}
          const rawTitle = formatTitleFromSlug(filename)

          return {
            id,
            title: known.title || fallback.title || rawTitle || `Problem #${id}`,
            difficulty:
              folderDifficulty ||
              known.difficulty ||
              fallback.difficulty ||
              'Medium',
            pattern: known.pattern || fallback.pattern || 'Algorithmic Solution',
            language: fallback.language || detectLanguageFromPath(file.path),
            timeComplexity:
              known.timeComplexity || fallback.timeComplexity || 'Optimal',
            spaceComplexity:
              known.spaceComplexity || fallback.spaceComplexity || 'O(1)',
            runtime: known.runtime || fallback.runtime || 'Synced from Repo',
            date: file.path,
            path: file.path,
            rawUrl: `https://raw.githubusercontent.com/D-ENCODER/leetcode-challenges/${branch}/${encodeURI(file.path)}`,
            solutionUrl: `https://github.com/D-ENCODER/leetcode-challenges/blob/${branch}/${encodeURI(file.path)}`,
            notes:
              known.notes ||
              fallback.notes ||
              `Live solution file (${file.path}) fetched directly from D-ENCODER/leetcode-challenges on GitHub.`,
            codeSnippet: known.codeSnippet || fallback.codeSnippet || null,
          }
        })

        parsed.sort((a, b) => a.id - b.id)
        setProblems(parsed)
        setSelectedProblem((prev) => {
          if (!prev) return parsed[0]
          return parsed.find((p) => p.id === prev.id) || parsed[0]
        })
        setSyncStatus(`Synced (${parsed.length} files in repo)`)
      }
    } catch {
      setSyncStatus('Using Cached Vault')
    } finally {
      setIsSyncing(false)
    }
  }, [fallbackById])

  useEffect(() => {
    syncFromGitHub()
  }, [syncFromGitHub])

  // Dynamically fetch the selected file's raw markdown/code from GitHub if not already cached
  useEffect(() => {
    if (!selectedProblem?.rawUrl) return
    if (liveContentCache[selectedProblem.id]) return

    let isMounted = true
    fetch(selectedProblem.rawUrl)
      .then((res) => (res.ok ? res.text() : null))
      .then((text) => {
        if (!isMounted || !text) return
        const codeBlockMatch = text.match(
          /```(?:python|cpp|c\+\+|java|js|ts)\n([\s\S]*?)```/i
        )
        const cleanMarkdown = text
          .replace(/^---[\s\S]*?---\n*/m, '')
          .replace(/<[^>]+>/g, '')
          .trim()

        setLiveContentCache((prev) => ({
          ...prev,
          [selectedProblem.id]: {
            extractedCode: codeBlockMatch ? codeBlockMatch[1].trim() : null,
            rawMarkdown: cleanMarkdown,
          },
        }))
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [selectedProblem, liveContentCache])

  const filteredProblems =
    difficultyFilter === 'All'
      ? problems
      : problems.filter((p) => p.difficulty === difficultyFilter)

  // Dynamically calculate Easy / Medium / Hard counts directly from the live repo problems list
  const easyCount = problems.filter((p) => p.difficulty === 'Easy').length
  const mediumCount = problems.filter((p) => p.difficulty === 'Medium').length
  const hardCount = problems.filter((p) => p.difficulty === 'Hard').length
  const totalSolvedCount = problems.length || leetcode.totalSolved

  // SVG Ring Calculations
  const radius = 62
  const circumference = 2 * Math.PI * radius
  const safeTotal = Math.max(totalSolvedCount, 1)
  const easyRatio = easyCount / safeTotal
  const mediumRatio = mediumCount / safeTotal
  const hardRatio = hardCount / safeTotal

  const easyLen = easyRatio * circumference
  const mediumLen = mediumRatio * circumference
  const hardLen = hardRatio * circumference

  const getDisplaySnippet = (prob) => {
    if (!prob) return ''
    const cached = liveContentCache[prob.id]
    if (cached?.extractedCode) {
      return cached.extractedCode
    }
    if (prob.codeSnippet) {
      return prob.codeSnippet
    }
    if (cached?.rawMarkdown) {
      return cached.rawMarkdown
    }
    return '# Loading live file from D-ENCODER/leetcode-challenges...'
  }

  const handleCopyCode = (problem) => {
    const textToCopy = getDisplaySnippet(problem)
    navigator.clipboard.writeText(textToCopy)
    setCopiedId(problem.id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  return (
    <section id="leetcode" className="py-12 sm:py-16 relative space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>04 / ALGORITHMS & DATA STRUCTURES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            LeetCode Progress & Live Repo Vault
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-1.5 max-w-2xl">
            Dynamically synced with{' '}
            <a
              href={leetcode.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-amber-300 hover:underline font-mono text-xs sm:text-sm"
            >
              D-ENCODER/leetcode-challenges
            </a>
            — any new file or change pushed to your GitHub repo automatically updates the counts and code explorer below.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={syncFromGitHub}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-card hover:border-emerald-400/40 text-xs font-mono text-emerald-300 transition-all"
            title="Re-sync live from GitHub repository"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : syncStatus}</span>
          </button>
          <a
            href={leetcode.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-mono text-amber-300 transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>@{leetcode.username}/leetcode-challenges</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Top Analytics Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ring & Difficulty Breakdown Card — Responsive & Overflow-Free */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 glass-card rounded-3xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden min-w-0"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <div className="min-w-0">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Live Repo Distribution
              </p>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Difficulty Breakdown
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-mono shrink-0">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{totalSolvedCount} Uploaded</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6 my-2 min-w-0">
            {/* Multi-Segment Animated SVG Ring */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 150 150">
                <circle
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="12"
                />
                {/* Easy Segment */}
                <motion.circle
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="transparent"
                  stroke="#34d399"
                  strokeWidth="12"
                  strokeDasharray={`${easyLen} ${circumference}`}
                  strokeDashoffset={0}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${easyLen} ${circumference}` }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
                {/* Medium Segment */}
                <motion.circle
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="transparent"
                  stroke="#fbbf24"
                  strokeWidth="12"
                  strokeDasharray={`${mediumLen} ${circumference}`}
                  strokeDashoffset={-easyLen}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${mediumLen} ${circumference}` }}
                  transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
                />
                {/* Hard Segment */}
                <motion.circle
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="transparent"
                  stroke="#f43f5e"
                  strokeWidth="12"
                  strokeDasharray={`${hardLen} ${circumference}`}
                  strokeDashoffset={-(easyLen + mediumLen)}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${hardLen} ${circumference}` }}
                  transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {totalSolvedCount}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  In Vault
                </span>
              </div>
            </div>

            {/* Difficulty Bars — min-w-0 prevents flex overflow */}
            <div className="w-full min-w-0 flex-1 space-y-3.5">
              {[
                {
                  label: 'Easy',
                  solved: easyCount,
                  share: Math.round((easyCount / safeTotal) * 100),
                  beats: leetcode.difficulty.easy.beats,
                  color: 'bg-emerald-400',
                  text: 'text-emerald-400',
                },
                {
                  label: 'Medium',
                  solved: mediumCount,
                  share: Math.round((mediumCount / safeTotal) * 100),
                  beats: leetcode.difficulty.medium.beats,
                  color: 'bg-amber-400',
                  text: 'text-amber-400',
                },
                {
                  label: 'Hard',
                  solved: hardCount,
                  share: Math.round((hardCount / safeTotal) * 100),
                  beats: leetcode.difficulty.hard.beats,
                  color: 'bg-rose-500',
                  text: 'text-rose-400',
                },
              ].map((tier) => (
                <div key={tier.label} className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono">
                    <span className={`font-semibold ${tier.text}`}>
                      {tier.label}
                    </span>
                    <span className="text-zinc-300">
                      {tier.solved}{' '}
                      <span className="text-zinc-500">({tier.share}%)</span>
                    </span>
                    <span className="text-zinc-400 text-[11px]">
                      Beats {tier.beats}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(tier.share, 8)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${tier.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contest & Ranking Footer */}
          <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 min-w-0">
              <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-mono text-zinc-400 truncate">
                  Repo Files
                </p>
                <p className="text-sm sm:text-base font-bold text-white font-mono truncate">
                  {totalSolvedCount} Solutions
                </p>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 min-w-0">
              <Cpu className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-mono text-zinc-400 truncate">
                  Primary Stack
                </p>
                <p className="text-sm sm:text-base font-bold text-white font-mono truncate">
                  {leetcode.globalRanking}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Algorithmic Topic Mastery Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="lg:col-span-7 glass-card rounded-3xl p-5 sm:p-7 flex flex-col justify-between min-w-0 overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Pattern Recognition
              </p>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Topic & Data Structure Mastery
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              {syncStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {leetcode.topicMastery.map((item, idx) => (
              <div
                key={item.topic}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all min-w-0"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs sm:text-sm font-semibold text-zinc-200 truncate">
                    {item.topic}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 shrink-0">
                    {item.level}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${Math.min(100, Math.round((item.solved / 8) * 100))}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.05 }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interactive Uploaded Solutions Explorer */}
      <div className="glass-card rounded-3xl p-4 sm:p-7 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Uploaded LeetCode Solutions ({problems.length})</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Click any problem from your GitHub repository to inspect its solution and notes.
            </p>
          </div>

          {/* Difficulty Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-900/90 border border-white/5 self-start">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => {
              const active = difficultyFilter === diff
              return (
                <button
                  key={diff}
                  onClick={() => {
                    setDifficultyFilter(diff)
                    const nextList =
                      diff === 'All'
                        ? problems
                        : problems.filter((p) => p.difficulty === diff)
                    if (nextList.length > 0) setSelectedProblem(nextList[0])
                  }}
                  className={`relative px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="leetcodeDiffPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-white/10 border border-white/15"
                    />
                  )}
                  <span className="relative z-10">{diff}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Split Problem List & Live Code Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Problem Selector List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {filteredProblems.map((prob) => {
              const isSelected = selectedProblem?.id === prob.id
              const style =
                difficultyColors[prob.difficulty] || difficultyColors.Medium
              return (
                <button
                  key={`${prob.id}-${prob.title}`}
                  onClick={() => setSelectedProblem(prob)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 min-w-0 ${
                    isSelected
                      ? 'bg-indigo-500/15 border-indigo-400/40 shadow-[0_0_25px_rgba(99,102,241,0.12)]'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-zinc-400">
                        #{prob.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono border ${style.badge}`}
                      >
                        {prob.difficulty}
                      </span>
                      <span className="text-[11px] font-mono text-indigo-300 truncate">
                        {prob.pattern}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white mt-1.5 truncate">
                      {prob.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-mono text-zinc-400">
                      <span>{prob.language}</span>
                      <span>•</span>
                      <span>Time: {prob.timeComplexity}</span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? 'text-indigo-400 translate-x-0.5'
                        : 'text-zinc-600'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* Code & Complexity Inspector */}
          <div className="lg:col-span-7 min-w-0">
            <AnimatePresence mode="wait">
              {selectedProblem && (
                <motion.div
                  key={selectedProblem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl bg-[#09090f] border border-white/10 overflow-hidden h-full flex flex-col justify-between min-w-0"
                >
                  <div className="min-w-0">
                    {/* Top Bar */}
                    <div className="px-4 sm:px-5 py-3.5 bg-white/[0.03] border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex gap-1.5 shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                        </div>
                        <span className="font-mono text-xs text-zinc-200 font-semibold ml-1 truncate">
                          #{selectedProblem.id} {selectedProblem.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {selectedProblem.runtime}
                        </span>
                        <button
                          onClick={() => handleCopyCode(selectedProblem)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                        >
                          {copiedId === selectedProblem.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Approach & Complexity Metadata */}
                    <div className="p-4 sm:p-5 border-b border-white/5 space-y-3">
                      <div className="flex flex-wrap gap-2 text-xs font-mono">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          Pattern: {selectedProblem.pattern}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 border border-white/10">
                          Time: {selectedProblem.timeComplexity}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 border border-white/10">
                          Space: {selectedProblem.spaceComplexity}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 border border-white/10">
                          Lang: {selectedProblem.language}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed break-words">
                        {selectedProblem.notes}
                      </p>
                    </div>

                    {/* Code / Markdown Block */}
                    <div className="p-4 sm:p-5 overflow-x-auto max-h-[340px] overflow-y-auto">
                      <pre className="font-mono text-xs sm:text-sm text-indigo-100 leading-relaxed whitespace-pre-wrap break-words">
                        <code>{getDisplaySnippet(selectedProblem)}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="px-4 sm:px-5 py-3 bg-white/[0.02] border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{selectedProblem.date}</span>
                    </span>
                    <a
                      href={selectedProblem.solutionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 shrink-0"
                    >
                      <span>Open File on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
