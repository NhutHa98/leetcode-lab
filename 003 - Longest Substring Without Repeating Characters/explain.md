# Longest Substring Without Repeating Characters - LeetCode 3

## Overview
Given a string `s`, find the length of the longest substring without repeating characters. A substring is a contiguous sequence of characters within a string. The goal is to find the maximum length of such a substring where all characters are unique.

## Idea
The main intuition is to use the **sliding window technique** with two pointers. We maintain a window [start, end] that contains no repeating characters. As we expand the window by moving the `end` pointer, if we encounter a character that's already in the current window, we shrink the window from the left by moving the `start` pointer past the previous occurrence of that character. A hash map tracks the most recent index of each character to enable quick lookups and window adjustments.

## Step-by-step Walkthrough

### Example 1: s = "abcabcbb"

1. **Initialize**: start=0, maxLength=0, charIndexMap={}
2. **end=0, char='a'**: Not in map → add {'a': 0}, maxLength=1
3. **end=1, char='b'**: Not in map → add {'b': 1}, maxLength=2  
4. **end=2, char='c'**: Not in map → add {'c': 2}, maxLength=3
5. **end=3, char='a'**: Found at index 0, within window → move start=1, update {'a': 3}, maxLength=3
6. **end=4, char='b'**: Found at index 1, within window → move start=2, update {'b': 4}, maxLength=3
7. **end=5, char='c'**: Found at index 2, within window → move start=3, update {'c': 5}, maxLength=3
8. **end=6, char='b'**: Found at index 4, within window → move start=5, update {'b': 6}, maxLength=2
9. **end=7, char='b'**: Found at index 6, within window → move start=7, update {'b': 7}, maxLength=1
10. **Result**: maxLength=3 (substring "abc")

### Example 2: s = "pwwkew"

1. **Initialize**: start=0, maxLength=0, charIndexMap={}
2. **end=0, char='p'**: Not in map → add {'p': 0}, maxLength=1
3. **end=1, char='w'**: Not in map → add {'w': 1}, maxLength=2
4. **end=2, char='w'**: Found at index 1, within window → move start=2, update {'w': 2}, maxLength=2
5. **end=3, char='k'**: Not in map → add {'k': 3}, maxLength=2
6. **end=4, char='e'**: Not in map → add {'e': 4}, maxLength=3
7. **end=5, char='w'**: Found at index 2, within window → move start=3, update {'w': 5}, maxLength=3
8. **Result**: maxLength=3 (substring "wke")

## Algorithm
**Sliding Window with Hash Map**
- Two pointers (start, end) define the current window
- Hash map stores the most recent index of each character
- Expand window by moving end pointer
- When duplicate found, contract window by moving start pointer
- Track maximum window size encountered

## Complexity Analysis
- **Time Complexity**: O(n), where n is the length of the string. Each character is visited at most twice (once by end pointer, once by start pointer).
- **Space Complexity**: O(min(m, n)), where m is the size of the character set and n is the length of the string. The hash map stores at most min(m, n) characters.

## Alternative Solutions

### Solution 1: Sliding Window with Set
```javascript
var lengthOfLongestSubstring = function(s) {
    let start = 0, maxLength = 0;
    const charSet = new Set();
    
    for (let end = 0; end < s.length; end++) {
        while (charSet.has(s[end])) {
            charSet.delete(s[start]);
            start++;
        }
        charSet.add(s[end]);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
};
```
**Pros**: Simpler logic, easier to understand
**Cons**: Potentially slower due to while loop for finding duplicates, O(n²) worst case

### Solution 2: Brute Force (Check All Substrings)
```javascript
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    
    for (let i = 0; i < s.length; i++) {
        const seen = new Set();
        for (let j = i; j < s.length; j++) {
            if (seen.has(s[j])) break;
            seen.add(s[j]);
            maxLength = Math.max(maxLength, j - i + 1);
        }
    }
    return maxLength;
};
```
**Pros**: Simple and intuitive approach
**Cons**: O(n²) time complexity, inefficient for large inputs

## Example Input/Output
```javascript
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with length 3.

// Input: s = "bbbbb" 
// Output: 1
// Explanation: The answer is "b", with length 1.

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with length 3.

// Input: s = ""
// Output: 0
// Explanation: Empty string has no characters.

// Input: s = "dvdf"
// Output: 3
// Explanation: The answer is "vdf", with length 3.
```
