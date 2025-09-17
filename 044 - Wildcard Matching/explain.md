# 044. Wildcard Matching — Explanation

## Idea and Intuition

We want to check if a pattern `p` matches a string `s` where:
- `?` matches exactly one arbitrary character, and
- `*` matches any sequence of characters (including empty).

A natural way to reason about this is: when reading the i-th character of `s` and the j-th character of `p`, does the prefix `s[0..i-1]` match the prefix `p[0..j-1]`? This leads to a dynamic programming formulation that builds the answer from smaller subproblems.

Key insights:
- If `p[j-1]` is a normal character or `?`, then current characters must match (or be `?`), and we reduce to whether previous prefixes matched.
- If `p[j-1]` is `*`, it can either represent an empty sequence (skip it) or “eat” one character from `s` and try again. This creates the classic DP recurrence for wildcard matching.

This approach guarantees correctness by exploring all valid interpretations of `*` in a structured, non-exponential way.

## Algorithm Used: Dynamic Programming (2D DP)

Define `dp[i][j]` as a boolean meaning: does `s[0..i-1]` match `p[0..j-1]`?

Initialization:
- `dp[0][0] = true` (empty pattern matches empty string)
- First row: `dp[0][j] = true` only if the pattern prefix `p[0..j-1]` consists only of `*` characters; i.e., we can match an empty string with stars.

Transition:
- If `p[j-1]` is a letter and `p[j-1] === s[i-1]`, or `p[j-1] === '?'`,
  - `dp[i][j] = dp[i-1][j-1]`
- If `p[j-1] === '*'`, then `*` can match:
  - Empty sequence: `dp[i][j] |= dp[i][j-1]` (skip `*` in pattern)
  - One more character from `s`: `dp[i][j] |= dp[i-1][j]` (use `*` to consume `s[i-1]` and keep `*` for more)

Answer: `dp[m][n]` where `m = s.length`, `n = p.length`.

## Reference Implementation (from this folder)

The provided `code.js` implements exactly this 2D DP:
- Builds a `(m+1) x (n+1)` boolean table
- Seeds base cases (`dp[0][0]` and the first row for leading `*`)
- Fills the table using the transitions above

## Step-by-Step Walkthroughs

We’ll narrate DP thinking without drawing the full table. Focus on the key cells that flip to `true`.

### Example 1
- Input: `s = "adceb"`, `p = "*a*b"`
- Expect: `true`

Why it matches:
1. Initialize: `dp[0][0] = true`. Because the first pattern char is `*`, the first row keeps `true` flowing: `dp[0][1] = true` (the `*` matches empty). Subsequent non-`*` chars won’t keep `true` in row 0.
2. When we see `*` at `p[0]`, for any `i`, `dp[i][1]` can be true because `*` can consume characters of `s`. This creates a vertical “true” flow down the first pattern column.
3. Next significant check is `p[1] = 'a'`. We need an `'a'` in `s` positioned so that the `*` before it can cover everything before that `'a'`. `s[0] = 'a'` matches directly at `dp[1][2]` via `dp[0][1]`.
4. Later `p[2] = '*'` can consume `"dce"` part of `s` via the `dp[i][3] = dp[i][2] || dp[i-1][3]` recurrence (either skip `*` or consume more from `s`).
5. Finally `p[3] = 'b'` must match the last `s` character `'b'`. Because the earlier `*` can stretch to align this, `dp[m][n] = dp[5][4]` becomes `true`.

Intuition: `*` at the beginning swallows any prefix until the first `'a'`, the middle `*` swallows the middle chunk, and the final `'b'` aligns with the last character of `s`.

### Example 2
- Input: `s = "acdcb"`, `p = "a*c?b"`
- Expect: `false`

Why it fails:
1. `p[0] = 'a'` matches `s[0] = 'a'`: `dp[1][1] = true`.
2. `p[1] = '*'` can consume any sequence. It will try to align so that the following `c?b` matches the tail of `s`.
3. After some consumption by `*`, we need the subsequence `c ? b` to match consecutively.
   - We require a `'c'` somewhere, then any char, then `'b'` as the last character.
4. The actual tail of `s` is `"dcb"` starting after the first `'a'`. Trying to place `c ? b` against `"dcb"`:
   - `'c'` can align with `'c'` (good)
   - `?` aligns with `'d'` or `'b'` depending on how `*` is used, but ultimately you need the final `'b'` to align at the very end.
5. The alignment constraints can’t be satisfied simultaneously: the positions forced by `c ? b` and the remaining characters do not make `dp[m][n]` true.

DP will propagate many `true`s via the `*`, but the final check fails to land exactly on the last `b` with the `?` in the correct middle position, resulting in `dp[m][n] = false`.

## Complexity
- Time: O(m · n), where `m = s.length` and `n = p.length`. Each `dp[i][j]` is computed in O(1).
- Space: O(m · n) for the full DP table.

Space optimization: You can reduce to O(n) by keeping only the previous row (and carefully ordering updates). The transitions only depend on `dp[i-1][j-1]`, `dp[i-1][j]`, and `dp[i][j-1]`.

## Alternatives and Improvements

1) Greedy Two-Pointer with Backtracking (O(1) space)
- Idea:
  - Use two indices `i` (for `s`) and `j` (for `p`).
  - Track `starIdx` (the most recent `*` index in `p`, initialized to -1) and `matchIdx` (the index in `s` where that `*` started to match).
  - Walk `s` and `p`:
    - If chars match or `p[j] == '?'`, advance both.
    - If `p[j] == '*'`, record `starIdx = j` and `matchIdx = i`, and advance `j` (let `*` be empty for now).
    - On mismatch: if we’ve seen a `*` (`starIdx != -1`), backtrack: set `j = starIdx + 1` and increment `matchIdx` then set `i = matchIdx` (let the `*` consume one more char). If no prior `*`, return false.
  - At the end, skip any trailing `*` in `p` and ensure you’re at the pattern end.
- Pros: O(m + n) time in practice and O(1) space; very fast and memory-efficient.
- Cons: Trickier to implement correctly; reasoning is more subtle than DP. Some describe worst-case behavior, but the classic implementation is linear-time for this wildcard definition.

2) DP with 1D Rolling Array (O(n) space)
- Keep a single row `dp[j]` for current `i`, plus a variable to remember the previous diagonal `dp[i-1][j-1]`.
- Pros: Keeps DP simplicity but uses much less memory.
- Cons: Slightly more careful coding; still O(m · n) time.

## Example Inputs and Outputs

- `s = "aa"`, `p = "a"` → `false`
- `s = "aa"`, `p = "*"` → `true`
- `s = "cb"`, `p = "?a"` → `false`
- `s = "adceb"`, `p = "*a*b"` → `true`
- `s = "acdcb"`, `p = "a*c?b"` → `false`

## Why This Works
The DP formulation encodes the only two meaningful interpretations of `*` (empty vs. one-more-character) and the straightforward rules for `?` and exact matches. By combining subproblems in a table, we ensure every viable path from prefixes of `p` to prefixes of `s` is considered exactly once, avoiding exponential explosion while guaranteeing correctness.

## Edge Cases to Consider
- Empty string and/or empty pattern
- Pattern made of only `*` (should match any `s`, including empty)
- Consecutive `*` (functionally equivalent to one `*`)
- Mismatch with no `*` to fall back on
- Very long strings/patterns (use 1D DP or greedy to save memory)
