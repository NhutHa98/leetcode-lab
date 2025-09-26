# Remove Duplicates from Sorted Array - Explanation

## Overview
This problem asks us to remove duplicates from a sorted integer array **in-place** and return the new length. The key constraints are:
- Modify the array in-place (no extra space for another array)
- Maintain the relative order of elements
- Return the length of the array after removing duplicates
- The elements beyond the returned length don't matter

## Idea
The main intuition is to use the **two-pointer technique**. Since the array is already sorted, all duplicate elements will be adjacent to each other. We can use:
- A **slow pointer** (`i`) to track the position where the next unique element should be placed
- A **fast pointer** (`j`) to scan through the array and find unique elements

When we find a unique element (different from the element at the slow pointer), we move it to the next position after the slow pointer and increment the slow pointer.

## Step-by-step Walkthrough

### Example 1: [1, 1, 2]
1. **Initial state**: `i = 0`, `j = 1`
   - Array: `[1, 1, 2]`
   - `nums[i] = 1`, `nums[j] = 1`

2. **j = 1**: `nums[1] === nums[0]` (both are 1), so skip
   - Array remains: `[1, 1, 2]`
   - `i = 0`

3. **j = 2**: `nums[2] !== nums[0]` (2 ≠ 1), found unique element!
   - Increment `i` to 1
   - Set `nums[1] = nums[2] = 2`
   - Array becomes: `[1, 2, 2]`
   - `i = 1`

4. **Return**: `i + 1 = 2` (length of unique elements)
   - Final array: `[1, 2, ...]` (first 2 elements are unique)

### Example 2: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
1. **Initial**: `i = 0`, array: `[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]`

2. **j = 1**: `nums[1] === nums[0]` (0 === 0), skip

3. **j = 2**: `nums[2] !== nums[0]` (1 ≠ 0)
   - `i++` → `i = 1`
   - `nums[1] = 1`
   - Array: `[0, 1, 1, 1, 1, 2, 2, 3, 3, 4]`

4. **j = 3**: `nums[3] === nums[1]` (1 === 1), skip

5. **j = 4**: `nums[4] === nums[1]` (1 === 1), skip

6. **j = 5**: `nums[5] !== nums[1]` (2 ≠ 1)
   - `i++` → `i = 2`
   - `nums[2] = 2`
   - Array: `[0, 1, 2, 1, 1, 2, 2, 3, 3, 4]`

7. Continue this process...
   - Final array: `[0, 1, 2, 3, 4, ...]`
   - Return: `5`

## Algorithm
**Two Pointers Technique**:
- **Slow Pointer** (`i`): Points to the last position of unique elements
- **Fast Pointer** (`j`): Scans through the array to find the next unique element
- When a unique element is found, place it at position `i+1` and increment `i`

This works because the array is sorted, so duplicates are always adjacent.

## Complexity Analysis
- **Time Complexity**: `O(n)` where n is the length of the array
  - We traverse the array exactly once with the fast pointer
- **Space Complexity**: `O(1)`
  - We only use two pointers, no additional data structures

## Alternative Solutions

### Alternative 1: Set-based Approach (Not Optimal)
```javascript
var removeDuplicates = function(nums) {
    const uniqueNums = [...new Set(nums)];
    for (let i = 0; i < uniqueNums.length; i++) {
        nums[i] = uniqueNums[i];
    }
    return uniqueNums.length;
};
```

**Pros**: 
- Simple and readable
- Works with unsorted arrays too

**Cons**:
- Time Complexity: `O(n)` but with higher constant factors
- Space Complexity: `O(n)` - violates the in-place requirement
- Doesn't take advantage of the sorted nature

### Alternative 2: Single Pointer with Counter
```javascript
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    
    let writeIndex = 1;
    
    for (let readIndex = 1; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[readIndex - 1]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
};
```

**Pros**:
- Also `O(n)` time and `O(1)` space
- Slightly different logic - compares with previous element

**Cons**:
- Essentially the same approach with different variable names
- No significant advantage over the two-pointer method

## Example Input/Output

**Input**: `nums = [1, 1, 2]`
**Output**: `2`
**Modified Array**: `[1, 2, _]` (where `_` can be anything)

**Input**: `nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]`
**Output**: `5`
**Modified Array**: `[0, 1, 2, 3, 4, _, _, _, _, _]`

**Input**: `nums = [1]`
**Output**: `1`
**Modified Array**: `[1]`

**Input**: `nums = []`
**Output**: `0`
**Modified Array**: `[]`

The beauty of this solution lies in its simplicity and efficiency - it leverages the sorted property of the input array to achieve optimal time and space complexity while modifying the array in-place as required.