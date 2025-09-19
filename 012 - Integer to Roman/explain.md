## 012. Integer to Roman – Explanation

### 1. Idea / Intuition
Roman numerals are built by concatenating symbols that represent specific values. To minimize the length and follow the Roman numeral rules, we always use the largest possible symbol first, subtract its value, and repeat. This is a classic Greedy approach: at every step we make the locally optimal choice (largest symbol that still fits) which leads to the globally correct Roman numeral because the Roman system is constructed from fixed, non-overlapping canonical chunks (including the “subtractive” forms like IV, IX, XL, XC, CD, CM) that enforce uniqueness.

Why it works:
- The Roman numeral system for 1–3999 can be expressed as a sorted list of value–symbol pairs (including subtractive pairs).
- Every integer in range has a unique representation when you always prefer the largest value not exceeding the remainder.
- Adding subtractive forms (4, 9, 40, 90, 400, 900) prevents illegal repetitions (e.g. “IIII” or “VIIII”).

So: keep subtracting the largest valid value and append its symbol—this naturally produces the canonical Roman numeral.

### 2. Step-by-Step Walkthrough of the Implemented Solution
Code reference: `code.js` defines arrays `val` and `syms` in descending order and greedily builds the result.

Algorithm steps:
1. Prepare parallel arrays:
   - Values: `[1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]`
   - Symbols: `["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]`
2. Initialize an empty result string `res`.
3. Loop through each index `i` in the arrays:
   - While the remaining number `num` is >= `val[i]`:
     - Subtract `val[i]` from `num`.
     - Append `syms[i]` to `res`.
4. When `num` becomes 0, all value has been represented. Return `res`.

Because the arrays are sorted descending and contain all subtractive forms, the first fitting value always gives the correct next Roman symbol.

### 3. Two Detailed Examples

#### Example A: Input: 58
Target output: `LVIII`

Start: num = 58, res = ""

| Step | Largest <= num | Action | New num | res |
|------|-----------------|--------|---------|-----|
| 1 | 50 (L) | num -= 50; append L | 8 | L |
| 2 | 10? too big | skip | 8 | L |
| 3 | 9? too big | skip | 8 | L |
| 4 | 5 (V) | subtract & append | 3 | LV |
| 5 | 4? too big | skip | 3 | LV |
| 6 | 1 (I) | subtract & append | 2 | LVI |
| 7 | 1 (I) | subtract & append | 1 | LVII |
| 8 | 1 (I) | subtract & append | 0 | LVIII |

Result: `LVIII`

Breakdown meaning: 50 + 5 + 1 + 1 + 1 = 58.

#### Example B: Input: 1994
Target output: `MCMXCIV`

Start: num = 1994, res = ""

| Step | Largest <= num | Action | New num | res |
|------|-----------------|--------|---------|------|
| 1 | 1000 (M) | subtract & append | 994 | M |
| 2 | 900 (CM) | subtract & append | 94 | MCM |
| 3 | 500? too big | skip | 94 | MCM |
| 4 | 400? too big | skip | 94 | MCM |
| 5 | 100? too big | skip | 94 | MCM |
| 6 | 90 (XC) | subtract & append | 4 | MCMXC |
| 7 | 50? too big | skip | 4 | MCMXC |
| 8 | 40? too big | skip | 4 | MCMXC |
| 9 | 10? too big | skip | 4 | MCMXC |
| 10 | 9? too big | skip | 4 | MCMXC |
| 11 | 5? too big | skip | 4 | MCMXC |
| 12 | 4 (IV) | subtract & append | 0 | MCMXCIV |

Result: `MCMXCIV` = 1000 + 900 + 90 + 4 = 1994.

### 4. Algorithm Name / Paradigm
Greedy Decomposition using ordered value–symbol pairs (including subtractive notation). Sometimes described as “Greedy + table lookup”.

### 5. Time and Space Complexity
Let k be the number of distinct value-symbol pairs (here k = 13, constant).

- Time Complexity: O(k) in practice, which is O(1) since k and the maximum number of Roman characters for the range (1–3999) are bounded constants. Each symbol can be appended at most a small fixed number of times (e.g., at most 3 for consecutive repeats like III, XXX, etc.).
- Space Complexity: O(1) auxiliary (ignoring the output string). Output length is bounded (max length for numbers ≤ 3999 is 15 characters for “MMMDCCCLXXXVIII”).

### 6. Alternative / Improved Approaches
While the implemented Greedy is already optimal and standard, here are alternatives:

1. Place-Value Precomputed Tables
   - Precompute arrays:
     - thousands: ["", "M", "MM", "MMM"]
     - hundreds: ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
     - tens: ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
     - ones: ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
   - Extract digits with division/mod and concatenate.
   - Pros: Very fast, O(1), extremely readable for those familiar with place-value. Avoids loops of repeated subtraction.
   - Cons: Slightly more memory for lookup arrays, less flexible if ranges or symbol sets change.

2. Repeated Division Approach (No While Loop per Value)
   - For each pair (value, symbol): compute count = Math.floor(num / value); append symbol repeated count times; subtract value * count.
   - Pros: Fewer iterations when counts > 1 (e.g., 3000 -> directly 'MMM').
   - Cons: Minor added arithmetic overhead vs. simple while loops; readability trade-off is subjective.

3. Switch/If Chain by Place
   - Hardcode logic for thousands, hundreds, tens, ones with conditionals.
   - Pros: Potentially minimal arrays.
   - Cons: Verbose, more error-prone, less elegant.

4. Map + Sorted Keys (Dynamic Construction)
   - Store in an array of objects and sort at runtime.
   - Pros: Flexible if symbols set were dynamic.
   - Cons: Unnecessary overhead for a static, known set.

Verdict: The current Greedy or the precomputed place-value table are both top-tier. For clarity and brevity, Greedy is excellent.

### 7. Edge Cases & Valid Inputs
- Minimum: 1 -> I
- Numbers that use subtractive pairs heavily: 4 (IV), 9 (IX), 40 (XL), 90 (XC), 400 (CD), 900 (CM)
- Maximum typical constraint (LeetCode): 3999 -> MMMCMXCIX
- Repetition caps: I, X, C, M can repeat up to three times; subtractive forms avoid illegal sequences like IIII.

### 8. Additional Example Walkthroughs

| Input | Process (High-Level) | Output |
|-------|-----------------------|--------|
| 3 | 1+1+1 -> I I I | III |
| 4 | Subtractive 4 -> IV | IV |
| 9 | Subtractive 9 -> IX | IX |
| 40 | Subtractive 40 -> XL | XL |
| 944 | 900 (CM) + 40 (XL) + 4 (IV) | CMXLIV |
| 2023 | 1000 (M) + 1000 (M) + 20 (XX) + 3 (III) | MMXXIII |

### 9. Correctness Argument (Brief)
Because every Roman numeral chunk in the list is a canonical, non-overlapping token and the list is strictly descending, choosing the first token whose value fits the remaining integer ensures we never miss a better (shorter or valid) representation. Subtractive forms are explicitly included, preventing invalid expansions. Thus the greedy process is both safe and complete.

### 10. Final Code (Reference)
```js
var intToRoman = function(num) {
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let res = "";
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      num -= val[i];
      res += syms[i];
    }
  }
  return res;
};
```

### 11. Summary
Use a descending list of value–symbol pairs (including subtractive forms) and greedily subtract. This is optimal, simple, and constant time for the constrained range.

Feel free to experiment with the precomputed place-value approach if you want an alternative style.
