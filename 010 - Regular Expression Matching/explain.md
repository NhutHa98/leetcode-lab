# Regular Expression Matching - LeetCode 10

## Overview
Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*` where:
- `.` matches any single character
- `*` matches zero or more of the preceding element

The matching should cover the entire input string (not partial). Return `true` if `s` matches `p`, otherwise return `false`.

## Idea

A direct greedy scan is tricky because `*` can match a variable number of characters and choices made early can break later matches. A clean way to model all possibilities is Dynamic Programming (DP):

- Think in terms of prefixes: does `p[0..j)` match `s[0..i)`?
- Let `dp[i][j]` be `true` if the first `i` characters of `s` match the first `j` characters of `p`.
- Build up `dp` from small substrings to larger ones, reusing results.

Key observations:
- A normal character match (or `.`) consumes one char from both `s` and `p`.
- A `*` can represent:
  - zero occurrences of the preceding element (skip the element and `*`), or
  - one or more occurrences (if the preceding element matches current `s` char, we can "stay" on the pattern with `*` and consume one more char from `s`).

This DP ensures we explore all valid uses of `*` efficiently.

---

## Algorithm Used

- Technique: Bottom-up Dynamic Programming on string prefixes.
- State: `dp[i][j]` = does `s[0..i)` match `p[0..j)`?
- Transitions:
  1. Base: `dp[0][0] = true` (empty string matches empty pattern).
  2. Initialize first row for patterns like `a*`, `a*b*`, `a*b*c*` that can match the empty string: when `p[j-1] === '*'`, set `dp[0][j] = dp[0][j-2]`.
  3. For general `i > 0`, `j > 0`:
     - If `p[j-1]` is a letter or `.`, and it matches `s[i-1]` (`p[j-1] === s[i-1]` or `p[j-1] === '.'`), then `dp[i][j] = dp[i-1][j-1]`.
     - If `p[j-1] === '*'`, we have two possibilities:
       - Use `*` as zero occurrence: `dp[i][j] = dp[i][j-2]` (drop the preceding element and `*`).
       - Use `*` to consume one more char (only if preceding element matches `s[i-1]`):
         - If `p[j-2] === s[i-1]` or `p[j-2] === '.'`, then `dp[i][j] ||= dp[i-1][j]`.

---

## Step-by-step Walkthroughs

We’ll trace two examples to see how the DP fills.

### Example 1
- Input: `s = "aa"`, `p = "a*"`
- Expect: `true` because `a*` can represent any number of `a`'s, including two.

1) Initialization
- `dp[0][0] = true`.
- First row (matching empty `s`): `p[1] = '*'` so `dp[0][2] = dp[0][0] = true`.

2) Fill the table
- For `i = 1` (s[0] = 'a'), `j = 2` (p[1] = '*'):
  - Zero occurrences: check `dp[1][0]` (false).
  - One+ occurrence: since `p[0] = 'a'` matches `s[0] = 'a'`, `dp[1][2] ||= dp[0][2]` => `true`.
- For `i = 2` (s[1] = 'a'), `j = 2`:
  - Zero occurrences: `dp[2][0]` (false).
  - One+ occurrence: `p[0] = 'a'` matches `s[1]`, so `dp[2][2] ||= dp[1][2]` => `true`.

Result: `dp[2][2] = true` ⇒ entire string matches.

### Example 2
- Input: `s = "ab"`, `p = ".*"`
- Expect: `true` because `.*` can match any sequence (including "ab").

1) Initialization
- `dp[0][0] = true`.
- First row: `p[1] = '*'` so `dp[0][2] = dp[0][0] = true`.

2) Fill the table
- For `i = 1` (s[0] = 'a'), `j = 2` (p[1] = '*'):
  - Zero occurrence: `dp[1][0]` (false).
  - One+ occurrence: preceding is `.` which matches any, so `dp[1][2] ||= dp[0][2]` => `true`.
- For `i = 2` (s[1] = 'b'), `j = 2`:
  - Zero occurrence: `dp[2][0]` (false).
  - One+ occurrence: preceding is `.`, so `dp[2][2] ||= dp[1][2]` => `true`.

Result: `dp[2][2] = true` ⇒ full match.

---

## Complexity

- Time Complexity: O(m × n), where `m = s.length`, `n = p.length` — we fill an `(m+1) × (n+1)` table and each cell is computed in O(1).
- Space Complexity: O(m × n) for the DP table.
  - You can optimize to O(n) by keeping only the previous row, but it complicates the `*` transition logic.

---

## Alternative Approaches

1) Top-down recursion with memoization (DFS + cache)
   - Pros: Mirrors the definition naturally; often shorter code.
   - Cons: Requires careful memoization to avoid exponential blowup; recursion depth may be large for long inputs.

2) Backtracking without memoization
   - Pros: Conceptually simple.
   - Cons: Exponential time in worst case; will TLE on large cases.

3) 1D DP (space-optimized)
   - Pros: Reduces space to O(n).
   - Cons: Tricky to implement correctly due to `*` dependencies on current and previous states; easy to introduce bugs.

The provided bottom-up 2D DP is a robust, readable, and efficient solution.

---

## Additional Example I/O

- `s = "aab"`, `p = "c*a*b"` → `true`
  - `c*` matches empty, `a*` matches `aa`, then `b` matches `b`.
- `s = "mississippi"`, `p = "mis*is*p*."` → `false`
  - Pattern fails to cover the full string under valid `*` usages.
- `s = ""`, `p = ".*"` → `true`
  - `.*` can match any (including empty).
- `s = ""`, `p = "a*"` → `true`
  - `a*` can match zero `a`.

---

## Why This Works

By enumerating all ways `*` can behave at each position and reusing sub-results, the DP systematically covers all valid matches without redundant recomputation. This guarantees correctness and runs efficiently for all input sizes allowed by the problem.
