# Remove Element - LeetCode Problem 27

## Overview
The "Remove Element" problem asks us to remove all instances of a given value from an array **in-place** and return the new length of the array after removal. The key constraint is that we must modify the original array without using extra space for another array, and the order of remaining elements can be changed.

## Idea
The main intuition behind this solution is to use the **two-pointer technique**:
- Use one pointer (`i`) to iterate through the entire array
- Use another pointer (`k`) to track the position where we should place the next valid element (elements that are not equal to `val`)
- When we find an element that should be kept, we place it at position `k` and increment `k`
- At the end, `k` represents the length of the array after removing all instances of `val`

This approach works because we're essentially compacting the array by moving all valid elements to the beginning, overwriting the elements we want to remove.

## Step-by-step Walkthrough

### Example 1: `nums = [3, 2, 2, 3], val = 3`

1. **Initialize**: `k = 0` (points to where next valid element should go)
2. **i = 0**: `nums[0] = 3`, equals `val`, so skip (don't increment `k`)
3. **i = 1**: `nums[1] = 2`, not equal to `val`
   - Set `nums[k] = nums[1]` → `nums[0] = 2`
   - Increment `k` to 1
   - Array becomes: `[2, 2, 2, 3]`
4. **i = 2**: `nums[2] = 2`, not equal to `val`
   - Set `nums[k] = nums[2]` → `nums[1] = 2`
   - Increment `k` to 2
   - Array becomes: `[2, 2, 2, 3]`
5. **i = 3**: `nums[3] = 3`, equals `val`, so skip
6. **Return**: `k = 2`, final array: `[2, 2, ?, ?]` (first 2 elements are valid)

### Example 2: `nums = [0, 1, 2, 2, 3, 0, 4, 2], val = 2`

1. **Initialize**: `k = 0`
2. **i = 0**: `nums[0] = 0` ≠ `val` → `nums[0] = 0`, `k = 1`
3. **i = 1**: `nums[1] = 1` ≠ `val` → `nums[1] = 1`, `k = 2`
4. **i = 2**: `nums[2] = 2` = `val` → skip
5. **i = 3**: `nums[3] = 2` = `val` → skip
6. **i = 4**: `nums[4] = 3` ≠ `val` → `nums[2] = 3`, `k = 3`
7. **i = 5**: `nums[5] = 0` ≠ `val` → `nums[3] = 0`, `k = 4`
8. **i = 6**: `nums[6] = 4` ≠ `val` → `nums[4] = 4`, `k = 5`
9. **i = 7**: `nums[7] = 2` = `val` → skip
10. **Return**: `k = 5`, final array: `[0, 1, 3, 0, 4, ?, ?, ?]`

## Algorithm
This solution uses the **Two Pointers** technique:
- **Read pointer** (`i`): Scans through the entire array
- **Write pointer** (`k`): Tracks the position for the next valid element

The algorithm maintains the invariant that all elements from index 0 to `k-1` are valid (not equal to `val`).

## Complexity Analysis
- **Time Complexity**: O(n), where n is the length of the array. We iterate through the array exactly once.
- **Space Complexity**: O(1), as we only use a constant amount of extra space (the variables `k` and `i`).

## Alternative Solutions

### Solution 2: Two Pointers from Both Ends
```javascript
var removeElement = function(nums, val) {
    let i = 0;
    let n = nums.length;
    
    while (i < n) {
        if (nums[i] === val) {
            nums[i] = nums[n - 1];
            n--;
        } else {
            i++;
        }
    }
    return n;
};
```

**Explanation**: This approach uses two pointers starting from opposite ends:
- When we find an element equal to `val`, we replace it with the last element and reduce the array size
- This can be more efficient when there are many elements to remove, as we avoid unnecessary copying

**Pros**: 
- Fewer write operations when many elements need to be removed
- Can be faster in practice for arrays with many target values

**Cons**: 
- Changes the relative order of elements more significantly
- Slightly more complex logic

### Solution 3: Filter-like Approach (Conceptual)
```javascript
var removeElement = function(nums, val) {
    let writeIndex = 0;
    
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== val) {
            if (writeIndex !== readIndex) {
                nums[writeIndex] = nums[readIndex];
            }
            writeIndex++;
        }
    }
    return writeIndex;
};
```

**Explanation**: This is a slight optimization of the main solution that avoids unnecessary assignments when the write and read indices are the same.

**Pros**: 
- Avoids redundant assignments
- Maintains relative order of remaining elements
- Clear separation between read and write operations

**Cons**: 
- Slightly more complex with the additional condition check
- Minimal performance gain in most cases

## Example Input/Output

### Example 1:
**Input**: `nums = [3, 2, 2, 3]`, `val = 3`
**Output**: `2`
**Explanation**: The function returns 2, and the first 2 elements of nums are [2, 2]. The remaining elements can be anything.

### Example 2:
**Input**: `nums = [0, 1, 2, 2, 3, 0, 4, 2]`, `val = 2`
**Output**: `5`
**Explanation**: The function returns 5, and the first 5 elements of nums are [0, 1, 3, 0, 4]. The order can vary, but these 5 elements should be present.

### Example 3:
**Input**: `nums = [1]`, `val = 1`
**Output**: `0`
**Explanation**: All elements are removed, so the new length is 0.

### Example 4:
**Input**: `nums = [4, 5]`, `val = 3`
**Output**: `2`
**Explanation**: No elements match the target value, so the array remains unchanged with length 2.