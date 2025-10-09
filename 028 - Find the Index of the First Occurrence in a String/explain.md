# 028 - Find the Index of the First Occurrence in a String

## Overview
This problem asks us to find the first occurrence of a substring (`needle`) within a larger string (`haystack`). If the needle is found, we return the starting index of the first occurrence. If not found, we return -1. This is essentially implementing the functionality of the `indexOf()` method from scratch.

**Tags**: String, Two Pointers, String Matching

## Idea
The main approach is to iterate through the haystack string and at each position, check if the needle string starts at that position. We can use built-in string methods like `indexOf()` for the most efficient solution, or implement our own logic using substring matching.

## Step-by-step Walkthrough

### Primary Solution (Using indexOf)
```javascript
var strStr = function (haystack, needle) {
  return haystack.indexOf(needle);
};
```

1. Use JavaScript's built-in `indexOf()` method
2. This method returns the index of the first occurrence of the substring
3. If not found, it automatically returns -1

### Example Walkthrough 1:
- **Input**: haystack = "sadbutsad", needle = "sad"
- **Process**: 
  - `indexOf("sad")` searches for "sad" in "sadbutsad"
  - Finds "sad" at index 0
- **Output**: 0

### Example Walkthrough 2:
- **Input**: haystack = "leetcode", needle = "leeto"
- **Process**: 
  - `indexOf("leeto")` searches for "leeto" in "leetcode"
  - "leeto" is not found in "leetcode"
- **Output**: -1

## Algorithm
**String Matching with Built-in Method**: Leverages the optimized implementation of `indexOf()` which typically uses efficient string matching algorithms internally (like Boyer-Moore or similar).

## Complexity Analysis
- **Time Complexity**: O(n) - where n is the length of haystack. Modern implementations of indexOf() are highly optimized.
- **Space Complexity**: O(1) - no additional space required beyond input.

## Alternative Solutions

### Alternative 1: Manual Substring Matching
```javascript
var strStrAlternative = function (haystack, needle) {
  if (needle === "") return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.substring(i, i + needle.length) === needle) {
      return i;
    }
  }
  return -1;
};
```

**Idea**: Manually iterate through each possible starting position in haystack and check if needle matches at that position.

**Algorithm**: Brute Force String Matching
- **Time Complexity**: O(n*m) - where n is haystack length and m is needle length
- **Space Complexity**: O(m) - due to substring creation
- **Pros**: Easy to understand and implement
- **Cons**: Less efficient than built-in methods, creates temporary substrings

### Alternative 2: Character-by-Character Comparison
```javascript
var strStrOptimized = function (haystack, needle) {
  if (needle === "") return 0;
  
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0;
    // Check character by character
    while (j < needle.length && haystack[i + j] === needle[j]) {
      j++;
    }
    // If we matched the entire needle
    if (j === needle.length) {
      return i;
    }
  }
  return -1;
};
```

**Idea**: Compare characters one by one without creating substrings, stopping early when characters don't match.

**Algorithm**: Optimized Brute Force
- **Time Complexity**: O(n*m) worst case, but often better in practice due to early termination
- **Space Complexity**: O(1) - no extra space for substrings
- **Pros**: More memory efficient than substring approach, early termination optimization
- **Cons**: Still potentially O(n*m) in worst case scenarios

### Alternative 3: KMP Algorithm (Advanced)
```javascript
var strStrKMP = function (haystack, needle) {
  if (needle === "") return 0;
  
  // Build failure function (LPS array)
  const buildLPS = (pattern) => {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < pattern.length) {
      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        i++;
      } else {
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }
    return lps;
  };
  
  const lps = buildLPS(needle);
  let i = 0; // haystack index
  let j = 0; // needle index
  
  while (i < haystack.length) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
    }
    
    if (j === needle.length) {
      return i - j;
    } else if (i < haystack.length && haystack[i] !== needle[j]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return -1;
};
```

**Idea**: Use the Knuth-Morris-Pratt algorithm which preprocesses the needle to avoid unnecessary comparisons.

**Algorithm**: KMP String Matching
- **Time Complexity**: O(n + m) - linear time complexity
- **Space Complexity**: O(m) - for the LPS (Longest Proper Prefix Suffix) array
- **Pros**: Optimal time complexity, no backtracking in haystack
- **Cons**: More complex to implement and understand, requires preprocessing

## Example Input/Output

**Example 1:**
- Input: haystack = "sadbutsad", needle = "sad"
- Output: 0
- Explanation: "sad" occurs at index 0 and 6. The first occurrence is at index 0.

**Example 2:**
- Input: haystack = "leetcode", needle = "leeto"
- Output: -1
- Explanation: "leeto" did not occur in "leetcode".

**Example 3:**
- Input: haystack = "hello", needle = ""
- Output: 0
- Explanation: Empty string is considered to occur at index 0.