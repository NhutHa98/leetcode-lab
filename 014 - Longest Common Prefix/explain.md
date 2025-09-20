# 014. Longest Common Prefix

## 1. Idea (Intuition)
We are asked to find the longest prefix (a starting substring) that is shared by every string in the array. A direct way to think about this is: start with the entire first string as a *candidate prefix*, and keep shrinking it until it matches the start of every other string.

Why does shrinking work? Because any valid common prefix must itself be a prefix of the first string. If the current candidate is not a prefix of some later string, removing the last character is the only direction to go—there's no way to "fix" the mismatch except by making the candidate shorter.

This is a **prefix reduction** approach: iteratively tighten the prefix until it fits all strings.

## 2. Step-by-Step Walkthrough
### Implementation Overview
1. Initialize `prefix` to the first string (`strs[0]`). If the list is empty, answer is `""`.
2. For each subsequent string `s` in the array:
   - While `s` does NOT start with `prefix` (checked via `s.indexOf(prefix) !== 0`):
     - Chop off the last character of `prefix` (`prefix = prefix.substring(0, prefix.length - 1)`).
     - If `prefix` becomes empty, return `""` early.
3. After processing all strings, the remaining `prefix` is the longest common prefix.

This loop ensures the prefix is always valid for all processed strings up to that point.

### Example 1
Input: `["flower", "flow", "flight"]`

- Start: `prefix = "flower"`
- Compare with `"flow"`:
  - `"flow"`.indexOf("flower") → -1 (not a prefix) → shorten:
    - `"flowe"`? still not prefix
    - `"flow"`? Yes (`indexOf` returns 0). Now `prefix = "flow"`.
- Compare with `"flight"`:
  - `"flight"`.indexOf("flow") → -1 → shorten:
    - `"flo"`? `"flight"`.indexOf("flo") = 0? No (returns -1) because `"fli..."` vs `"flo"` mismatch at 3rd char.
    - `"fl"`? Yes (starts with "fl"). Now `prefix = "fl"`.
- End of loop → Answer: `"fl"`.

### Example 2
Input: `["interspecies", "interstellar", "interstate"]`

- Start: `prefix = "interspecies"`
- Compare with `"interstellar"`:
  - Not a prefix → shrink until match:
    - `"interspecie"`, `"interspeci"`, … (keep trimming) … `"intersp"`, `"inters"`, `"inter"`.
    - `"inter"` is a prefix of `"interstellar"` → `prefix = "inter"`.
- Compare with `"interstate"`:
  - `"interstate"`.indexOf("inter") == 0 → keep `"inter"`.
- Final answer: `"inter"`.

## 3. Algorithm Name / Technique
This is a straightforward iterative **Prefix Shrinking** (or **Incremental Constraint Reduction**) approach. It relies on string prefix checking using `indexOf` (which is effectively verifying if `s.startsWith(prefix)`).

Alternative categorizations sometimes call this the **Vertical Scan (via trimming)** variant: we validate the prefix against each string and adjust downward.

## 4. Complexity Analysis
Let:
- `n` = number of strings
- `L` = length of the first string (worst-case starting prefix length)
- `S` = total number of characters across all strings

Worst-case time complexity: O(S)
Explanation: Each character of the initial prefix can be removed at most once across all comparisons. Each `indexOf(prefix)` (or conceptual `startsWith`) checks up to the length of the current prefix. Amortized over all shrink operations and strings, this is linear in the total input size.

Space complexity: O(1) extra (ignoring input and the substring operation's internal representation; in JS, substring typically shares storage or allocates up to length of prefix but asymptotically constant auxiliary space).

## 5. Alternative Solutions
### A. Horizontal Scanning (Current Approach)
- Process strings left to right, shrinking prefix as needed.
- Pros: Simple, no extra data structures, early exit on empty prefix.
- Cons: Repeated `indexOf` calls may feel inefficient (though still linear overall).

### B. Vertical Scanning
- Compare characters column-by-column: check char 0 of all strings, then char 1, etc., stopping at first mismatch.
- Time: O(S). Space: O(1).
- Pros: Intuitive; no substring trimming.
- Cons: Slightly more manual index management.

### C. Divide and Conquer
- Split list into halves, find LCP of each half recursively, then merge by comparing two prefixes.
- Time: O(S). Space: O(log n) recursion stack.
- Pros: Parallelizable conceptually.
- Cons: More code; overhead not worth it for small n.

### D. Binary Search on Prefix Length
- Find min length among strings = `m`. Binary search length in [0, m]; test if all strings share the prefix of that length.
- Time: O(S log m) worst-case (each check scans n strings * mid length). Space: O(1).
- Pros: Elegant when strings are very long but mismatch early/late.
- Cons: Slightly higher complexity vs linear methods for typical inputs.

### E. Trie (Prefix Tree)
- Insert all strings into a trie; traverse until a node with >1 branch or end-of-word.
- Time: O(S) build, O(P) to extract prefix (P = answer length). Space: O(S) for trie.
- Pros: Useful if multiple prefix queries will run on the same dataset.
- Cons: Heavy for a single query; extra memory.

## 6. Additional Example I/O
Input: `["dog", "racecar", "car"]`
- Start prefix: `"dog"`
- Compare with `"racecar"`: shrink → `"do"` → `"d"` → `""` → return `""` early.
Output: `""`

Input: `["" , "", ""]`
- First string is empty → prefix = "" → result `""`.

Input: `["single"]`
- Only one string → prefix returned unchanged: `"single"`.

## 7. Edge Cases Covered
- Empty array → returns `""` immediately.
- One string → returns that string.
- At least one empty string → returns `""`.
- No shared prefix at all → shrinks to empty and exits early.

## 8. Summary
The solution keeps a candidate prefix and trims it until it satisfies every string. Its efficiency comes from the fact each character is discarded at most once, yielding linear time in the total input size without extra space.

---
**Final Answer Behavior**: Deterministically returns the longest common starting substring or `""` if none exists.
