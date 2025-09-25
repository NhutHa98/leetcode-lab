# Median of Two Sorted Arrays - LeetCode 4

## Overview
Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(min(m,n))). A median is the middle value in an ordered list; if the list has an even number of elements, the median is the average of the two middle values.

## Idea
The main intuition is to use **binary search on partitions**. Instead of merging the arrays, we partition them such that:
1. The left partition contains exactly half of all elements (or one more if total is odd)
2. All elements in the left partition are ≤ all elements in the right partition

If we can find such a partition, the median is determined by the boundary elements. We binary search on the smaller array to find the correct partition point, which ensures O(log(min(m,n))) complexity.

## Step-by-step Walkthrough

### Example 1: nums1 = [1,3], nums2 = [2], total = 3 (odd)

1. **Setup**: Ensure nums1 is smaller → nums1=[1,3], nums2=[2]
2. **Binary search on nums1**: left=0, right=2
3. **Iteration 1**: 
   - i = (0+2)/2 = 1 (partition nums1 after index 0)
   - j = (3+1)/2 - 1 = 1 (partition nums2 after index 0)  
   - Left: [1] and [2], Right: [3] and []
   - Check: maxLeft=max(1,2)=2, minRight=min(3,∞)=3
   - Valid partition: 2 ≤ 3 ✓
   - Since total is odd, median = maxLeft = 2

### Example 2: nums1 = [1,2], nums2 = [3,4], total = 4 (even)

1. **Setup**: Both same size, use nums1=[1,2], nums2=[3,4]
2. **Binary search**: left=0, right=2
3. **Iteration 1**:
   - i = 1, j = (4+1)/2 - 1 = 1
   - Left: [1] and [3], Right: [2] and [4]
   - maxLeft=max(1,3)=3, minRight=min(2,4)=2
   - Invalid: 3 > 2, so move i left (right = i-1 = 0)
4. **Iteration 2**:
   - i = 0, j = 2
   - Left: [] and [3,4], Right: [1,2] and []
   - maxLeft=4, minRight=1
   - Invalid: 4 > 1, so move i right (left = i+1 = 1)
5. **Iteration 3**:
   - i = 1, j = 1  
   - Left: [1] and [3], Right: [2] and [4]
   - This leads to same invalid state, continue binary search...
6. **Final partition**: i = 2, j = 0
   - Left: [1,2] and [], Right: [] and [3,4]
   - maxLeft=2, minRight=3, median = (2+3)/2 = 2.5

## Algorithm
**Binary Search on Partitions**
- Ensure nums1 is the smaller array for efficiency
- Binary search for partition point i in nums1
- Calculate corresponding partition point j in nums2
- Validate partition: maxLeft ≤ minRight for both arrays
- If invalid, adjust binary search bounds based on which constraint is violated
- Return median based on parity of total length

## Complexity Analysis
- **Time Complexity**: O(log(min(m,n))), where m and n are lengths of the arrays. Binary search on the smaller array.
- **Space Complexity**: O(1), only using constant extra space for variables.

## Alternative Solutions

### Solution 1: Merge and Sort (Brute Force)
```javascript
var findMedianSortedArrays = function(nums1, nums2) {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const n = merged.length;
    
    if (n % 2 === 1) {
        return merged[Math.floor(n / 2)];
    } else {
        return (merged[n / 2 - 1] + merged[n / 2]) / 2;
    }
};
```
**Pros**: Simple to understand and implement
**Cons**: O((m+n)log(m+n)) time complexity, doesn't meet the required efficiency

### Solution 2: Two Pointers Merge
```javascript
var findMedianSortedArrays = function(nums1, nums2) {
    const total = nums1.length + nums2.length;
    const isOdd = total % 2 === 1;
    const target = Math.floor(total / 2);
    
    let i = 0, j = 0, current = 0, prev = 0;
    
    for (let count = 0; count <= target; count++) {
        prev = current;
        if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
            current = nums1[i++];
        } else {
            current = nums2[j++];
        }
    }
    
    return isOdd ? current : (prev + current) / 2;
};
```
**Pros**: O(m+n) time, easier to understand than binary search
**Cons**: Still doesn't meet O(log(min(m,n))) requirement, uses O(1) extra space

## Example Input/Output
```javascript
// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.

// Input: nums1 = [1,2], nums2 = [3,4]  
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

// Input: nums1 = [0,0], nums2 = [0,0]
// Output: 0.00000
// Explanation: merged array = [0,0,0,0] and median is (0 + 0) / 2 = 0.

// Input: nums1 = [], nums2 = [1]
// Output: 1.00000
// Explanation: merged array = [1] and median is 1.

// Input: nums1 = [2], nums2 = []
// Output: 2.00000  
// Explanation: merged array = [2] and median is 2.
```
