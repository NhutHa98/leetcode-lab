# LeetCode 9: Palindrome Number

## Problem Statement

Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise. An integer is a palindrome when it reads the same backward as forward.

---

## 1. Idea

A palindrome number reads the same forwards and backwards (e.g., 121, 1331). The core idea is to check if the digits of the number are symmetric. There are two main approaches:

- **String Conversion:** Convert the number to a string and check if the string is the same when reversed.
- **Mathematical Reversal:** Reverse the digits mathematically (without converting to a string) and compare with the original.

---

## 2. Step-by-Step Walkthrough

### **Solution 1: String Conversion**

1. **Negative Check:** If `x` is negative, return `false` (negative numbers can't be palindromes due to the minus sign).
2. **Convert to String:** Turn the number into a string.
3. **Reverse String:** Reverse the string.
4. **Compare:** Check if the original string equals the reversed string.

### **Solution 2: Mathematical Reversal (Optimized)**

1. **Negative or Trailing Zero Check:** If `x` is negative or ends with 0 (but is not 0), return `false`.
2. **Reverse Half the Digits:**
   - Initialize `reversed = 0`.
   - While `x > reversed`:
     - Pop the last digit from `x` and append it to `reversed`.
     - Remove the last digit from `x`.
3. **Compare:** For even digit numbers, `x` should equal `reversed`. For odd digits, ignore the middle digit by dividing `reversed` by 10.

---

## 3. Algorithm Used

- **Solution 1:** String manipulation (convert, reverse, compare).
- **Solution 2:** Mathematical digit reversal (no extra space, only integer operations).

---

## 4. Time and Space Complexity

| Solution         | Time Complexity | Space Complexity |
|------------------|----------------|-----------------|
| String Conversion| O(n)           | O(n)            |
| Math Reversal    | O(log₁₀ n)     | O(1)            |

- `n` = number of digits in `x`.

---

## 5. Alternative Solutions

### **A. Two-Pointer String Comparison**

- Convert the number to a string.
- Use two pointers (start and end) to compare digits moving towards the center.
- **Pros:** Easy to understand, no need to reverse the string.
- **Cons:** Still uses O(n) space for the string.

### **B. Full Number Reversal**

- Reverse the entire number mathematically and compare with the original.
- **Pros:** No string conversion.
- **Cons:** Risk of integer overflow for very large numbers (not an issue in JavaScript, but can be in other languages).

---

## 6. Example Input/Output Walkthrough

### Example 1

**Input:** `x = 121`

- String: `"121"` → reversed: `"121"` → equal → **true**
- Math: 121 → reversed half: 12, x: 1 → compare 1 == 1 → **true**

### Example 2

**Input:** `x = -121`

- Negative number → **false**

### Example 3

**Input:** `x = 10`

- String: `"10"` → reversed: `"01"` → not equal → **false**
- Math: 10 ends with 0 (but not 0) → **false**

---

## 7. Code (from `code.js`)

```javascript
// String conversion approach
var isPalindrome = function (x) {
  if (x < 0) return false;
  let str = x.toString();
  let reversed = str.split("").reverse().join("");
  return str === reversed;
};

// Math reversal approach
var isPalindromeMath = function (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reversed = 0;
  while (x > reversed) {
    reversed = reversed * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === reversed || x === Math.floor(reversed / 10);
};
```

---

# Two More Solutions

---

## Solution 3: Two-Pointer String Comparison

### **Idea**

Instead of reversing the string, use two pointers to compare digits from both ends, moving towards the center.

### **Step-by-Step**

1. If `x < 0`, return `false`.
2. Convert `x` to a string.
3. Set two pointers: `left = 0`, `right = str.length - 1`.
4. While `left < right`:
   - If `str[left] !== str[right]`, return `false`.
   - Move `left++`, `right--`.
5. If all pairs match, return `true`.

### **Algorithm**

- Two-pointer technique.

### **Complexity**

- **Time:** O(n)
- **Space:** O(n) (for the string)

### **Example**

- `x = 1221` → compare '1' and '1', '2' and '2' → all match → **true**

### **Code**

```javascript
var isPalindromeTwoPointer = function(x) {
  if (x < 0) return false;
  let str = x.toString();
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
};
```

---

## Solution 4: Full Number Reversal (No String)

### **Idea**

Reverse the entire number mathematically and compare with the original.

### **Step-by-Step**

1. If `x < 0`, return `false`.
2. Store the original value of `x`.
3. Initialize `reversed = 0`.
4. While `x > 0`:
   - `reversed = reversed * 10 + (x % 10)`
   - `x = Math.floor(x / 10)`
5. Compare `reversed` with the original value.

### **Algorithm**

- Mathematical reversal of the whole number.

### **Complexity**

- **Time:** O(log₁₀ n)
- **Space:** O(1)

### **Example**

- `x = 12321` → reversed: 12321 → equal → **true**

### **Code**

```javascript
var isPalindromeFullReverse = function(x) {
  if (x < 0) return false;
  let original = x;
  let reversed = 0;
  while (x > 0) {
    reversed = reversed * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return original === reversed;
};
```

---

## Summary Table

| Solution Name         | Time      | Space | String Conversion | Two Pointers | Math Only | Handles Overflow |
|---------------------- |-----------|-------|------------------|--------------|-----------|------------------|
| String Reverse        | O(n)      | O(n)  | Yes              | No           | No        | Yes              |
| Math Half Reverse     | O(log n)  | O(1)  | No               | No           | Yes       | Yes              |
| Two-Pointer String    | O(n)      | O(n)  | Yes              | Yes          | No        | Yes              |
| Full Number Reverse   | O(log n)  | O(1)  | No               | No           | Yes       | No (in some langs)|

---