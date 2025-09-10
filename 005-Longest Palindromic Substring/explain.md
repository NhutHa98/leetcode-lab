# Explanation: Longest Palindromic Substring

## Algorithm Used
This code uses the **Expand Around Center** approach to find the longest palindromic substring in a given string `s`.

For each character in the string, it considers two cases:
- **Odd-length palindrome:** Expands around a single character as the center.
- **Even-length palindrome:** Expands around two adjacent characters as the center.

For both cases, it expands outward as long as the characters on both sides are equal, updating the maximum length and starting index when a longer palindrome is found.

## Time and Space Complexity
- **Time Complexity:** O(n^2)
  - For each character (n), the code may expand up to n times in the worst case.
- **Space Complexity:** O(1)
  - Only a few variables are used for tracking indices and lengths.

## Alternative Solution: Dynamic Programming
A common alternative is the **Dynamic Programming** approach:
- Create a 2D boolean table `dp[i][j]` indicating if substring `s[i..j]` is a palindrome.
- Fill the table for substrings of length 1 and 2, then expand for longer substrings.
- Update the longest palindrome found during the process.

**Time Complexity:** O(n^2)
**Space Complexity:** O(n^2)

## Alternative Solution: Manacher's Algorithm
For optimal performance, **Manacher's Algorithm** finds the longest palindromic substring in O(n) time and O(n) space. It uses clever preprocessing and symmetry properties to avoid redundant checks.

---
**Summary:**
- The current code is simple and efficient for most cases, using the expand-around-center method.
- For very large strings, Manacher's algorithm is recommended for linear time performance.
