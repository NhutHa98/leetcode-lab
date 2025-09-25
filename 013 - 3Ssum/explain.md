# 3Sum - LeetCode 15

## Overview
Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets. This is a classic problem that extends the Two Sum concept to three numbers.

## Idea
We need all unique triplets `(a, b, c)` in the array such that `a + b + c = 0`. A brute-force approach would check every combination of three numbers (O(n^3)), but we can do better by sorting and using the two-pointer technique to reduce complexity to O(n^2).

Key insights:
- Sorting lets us efficiently move pointers based on whether the current sum is too small or too large.
- After fixing the first element, the problem becomes finding two numbers that sum to `-fixed`.
- We must avoid duplicates by skipping repeated numbers at each decision layer.

## 2. Step-by-step Walkthrough
### Code Recap
```js
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate first elements
    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;  // skip duplicate second
        while (left < right && nums[right] === nums[right - 1]) right--; // skip duplicate third
        left++;
        right--;
      } else if (sum < 0) {
        left++; // need a bigger sum
      } else {
        right--; // need a smaller sum
      }
    }
  }
  return res;
};
```

### Walkthrough Example 1
Input: `[ -1, 0, 1, 2, -1, -4 ]`
1. Sort → `[ -4, -1, -1, 0, 1, 2 ]`
2. `i=0` (`-4`): left=1 (`-1`), right=5 (`2`) → sum = -3 < 0 → left++
   - Try (`-4, -1, 2`) → -3 < 0 → left++
   - Try (`-4, 0, 2`) → -2 < 0 → left++
   - Try (`-4, 1, 2`) → -1 < 0 → left++ → left==right (stop)
3. `i=1` (`-1`): left=2 (`-1`), right=5 (`2`) → sum=0 → store `[-1, -1, 2]`
   - Skip duplicate left (`-1`)
   - Skip duplicate right if any
   - Move inward → left=3 (`0`), right=4 (`1`) → sum=0 → store `[-1, 0, 1]`
   - Move inward → left>=right (stop)
4. `i=2` is duplicate of `i=1` → skip
5. Remaining starting points produce no new triplets.
Result: `[ [-1, -1, 2], [-1, 0, 1] ]`

### Walkthrough Example 2
Input: `[0, 0, 0, 0]`
1. Sort → `[0, 0, 0, 0]`
2. `i=0` (`0`): left=1, right=3 → sum=0 → store `[0,0,0]`
   - Skip duplicate left/right zeros → pointers cross
3. `i=1` is duplicate → skip; further indices also duplicates → stop.
Result: `[ [0,0,0] ]`

## 3. Algorithm (Two Pointers after Sorting)
1. Sort the array ascending.
2. Loop `i` from 0 to `n-3`:
   - If `nums[i] == nums[i-1]`, continue (avoid duplicate first elements).
   - Set `left = i+1`, `right = n-1`.
   - While `left < right`:
     - Compute `sum = nums[i] + nums[left] + nums[right]`.
     - If sum == 0: record triplet; advance `left` past duplicates and `right` past duplicates.
     - Else if sum < 0: increment `left` (need larger sum).
     - Else: decrement `right` (need smaller sum).
3. Return collected triplets.

## 4. Complexity Analysis
- Sorting: O(n log n)
- Outer loop (≈ n) * inner two-pointer scan (≈ n) → O(n^2)
- Total Time: O(n^2)
- Space: O(1) extra (ignoring output list); output size can be up to O(k).

## 5. Alternative Solutions
### A. Brute Force (Triple Nested Loops)
- Enumerate all i<j<k, check sum == 0, store sorted triplets in a set to avoid duplicates.
- Time: O(n^3) + cost of set operations.
- Space: O(k) for results and set.
- Pros: Simple to reason about.
- Cons: Far too slow for large inputs.

### B. Hash-based Two-Sum per Fixed First (with Duplicate Handling)
- For each `i`, run a hash-set based 2-sum for target `-nums[i]` over the suffix.
- Need careful duplicate avoidance (both in 2-sum pairs and across `i`).
- Time: O(n^2)
- Space: O(n) for the hash set per iteration.
- Pros: Also O(n^2); intuitive if you know 2-sum hash method.
- Cons: More space; trickier to de-duplicate cleanly than sorted two-pointer.

## 6. Example Input/Output
Input: `[-1,0,1,2,-1,-4]`
Output: `[[-1,-1,2],[-1,0,1]]`

---

# Alternative Solution 1: Hash-based 2-Sum per Fixed

## Idea
Fix one number, then find two numbers that sum to its negation using a hash set. Avoid duplicates by tracking which triplets have been added (e.g., via string keys or by skipping same values for the fixed index and pair components).

## Walkthrough (Short)
For sorted `[-4,-1,-1,0,1,2]`, fix `-4` → need `4` via two-sum → none. Fix `-1` → need `1` → pairs `(-1,2)` and `(0,1)` give triplets. Skip duplicate `-1`.

## Algorithm
1. Sort array.
2. For each index `i` (skip duplicates):
   - target = `-nums[i]`
   - Create empty set `seen` and `used`.
   - For each `j > i`:
     - complement = target - nums[j]
     - If complement in `seen` and not yet output with nums[j]: record `[nums[i], complement, nums[j]]` and mark pair used.
     - Add nums[j] to `seen`.
3. Return results.

## Complexity
- Time: O(n^2)
- Space: O(n)

## Pros / Cons
+ Familiar if you know hash-based 2-sum.
- More bookkeeping for duplicates compared to two-pointer.

---

# Alternative Solution 2: Counting + Combinatorial Generation

## Idea
If numbers are within a constrained range, count frequencies (hash map). Iterate unique values (a ≤ b ≤ c) and check if their counts allow forming zero-sum triplets.

## Algorithm Outline
1. Build frequency map `freq` of all numbers.
2. Extract and sort distinct numbers `vals`.
3. For each ordered pair `(i, j)` with `i ≤ j`:
   - Let `a = vals[i]`, `b = vals[j]`, `c = -(a + b)`.
   - Ensure `c` ≥ `b` to maintain ordering and avoid duplicates.
   - Check `c` in `freq` and that counts suffice:
     - All equal: need `freq[a] ≥ 3`.
     - Two equal: need appropriate counts.
     - All distinct: each must exist.
4. Append valid triplets.

## Complexity
- Let m = number of distinct values.
- Time: O(m^2) (can be faster than O(n^2) if many duplicates compress n → m).
- Space: O(m) for map + output.

## Pros / Cons
+ Great when array has many repeats (small m).
- Still O(m^2); overhead and complexity higher; worse when all elements distinct (m = n).

## Example
Input: `[ -1, 0, 1, 2, -1, -4 ]` → distinct sorted: `[-4,-1,0,1,2]`.
Pairs produce `[-1,-1,2]` and `[-1,0,1]` after frequency checks.

---

## Summary
The sorted two-pointer approach is the cleanest balance of speed (O(n^2)), space efficiency, and simplicity in handling duplicates, making it the standard solution for 3Sum.
