# 017. Letter Combinations of a Phone Number

## 1. Idea
Given a string of digits (2–9), we want to return all possible letter combinations that the number could represent, following the mapping on a classic telephone keypad. Each digit expands into a set of characters; the final answer is the cartesian product of these sets, in the original digit order.

The natural way to build all combinations is depth-first search (DFS) with backtracking: we grow a partial string by choosing one letter for the current digit, recurse to process the next digit, and when we reach the end, we record the built string.

Why it works: Every combination must pick exactly one letter per digit, and there is no dependency between digits beyond order. Backtracking enumerates every path (choice sequence) exactly once.

## 2. Step-by-Step Walkthrough
### Code Recap
```js
var letterCombinations = function(digits) {
    if (!digits) return [];
    const map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    const result = [];
    const backtrack = (combination, nextDigits) => {
        if (nextDigits.length === 0) {
            result.push(combination);
        } else {
            for (let letter of map[nextDigits[0]]) {
                backtrack(combination + letter, nextDigits.slice(1));
            }
        }
    };
    backtrack('', digits);
    return result;
};
```

### Explanation of Key Parts
1. Handle empty input: if `digits` is empty, there are no combinations.
2. `map` stores digit→letters mapping.
3. `result` accumulates completed combinations.
4. `backtrack(combination, nextDigits)`:
   - Base case: no `nextDigits` left → push built `combination`.
   - Recursive step: look at first remaining digit, iterate through its letters, append one, recurse with the rest (`slice(1)`).
5. Initial call starts with an empty combination and the full `digits` string.

### Walkthrough Example 1: digits = "23"
- Start: combination = "", nextDigits = "23"
  - Current digit: '2' → letters: a, b, c
    - Choose 'a': combination = "a", nextDigits = "3"
      - Current digit: '3' → letters: d, e, f
        - 'd' → combination = "ad", nextDigits = "" → push "ad"
        - 'e' → push "ae"
        - 'f' → push "af"
    - Choose 'b': similarly adds "bd", "be", "bf"
    - Choose 'c': adds "cd", "ce", "cf"
Result order (depth-first): ["ad","ae","af","bd","be","bf","cd","ce","cf"].

### Walkthrough Example 2: digits = "79"
- '7' → "pqrs", '9' → "wxyz".
- Branches: 4 letters × 4 letters = 16 combinations.
- Flow (first few):
  - p + w → "pw"
  - p + x → "px"
  - p + y → "py"
  - p + z → "pz"
  - q + w → "qw" ... up to s + z → "sz".
Result size = 4 × 4 = 16.

## 3. Algorithm
Technique: Recursive DFS Backtracking.

Outline:
1. If input is empty, return [].
2. Define digit→letters map.
3. Start recursion with empty prefix.
4. At each step, pick the next digit, iterate through its possible letters, append one, recurse to next digit.
5. When all digits consumed, record the built string.

This enumerates the cartesian product of character sets while preserving order.

## 4. Complexity Analysis
Let n = number of digits. Each digit expands to between 3 and 4 letters. Worst-case branching factor = 4 (digits containing 7 or 9). Upper bound on number of combinations = 4^n (tight when all digits are 7/9). Time complexity: O(4^n * n) if counting string concatenation cost (each of length n). Space complexity:
- Recursion depth: O(n)
- Output size: O(4^n * n) to store all combinations
- Auxiliary (excluding output): O(n)

## 5. Alternative Solutions (High-Level)
1. Iterative BFS/Layer Expansion:
   - Start with [""]. For each digit, build next list by appending each letter to each partial string.
   - Pros: Avoids recursion (helpful in languages with small stack limits).
   - Cons: Needs repeated array allocations; similar complexity.
2. Queue-Based (Same as BFS with a queue):
   - Use a queue: while front length < n, pop, expand by next digit letters, push back.
   - Pros: Potentially clearer iterative control; can stream results once they reach full length.
   - Cons: Similar memory; slightly more bookkeeping.

## 6. Example Input / Output
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Input: digits = ""
Output: []

Input: digits = "7"
Output: ["p","q","r","s"]

---

# Alternative Solution A: Iterative Expansion

## Idea
Treat combination building as repeated cartesian product expansion. Start with a list containing an empty string. For each digit, replace the list with all existing strings plus each possible mapped letter appended.

## Step-by-Step
Given digits = "23":
- Start: combos = [""]
- Digit '2' → letters: a b c
  - New combos: ["a","b","c"]
- Digit '3' → letters: d e f
  - Expand: take each of ["a","b","c"], append d/e/f → ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Done.

## Algorithm
1. If digits empty → return [].
2. Initialize `res = [""]`.
3. For each digit d:
   - temp = []
   - For each partial p in res:
     - For each letter L in map[d]: push p + L into temp.
   - res = temp
4. Return res.

## Complexity
Same as backtracking: O(4^n * n) time, O(4^n * n) output space; auxiliary O(4^n) for the growing list.

## Pros / Cons
Pros: No recursion, straightforward loops. Cons: Creates intermediate arrays each level; string concatenations similar cost.

## Example
Input: "79" → After '7': ["p","q","r","s"]; after '9': expand to 16 strings.

---

# Alternative Solution B: Queue (Breadth-First Generation)

## Idea
Use a queue to iteratively build combinations breadth-first. While the front string length is less than the number of digits, expand it by appending each possible letter for the next position, enqueue those, and continue. When a string reaches full length, keep it but stop expanding it.

## Step-by-Step
Digits = "23":
- queue = [""]
- Take "" (length 0 < 2) → next digit index = 0 → digit '2' → enqueue "a","b","c".
- queue now: ["a","b","c"]
- Dequeue "a" (len 1 < 2) → next digit index = 1 → digit '3' → enqueue "ad","ae","af".
- Continue for "b" and "c" similarly.
- Once items have length 2, they remain (can be collected at end). When head has length == n, all others will also (due to uniform expansion), so we can stop.

## Algorithm
1. If digits empty → return [].
2. Initialize queue = [""]; n = digits.length.
3. While queue front length < n:
   - Pop front string s.
   - Let i = s.length (next digit index). For each letter L in map[digits[i]]: push s + L to back.
4. Return queue (all full-length combinations).

## Complexity
Each combination enqueued exactly once; expansions: O(4^n * n) time. Space: O(4^n * n) for output retained in queue.

## Pros / Cons
Pros: Early streaming possible (yield full-length strings as they appear). Cons: More queue operations; similar complexity.

## Example
Digits = "7" → queue initializes [""] → expand to ["p","q","r","s"] and finish.

---

# Additional Notes
- Pruning is not applicable; all paths valid.
- Order of results depends on traversal method; LeetCode usually accepts any order.
- Using indices instead of slicing (`nextDigits.slice(1)`) can avoid creating substrings each recursion and slightly improve performance.

## Possible Micro-Optimization of Original Code
Replace the recursive call parameter `nextDigits.slice(1)` with an index pointer to avoid substring allocation:
```js
function letterCombinations(digits) {
  if (!digits) return [];
  const map = { '2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz' };
  const res = [];
  function dfs(pos, path) {
    if (pos === digits.length) { res.push(path); return; }
    for (const ch of map[digits[pos]]) dfs(pos + 1, path + ch);
  }
  dfs(0, "");
  return res;
}
```
