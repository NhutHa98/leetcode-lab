
## Idea (Intuition and Why It Works)

We want two vertical lines that, together with the x-axis, form a container holding the maximum water. For any pair of indices (i, j), the container area is:

- Height = min(height[i], height[j])
- Width = j - i
- Area = Height × Width

Key insight:
- If we fix two ends and then move the pointer at the taller line inward, width shrinks and the limiting height (the smaller of the two) does not improve (it stays the same or becomes smaller), so area cannot increase.
- Conversely, moving the pointer at the shorter line may find a taller line, potentially increasing the limiting height enough to offset the reduced width.

Therefore, always move the pointer at the shorter line. This greedy rule guarantees we never miss the optimal pair.

## Algorithm Used: Two Pointers

- Place one pointer at the start (left = 0) and one at the end (right = n - 1).
- At each step:
  - Compute current area using the two lines.
  - Update the maximum area.
  - Move the pointer pointing to the shorter line inward (left++ if height[left] < height[right], else right--).
- Stop when left >= right.

This is exactly what [`maxArea`](011%20-%20Container%20With%20Most%20Water/code.js) does.

## Step-by-Step Walkthrough

### Pseudocode
- Initialize left = 0, right = n - 1, max = 0
- While left < right:
  - h = min(height[left], height[right])
  - w = right - left
  - max = max(max, h × w)
  - If height[left] < height[right]: left++ else right--
- Return max

### Example 1
Input: [1, 8, 6, 2, 5, 4, 8, 3, 7]

- Step 1: left=0 (1), right=8 (7) → h=1, w=8, area=8 → max=8 → move left (1<7) → left=1
- Step 2: left=1 (8), right=8 (7) → h=7, w=7, area=49 → max=49 → move right (8≥7) → right=7
- Step 3: left=1 (8), right=7 (3) → h=3, w=6, area=18 → max=49 → move right → right=6
- Step 4: left=1 (8), right=6 (8) → h=8, w=5, area=40 → max=49 → move right → right=5
- Step 5: left=1 (8), right=5 (4) → h=4, w=4, area=16 → max=49 → move right → right=4
- Step 6: left=1 (8), right=4 (5) → h=5, w=3, area=15 → max=49 → move right → right=3
- Step 7: left=1 (8), right=3 (2) → h=2, w=2, area=4 → max=49 → move right → right=2
- Step 8: left=1 (8), right=2 (6) → h=6, w=1, area=6 → max=49 → move right → right=1
- Stop: left == right → answer = 49

### Example 2
Input: [2, 3, 4, 5, 18, 17, 6]

- Step 1: left=0 (2), right=6 (6) → h=2, w=6, area=12 → max=12 → move left → left=1
- Step 2: left=1 (3), right=6 (6) → h=3, w=5, area=15 → max=15 → move left → left=2
- Step 3: left=2 (4), right=6 (6) → h=4, w=4, area=16 → max=16 → move left → left=3
- Step 4: left=3 (5), right=6 (6) → h=5, w=3, area=15 → max=16 → move left → left=4
- Step 5: left=4 (18), right=6 (6) → h=6, w=2, area=12 → max=16 → move right → right=5
- Step 6: left=4 (18), right=5 (17) → h=17, w=1, area=17 → max=17 → move right → right=4
- Stop: left == right → answer = 17

## Correctness Rationale (Why Moving the Shorter Pointer Works)

Suppose height[left] <= height[right]. The current area is bounded by height[left]. If we move right inward:
- Width decreases.
- Limiting height cannot increase (still at most height[left]) because the shorter side didn’t change.
- Area cannot improve.

But if we move left inward, we may find a taller line, increasing the limiting height and possibly improving area despite reduced width. Symmetric reasoning applies when height[right] < height[left]. Repeating this yields the optimal.

## Complexity

- Time: $O(n)$ — each pointer moves at most n - 1 times.
- Space: $O(1)$ — constant extra variables.

## Alternatives

- Brute Force (All Pairs):
  - Check every pair (i, j), compute area, track max.
  - Time: $O(n^2)$, Space: $O(1)$
  - Pros: Simple to reason about.
  - Cons: Too slow for large inputs; exceeds time limits.

- Monotonic Stack / Preprocessing:
  - Attempts to precompute next greater to the left/right do not straightforwardly yield optimal area because area depends on both min(height[i], height[j]) and distance (j - i). No known stack-based approach beats the two-pointer linear scan.
  - Pros: N/A here.
  - Cons: Adds complexity without improving complexity bounds.

- Divide and Conquer:
  - Not effective for this objective; no efficient substructure combines to global optimum better than two-pointers.

Conclusion: The two-pointer method is the optimal linear-time, constant-space solution.

## Example I/O Walkthrough

- Input: [1,8,6,2,5,4,8,3,7]
- Output: 49
- Explanation: The best pair is at indices (1, 8) → min(8, 7) × (8 - 1) = 7 × 7 = 49.

- Input: [1,1]
- Output: 1
- Explanation: min(1, 1) × (1 - 0) = 1 × 1 = 1.

## Edge Cases

- Fewer than 2 lines → max area is 0 (the loop returns initial 0).
- Zeros in height → handled naturally; area becomes 0 when a side is 0.
- All equal heights → optimal is endpoints for maximum width.
