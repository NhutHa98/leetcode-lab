# Add Two Numbers - LeetCode 2

## Problem
Given two non-empty linked lists representing two non-negative integers, add the two numbers and return the sum as a linked list. The digits are stored in reverse order, and each node contains a single digit.

## Solution 1: Iterative (Dummy Node)
- Traverse both lists, adding corresponding digits and carry.
- Create new nodes for each digit of the result.
- Time Complexity: **O(max(N, M))**
- Space Complexity: **O(max(N, M))**

## Solution 2: Recursion
- Recursively add corresponding digits and carry.
- Each recursive call creates a new node for the result.
- Time Complexity: **O(max(N, M))**
- Space Complexity: **O(max(N, M))** (due to recursion stack)

## Solution 3: Convert to Array, then Back
- Convert both linked lists to arrays.
- Add corresponding digits using array indices and carry.
- Build the result linked list from the sum.
- Time Complexity: **O(N + M)**
- Space Complexity: **O(N + M)**

## Notes
- All solutions handle different lengths and carry correctly.
- The iterative and recursive approaches are most common for this problem.
- The array approach is less common but demonstrates alternative thinking.
