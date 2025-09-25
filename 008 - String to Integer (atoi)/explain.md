# String to Integer (atoi) - LeetCode 8

## Overview
Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function). The function should handle whitespace, optional sign characters, numeric digits, and clamp the result to the 32-bit signed integer range [-2³¹, 2³¹ - 1]. Any characters after the valid integer should be ignored.

## Idea
The main intuition is to **simulate the atoi function step by step**. We process the string character by character in a specific order: skip leading whitespace, handle optional sign, read consecutive digits while checking for overflow. The key insight is that we need to detect overflow before it happens by checking if adding the next digit would exceed the 32-bit integer bounds.

## 2. Step-by-Step Walkthrough

1. **Skip Leading Whitespace:**  
   Start from the beginning of the string and move forward until the first non-space character.

2. **Check for Sign:**  
   If the next character is '+' or '-', record the sign and move to the next character.

3. **Skip Leading Zeros:**  
   Ignore any zeros before the actual digits to avoid unnecessary computation.

4. **Read Digits:**  
   Process consecutive digit characters, building the integer value.

5. **Handle Non-digit Characters:**  
   Stop reading when a non-digit character is encountered.

6. **Clamp to 32-bit Integer Range:**  
   If the result is outside the range [-2^31, 2^31-1], clamp it to the nearest bound.

7. **Return the Result:**  
   Return the final integer value.

## 3. Algorithm Used

- **Two Pointers / Linear Scan:**  
  The solution uses a single pointer to scan through the string, handling each requirement in order.

## 4. Time and Space Complexity

- **Time Complexity:** O(n), where n is the length of the input string. Each character is processed at most once.
- **Space Complexity:** O(1), only a few variables are used for computation.

## 5. Alternative Solutions

### Alternative 1: Regular Expression

**Idea:**  
Use a regular expression to extract the valid integer substring directly, then convert it to a number and clamp as needed.

**Pros:**  
- Concise and readable.
- Handles most edge cases automatically.

**Cons:**  
- May be less efficient for very long strings.
- Regex can be harder to debug for beginners.

**Code:**
```js
var myAtoi = function(s) {
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);
  const match = s.match(/^\s*([+-]?\d+)/);
  if (!match) return 0;
  let num = Number(match[1]);
  if (num < INT_MIN) return INT_MIN;
  if (num > INT_MAX) return INT_MAX;
  return num;
};
```

**Complexity:**  
- Time: O(n) (regex engine scans the string)
- Space: O(1)

### Alternative 2: Manual Parsing with Early Overflow Detection

**Idea:**  
Parse digits one by one, checking for overflow before adding each digit to avoid unnecessary computation.

**Pros:**  
- Handles overflow efficiently.
- Mimics C/C++ behavior closely.

**Cons:**  
- Slightly more complex logic.

**Code:**
```js
var myAtoi = function(s) {
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);
  let i = 0, n = s.length;
  while (i < n && s[i] === ' ') i++;
  let sign = 1;
  if (i < n && (s[i] === '-' || s[i] === '+')) {
    if (s[i] === '-') sign = -1;
    i++;
  }
  let num = 0;
  while (i < n && s[i] >= '0' && s[i] <= '9') {
    let digit = s[i].charCodeAt(0) - '0'.charCodeAt(0);
    // Check for overflow before adding digit
    if (num > Math.floor(INT_MAX / 10) || 
        (num === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }
    num = num * 10 + digit;
    i++;
  }
  return num * sign;
};
```

**Complexity:**  
- Time: O(n)
- Space: O(1)

## 6. Example Input/Output Walkthrough

**Example 1:**  
Input: `"   -42"`  
- Skip spaces → `"-42"`
- Sign: `-`
- Digits: `42`
- Output: `-42`

**Example 2:**  
Input: `"4193 with words"`  
- Skip spaces → `"4193 with words"`
- Sign: `+` (default)
- Digits: `4193`
- Stop at non-digit
- Output: `4193`

**Example 3:**  
Input: `"words and 987"`  
- Skip spaces → `"words and 987"`
- First char is not digit/sign
- Output: `0`

**Example 4:**  
Input: `"-91283472332"`  
- Sign: `-`
- Digits: `91283472332`
- Clamp to INT_MIN: `-2147483648`

---

This explanation covers the intuition, step-by-step logic, algorithm, complexity, alternatives, and example walkthroughs for the "String to Integer (atoi)" problem.
