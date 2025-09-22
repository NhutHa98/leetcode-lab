# 3Sum Closest

## 1. Idea
We want three numbers whose sum is as close as possible to a given `target`. Rather than generating all triplets (O(n^3)), we can sort the array and, for each fixed first element, use a two-pointer scan to efficiently search the best pair to complete the triplet.

Key intuition:
- Sorting allows directional movement: if the current sum is too small, move the left pointer right to increase it; if too large, move the right pointer left to decrease it.
- Maintain a running best (closest) sum; update it whenever we find a better candidate.
- An exact match (`sum === target`) is the optimal possible answer, so we can return early.

This is analogous to the classic 3Sum pattern, but instead of storing matches equal to zero, we track the numerically closest sum to `target`.

## 2. Step-by-step Walkthrough
### Code Recap
```js
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let closest = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }
      if (sum < target) {
        left++;
      } else if (sum > target) {
        right--;
      } else {
        return sum; // perfect match
      }
    }
  }
  return closest;
};
```

### Walkthrough Example 1
Input: `nums = [-1, 2, 1, -4]`, target = `1`
1. Sort → `[-4, -1, 1, 2]`
2. Initialize `closest = (-4) + (-1) + 1 = -4` (first three elements).
3. `i=0` (`-4`): left=1 (`-1`), right=3 (`2`)
   - sum = -4 + -1 + 2 = -3 → | -3 - 1 | = 4 < | -4 - 1 | = 5 → closest = -3. sum < target → left++.
   - left=2 (`1`), right=3 (`2`): sum = -4 + 1 + 2 = -1 → | -1 - 1 | = 2 < | -3 - 1 | = 4 → closest = -1. sum < target → left++ (now left==right → exit while).
4. `i=1` (`-1`): left=2 (`1`), right=3 (`2`)
   - sum = -1 + 1 + 2 = 2 → | 2 - 1 | = 1 < | -1 - 1 | = 2 → closest = 2. sum > target → right-- (right==left → stop).
Loop ends. Answer = `2`.

### Walkthrough Example 2
Input: `nums = [0, 1, 2]`, target = `3`
1. Already sorted.
2. closest = 0 + 1 + 2 = 3 (exact match).
3. Outer loop `i=0`: sum = 3 immediately; return 3.

## 3. Algorithm (Sorted + Two Pointers)
1. Sort `nums` ascending.
2. Initialize `closest` as the sum of the first three numbers.
3. For each index `i` from 0 to n-3:
   - Set `left = i + 1`, `right = n - 1`.
   - While `left < right`:
     - Compute `sum = nums[i] + nums[left] + nums[right]`.
     - If `|sum - target| < |closest - target|`, update `closest = sum`.
     - If `sum < target`, increment `left` (need a larger total).
     - Else if `sum > target`, decrement `right` (need a smaller total).
     - Else return `sum` (perfect match).
4. Return `closest`.

## 4. Complexity Analysis
- Sorting: O(n log n)
- Outer loop with two-pointer inner scan: O(n^2)
- Total Time: O(n^2)
- Space: O(1) extra (ignoring in-place sort; depends on sort implementation). No extra data structures.

## 5. Alternative Solutions
### A. Brute Force Enumeration
Check all triplets, track min absolute difference.
- Time: O(n^3)
- Space: O(1)
- Pros: Straightforward.
- Cons: Too slow for large n (exceeds constraints for typical LeetCode inputs).

### B. Partial Pruning with Early Bounds
After sorting, for each `i` you can compute:
- Minimal possible sum this round: `nums[i] + nums[i+1] + nums[i+2]`.
  - If this min is already greater than target and closer than current `closest`, you can update and break inner exploration for larger i (since sums will only grow further for higher bases).
- Max possible sum: `nums[i] + nums[n-1] + nums[n-2]`.
  - If this max is less than target, compare/update `closest` and continue to next i without scanning pointers.
Time remains worst-case O(n^2) but can prune work for partially sorted favorable distributions.

## 6. Example Input/Output
Input: `nums = [-1, 2, 1, -4]`, target = `1`
Output: `2`

---

# Alternative Solution 1: Brute Force

## Idea
Enumerate every combination of three indices (i<j<k). Compute sum, track the closest to target.

## Algorithm
1. Set `closest = nums[0] + nums[1] + nums[2]`.
2. Triple loop for i,j,k:
   - sum = nums[i] + nums[j] + nums[k]
   - If `|sum - target| < |closest - target|` update closest.
   - If sum == target return target.
3. Return closest.

## Complexity
- Time: O(n^3)
- Space: O(1)

## Pros / Cons
+ Easiest to implement.
- Prohibitively slow beyond small n.

---

# Alternative Solution 2: Optimized Two-Pointer with Bounds Pruning

## Idea
Enhance the main two-pointer approach with early bounding.
For each base index i:
- Compute minSum = nums[i] + nums[i+1] + nums[i+2]. If minSum > target and |minSum - target| ≥ current best difference, you can potentially early exit for that i or break overall if i increases values monotonically.
- Compute maxSum = nums[i] + nums[n-2] + nums[n-1]. If maxSum < target, update closest if better and continue to next i (no need to run two-pointer since every other pair will be <= maxSum and thus further from target on the opposite side).

## Algorithm Outline
1. Sort nums.
2. Initialize closest.
3. For each i:
   - minSum, maxSum calculations.
   - Apply pruning rules.
   - Run standard two-pointer if not pruned.
4. Return closest.

## Complexity
- Worst-case Time: O(n^2)
- Space: O(1)
- Practical speed-up when distribution lets bounds prune many iterations.

## Pros / Cons
+ Faster in favorable cases (clustered or monotonic sections).
- Added complexity; little benefit for adversarial inputs.

## Example (Conceptual)
If target is very large and all numbers small, maxSum << target each iteration, so we skip pointer scans quickly.

---

## Summary
The classic sorted two-pointer approach provides an optimal (within expected constraints) O(n^2) solution with constant extra space. Further micro-optimizations (bounds pruning) may help but are optional unless input sizes are extreme.
