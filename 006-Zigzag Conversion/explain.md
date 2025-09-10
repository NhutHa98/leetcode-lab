# Zigzag Conversion

## Algorithm Used
This solution uses a simulation algorithm to mimic the zigzag pattern by iterating through the string and placing each character in the appropriate row. It tracks the current row and direction (down or up) to build the zigzag pattern.

## Time Complexity (Big O)
- **Time Complexity:** O(n), where n is the length of the input string `s`. Each character is visited once and placed into a row.
- **Space Complexity:** O(n), for storing the rows and the result string.

## Explanation
Given a string and a number of rows, the algorithm arranges the characters in a zigzag pattern on the given number of rows, then reads the pattern row by row to create the final string.

### Steps:
1. If `numRows` is 1, return the string as is (no zigzag needed).
2. Create an array of empty strings for each row.
3. Iterate through the string, appending each character to the current row.
4. Change direction when the top or bottom row is reached.
5. Concatenate all rows to get the final result.

### Example
For `s = "PAYPALISHIRING"`, `numRows = 3`, the zigzag pattern is:

P   A   H   N
A P L S I I G
Y   I   R

Reading row by row: "PAHNAPLSIIGYIR"

---
- **Algorithm:** Simulation (Zigzag traversal)
- **Time Complexity:** O(n)
- **Space Complexity:** O(n)
