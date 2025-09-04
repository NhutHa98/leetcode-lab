# Comprehensive Explanation: No1-TwoSum.js

## Problem Statement
Given an array of integers (`nums`) and an integer (`target`), find two distinct indices in the array such that the numbers at those indices add up to the target. Return the indices as an array. If no solution exists, return an empty array.

## Code Overview
```javascript
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return []; // Return empty array if no solution found
};
```

## Step-by-Step Explanation

### 1. Function Definition
- The function `twoSum` takes two parameters:
  - `nums`: An array of numbers.
  - `target`: The target sum to find.

### 2. Using a Hash Map
- A `Map` object (`map`) is created to store previously seen numbers and their indices for quick lookup.

### 3. Iterating Through the Array
- The function loops through each element in `nums` using a `for` loop.
- For each element (`nums[i]`):
  - It calculates the `complement` (the number needed to reach the target):
    ```javascript
    const complement = target - nums[i];
    ```

### 4. Checking for the Complement
- The function checks if the `complement` exists in the map:
  - If it does, it means a previous number plus the current number equals the target.
  - The indices are returned as an array: `[map.get(complement), i]`.

### 5. Storing the Current Number
- If the complement is not found, the current number and its index are stored in the map:
  ```javascript
  map.set(nums[i], i);
  ```

### 6. No Solution Case
- If the loop completes without finding a solution, the function returns an empty array (`[]`).

## Example
```javascript
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // Output: [0, 1]
```
- `nums[0] + nums[1] = 2 + 7 = 9`, which matches the target.

## Time and Space Complexity
- **Time Complexity:** O(n), where n is the length of `nums`. Each element is processed once.
- **Space Complexity:** O(n), due to the extra space used by the map.

## Why Use a Hash Map?
- The hash map allows for constant-time lookups, making the solution efficient compared to a brute-force approach.

## Edge Cases
- If no two numbers add up to the target, the function returns an empty array.
- If the input array is empty or has only one element, the function will also return an empty array.

## Summary
This implementation efficiently solves the Two Sum problem using a hash map for quick lookups, ensuring optimal time complexity.
