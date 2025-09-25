# Longest Palindromic Substring - LeetCode 5

## Overview
Given a string `s`, return the longest palindromic substring in `s`. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward. The goal is to find the longest contiguous substring that maintains this property.

## Idea
The main intuition is to use the **expand around center** approach. For each possible center in the string, we expand outward as long as the characters match. We consider both odd-length palindromes (single character center) and even-length palindromes (two character center). This approach leverages the symmetric nature of palindromes - if we know a substring is a palindrome, we can check if extending it by one character on each side still maintains the palindrome property.

## Step-by-step Walkthrough

### Example 1: s = "babad"

1. **Initialize**: start=0, maxLen=0
2. **Center at index 0 ('b')**:
   - Odd: expand around 'b' → no expansion possible → length=1
   - Even: expand around 'b','a' → not equal → length=0
3. **Center at index 1 ('a')**:
   - Odd: expand 'a' → then 'bab' → length=3, update start=0, maxLen=3
   - Even: expand around 'a','b' → not equal → length=0
4. **Center at index 2 ('b')**:
   - Odd: expand 'b' → then 'aba' → length=3 (same as current max)
   - Even: expand around 'b','a' → not equal → length=0
5. **Continue for remaining centers...**
6. **Result**: "bab" or "aba" (length 3)

### Example 2: s = "cbbd"

1. **Initialize**: start=0, maxLen=0
2. **Center at index 0 ('c')**: length=1
3. **Center at index 1 ('b')**: length=1
4. **Center at index 2 ('b')**:
   - Odd: expand 'b' → length=1
   - Even: expand around 'b','b' → then 'bb' → length=2, update start=1, maxLen=2
5. **Center at index 3 ('d')**: length=1
6. **Result**: "bb" (length 2)

## Algorithm
**Expand Around Center Algorithm**
- For each possible center position (both single character and between characters)
- Expand outward while characters match
- Track the longest palindrome found
- Handle both odd-length (single center) and even-length (dual center) cases

## Complexity Analysis
- **Time Complexity**: O(n²), where n is the length of the string. For each center (n positions), we may expand up to n times in the worst case.
- **Space Complexity**: O(1), only using a constant amount of extra space for variables.

## Alternative Solutions

### Solution 1: Dynamic Programming
```javascript
var longestPalindrome = function(s) {
    const n = s.length;
    const dp = Array(n).fill(null).map(() => Array(n).fill(false));
    let start = 0, maxLen = 1;
    
    // Single characters are palindromes
    for (let i = 0; i < n; i++) dp[i][i] = true;
    
    // Check for 2-character palindromes
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLen = 2;
        }
    }
    
    // Check for palindromes of length 3+
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                start = i;
                maxLen = len;
            }
        }
    }
    
    return s.substring(start, start + maxLen);
};
```
**Pros**: Clear logic, systematic approach
**Cons**: O(n²) space complexity, less efficient memory usage

### Solution 2: Manacher's Algorithm
```javascript
var longestPalindrome = function(s) {
    // Preprocess: insert '#' between characters
    let processed = '#';
    for (let char of s) processed += char + '#';
    
    const n = processed.length;
    const P = new Array(n).fill(0); // lengths of palindromes
    let center = 0, right = 0;
    let maxLen = 0, centerIndex = 0;
    
    for (let i = 0; i < n; i++) {
        const mirror = 2 * center - i;
        
        if (i < right) P[i] = Math.min(right - i, P[mirror]);
        
        // Try to expand around i
        while (i + P[i] + 1 < n && i - P[i] - 1 >= 0 && 
               processed[i + P[i] + 1] === processed[i - P[i] - 1]) {
            P[i]++;
        }
        
        // Update center and right
        if (i + P[i] > right) {
            center = i;
            right = i + P[i];
        }
        
        // Update answer
        if (P[i] > maxLen) {
            maxLen = P[i];
            centerIndex = i;
        }
    }
    
    const start = (centerIndex - maxLen) / 2;
    return s.substring(start, start + maxLen);
};
```
**Pros**: O(n) time complexity, optimal for very large strings
**Cons**: More complex implementation, harder to understand

## Example Input/Output
```javascript
// Input: s = "babad"
// Output: "bab" (or "aba")
// Explanation: Both "bab" and "aba" are valid answers.

// Input: s = "cbbd"
// Output: "bb"
// Explanation: The longest palindromic substring is "bb".

// Input: s = "a"
// Output: "a"
// Explanation: Single character is always a palindrome.

// Input: s = "ac"
// Output: "a" (or "c")
// Explanation: Both single characters are palindromes of length 1.

// Input: s = "raceacar"
// Output: "racecar"
// Explanation: The entire substring "racecar" is a palindrome.
```
