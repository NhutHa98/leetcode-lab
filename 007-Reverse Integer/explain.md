# Reverse Integer - Explanation

## 1. Idea
The goal is to reverse the digits of a given 32-bit signed integer. If the reversed integer overflows (i.e., goes beyond the range [-2^31, 2^31 - 1]), we return 0. The intuition is to extract digits one by one from the original number and build the reversed number, while checking for overflow at each step.

## 2. Step-by-Step Walkthrough
1. **Initialize** a variable `rev` to 0 to store the reversed number.
2. **Iterate** while the input `x` is not zero:
    - Extract the last digit using `pop = x % 10` (for negative numbers, this works as well).
    - Remove the last digit from `x` using integer division: `x = Math.trunc(x / 10)`.
    - Before appending the digit to `rev`, check if `rev` will overflow after the operation.
    - If safe, update `rev = rev * 10 + pop`.
3. **Return** `rev` if it is within the 32-bit signed integer range; otherwise, return 0.

## 3. Algorithm Used
- **Mathematical digit extraction and construction**: This is a classic approach for reversing digits, often used in problems involving integer manipulation.
- **Overflow check**: Before multiplying and adding, we check if the result will overflow using the maximum and minimum integer limits.

## 4. Time and Space Complexity
- **Time Complexity:** O(log₁₀N), where N is the input integer. Each iteration removes one digit, so the number of iterations is proportional to the number of digits.
- **Space Complexity:** O(1), since only a constant amount of extra space is used.

## 5. Alternative Solutions
- **String Conversion:** Convert the integer to a string, reverse the string, and convert back to an integer. This is simpler but less efficient and may not handle negative numbers or overflow as cleanly.
    - *Pros:* Easy to implement, fewer lines of code.
    - *Cons:* Uses extra space for the string, less control over overflow, and not as efficient for very large numbers.
- **Using Arrays:** Store digits in an array, reverse the array, and reconstruct the number. Similar pros/cons to string conversion.
- **Bit Manipulation:** Not applicable here since digits are not binary bits.

## 6. Example Walkthrough
### Example 1
**Input:** x = 123
- rev = 0
- pop = 3, x = 12, rev = 0 * 10 + 3 = 3
- pop = 2, x = 1, rev = 3 * 10 + 2 = 32
- pop = 1, x = 0, rev = 32 * 10 + 1 = 321
**Output:** 321

### Example 2
**Input:** x = -120
- rev = 0
- pop = 0, x = -12, rev = 0 * 10 + 0 = 0
- pop = -2, x = -1, rev = 0 * 10 + (-2) = -2
- pop = -1, x = 0, rev = -2 * 10 + (-1) = -21
**Output:** -21

### Example 3 (Overflow)
**Input:** x = 1534236469
- As digits are reversed, the result exceeds 2^31 - 1 (2147483647), so the function returns 0.

---
This approach is efficient, handles edge cases, and is the recommended solution for reversing integers with overflow protection.
