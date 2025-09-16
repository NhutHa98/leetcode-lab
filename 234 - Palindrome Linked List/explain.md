# Palindrome Linked List – Explanation

## 1. Idea

The goal is to determine if a singly linked list is a palindrome (reads the same forwards and backwards). The main challenge is that you can only traverse the list in one direction, and you want to do this efficiently (ideally in O(n) time and O(1) space).

The most common approach uses the **two pointers technique** (fast and slow pointers) to find the middle of the list, then reverses the second half, and finally compares the two halves node by node.

## 2. Step-by-Step Walkthrough

### Step 1: Find the Middle
- Use two pointers: `slow` moves one step at a time, `fast` moves two steps.
- When `fast` reaches the end, `slow` will be at the middle.

### Step 2: Reverse the Second Half
- Reverse the list starting from the `slow` pointer.
- This allows you to compare the first half and the reversed second half in-place.

### Step 3: Compare Both Halves
- Start from the head and from the start of the reversed second half.
- Compare values one by one. If all match, it's a palindrome.

### Step 4 (Optional): Restore the List
- Sometimes, you may want to restore the list to its original state by reversing the second half again.

#### Example 1: Palindrome List
Input: 1 → 2 → 2 → 1
- Step 1: `slow` at 2 (second node), `fast` at end
- Step 2: Reverse second half: 2 → 1
- Step 3: Compare 1==1, 2==2 → All match → Palindrome

#### Example 2: Not a Palindrome
Input: 1 → 2 → 3
- Step 1: `slow` at 2, `fast` at end
- Step 2: Reverse second half: 3
- Step 3: Compare 1==3 (not equal) → Not a palindrome

## 3. Algorithm Used
- **Two Pointers (Fast and Slow)** to find the middle
- **In-place Reversal** of the second half
- **Linear Comparison** of both halves

## 4. Time and Space Complexity
- **Time Complexity:** O(n) – Each node is visited at most twice (once to find the middle, once to reverse, once to compare)
- **Space Complexity:** O(1) – Only a few pointers are used, no extra data structures

## 5. Alternative Solutions

### a) Copy to Array
- Copy all values to an array, then use two pointers to check for palindrome.
- **Pros:** Simple to implement
- **Cons:** O(n) space

### b) Recursive Approach
- Use recursion to compare nodes from both ends.
- **Pros:** Elegant
- **Cons:** O(n) space due to call stack

### c) Stack Approach
- Push first half onto a stack, then compare with the second half.
- **Pros:** Easy to understand
- **Cons:** O(n) space

The in-place reversal method is optimal for space.

## 6. Example Input/Output Walkthrough

### Example 1
**Input:** 1 → 2 → 2 → 1
- Find middle: `slow` at second 2
- Reverse second half: 2 → 1
- Compare: 1==1, 2==2
- **Output:** true

### Example 2
**Input:** 1 → 2 → 3
- Find middle: `slow` at 2
- Reverse second half: 3
- Compare: 1==3 (not equal)
- **Output:** false

---

This approach is efficient and commonly used in interviews and production code for checking if a linked list is a palindrome.