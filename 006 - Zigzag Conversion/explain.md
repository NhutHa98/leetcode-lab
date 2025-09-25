# Zigzag Conversion - LeetCode 6

## Overview
Given a string `s` and an integer `numRows`, convert the string into a zigzag pattern on the given number of rows and then read line by line to produce the final string. The zigzag pattern simulates writing the string in a "Z" shape across multiple rows, then reading each row from left to right.

## Idea
The main intuition is to **simulate the zigzag writing process**. Instead of actually creating a 2D grid, we can use an array of strings (one per row) and track our current position and direction. As we traverse the input string character by character, we place each character in the appropriate row. When we reach the top (row 0) or bottom (row numRows-1), we change direction. This approach captures the essence of the zigzag pattern without needing complex coordinate calculations.

## Step-by-step Walkthrough

### Example 1: s = "PAYPALISHIRING", numRows = 3

1. **Initialize**: 3 empty rows: ["", "", ""], currentRow = 0, goingDown = false
2. **P** (index 0): Add to row 0 → ["P", "", ""], currentRow = 1, goingDown = true
3. **A** (index 1): Add to row 1 → ["P", "A", ""], currentRow = 2, goingDown = true  
4. **Y** (index 2): Add to row 2 → ["P", "A", "Y"], currentRow = 1, goingDown = false (hit bottom)
5. **P** (index 3): Add to row 1 → ["P", "AP", "Y"], currentRow = 0, goingDown = false
6. **A** (index 4): Add to row 0 → ["PA", "AP", "Y"], currentRow = 1, goingDown = true (hit top)
7. **L** (index 5): Add to row 1 → ["PA", "APL", "Y"], currentRow = 2, goingDown = true
8. **Continue pattern...**
9. **Final rows**: ["PAHN", "APLSIIG", "YIR"]
10. **Result**: "PAHN" + "APLSIIG" + "YIR" = "PAHNAPLSIIGYIR"

### Example 2: s = "PAYPALISHIRING", numRows = 4

1. **Zigzag pattern visualized**:
```
P     I    N
A   L S  I G
Y A   H R
P     I
```
2. **Rows**: ["PIN", "ALSIG", "YAHR", "PI"]
3. **Result**: "PINALSIGYAHRPI"

## Algorithm
**Simulation with Direction Tracking**
- Create array of empty strings (one per row)
- Use currentRow pointer and goingDown boolean flag
- For each character: add to current row, then move to next row
- Change direction when reaching top (row 0) or bottom (row numRows-1)
- Concatenate all rows for final result

## Complexity Analysis
- **Time Complexity**: O(n), where n is the length of the input string. Each character is processed exactly once.
- **Space Complexity**: O(n) for storing the rows and the final result string. The space is proportional to the input size.

## Alternative Solutions

### Solution 1: Mathematical Formula (Direct Access)
```javascript
var convert = function(s, numRows) {
    if (numRows === 1) return s;
    
    let result = '';
    const cycleLen = 2 * numRows - 2;
    
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j + i < s.length; j += cycleLen) {
            result += s[j + i];
            if (i !== 0 && i !== numRows - 1 && j + cycleLen - i < s.length) {
                result += s[j + cycleLen - i];
            }
        }
    }
    return result;
};
```
**Pros**: No extra space for intermediate storage, direct calculation
**Cons**: Complex formula, harder to understand and debug

### Solution 2: 2D Matrix Simulation
```javascript
var convert = function(s, numRows) {
    if (numRows === 1) return s;
    
    const matrix = [];
    let row = 0, col = 0, goingDown = true;
    
    for (let char of s) {
        if (!matrix[row]) matrix[row] = [];
        matrix[row][col] = char;
        
        if (goingDown) {
            if (row === numRows - 1) {
                goingDown = false;
                row--;
                col++;
            } else {
                row++;
            }
        } else {
            if (row === 0) {
                goingDown = true;
                row++;
            } else {
                row--;
                col++;
            }
        }
    }
    
    // Read row by row
    let result = '';
    for (let i = 0; i < numRows; i++) {
        if (matrix[i]) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j]) result += matrix[i][j];
            }
        }
    }
    return result;
};
```
**Pros**: Very intuitive, mirrors the actual zigzag pattern visually
**Cons**: Uses more memory due to sparse 2D matrix, more complex indexing

## Example Input/Output
```javascript
// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"
// Explanation: 
// P   A   H   N
// A P L S I I G  
// Y   I   R

// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:
// P     I    N
// A   L S  I G
// Y A   H R
// P     I

// Input: s = "A", numRows = 1
// Output: "A"
// Explanation: Single character with one row

// Input: s = "ABC", numRows = 1  
// Output: "ABC"
// Explanation: When numRows = 1, no zigzag conversion needed
```
