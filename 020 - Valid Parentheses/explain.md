# Valid Parentheses - Solution Explanation

## Problem Overview
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Main Solution

### Idea
The main intuition behind this approach is to use a **stack** data structure to keep track of opening brackets. When we encounter an opening bracket, we push it onto the stack. When we encounter a closing bracket, we check if it matches the most recent opening bracket (top of the stack). If they match, we pop the opening bracket; if they don't match or the stack is empty, the string is invalid.

This works because parentheses must be closed in the correct order - the last opened bracket must be the first to be closed (Last In, First Out - LIFO), which is exactly what a stack provides.

### Step-by-step Walkthrough

**Example 1: `s = "()[]{}"`**

1. Initialize empty stack: `[]`
2. Process `'('`: It's an opening bracket → push to stack: `['(']`
3. Process `')'`: It's a closing bracket → check if it matches top of stack
   - Top of stack is `'('`, closing bracket is `')'` → they match → pop stack: `[]`
4. Process `'['`: It's an opening bracket → push to stack: `['[']`
5. Process `']'`: It's a closing bracket → check if it matches top of stack
   - Top of stack is `'['`, closing bracket is `']'` → they match → pop stack: `[]`
6. Process `'{'`: It's an opening bracket → push to stack: `['{']`
7. Process `'}'`: It's a closing bracket → check if it matches top of stack
   - Top of stack is `'{'`, closing bracket is `'}'` → they match → pop stack: `[]`
8. End of string: stack is empty → return `true`

**Example 2: `s = "([)]"`**

1. Initialize empty stack: `[]`
2. Process `'('`: Opening bracket → push to stack: `['(']`
3. Process `'['`: Opening bracket → push to stack: `['(', '[']`
4. Process `')'`: Closing bracket → check if it matches top of stack
   - Top of stack is `'['`, closing bracket is `')'` → they DON'T match → return `false`

### Algorithm
**Stack-based Bracket Matching Algorithm:**
1. Initialize an empty stack
2. Create arrays for opening and closing characters
3. Iterate through each character in the string:
   - If it's an opening bracket: push it onto the stack
   - If it's a closing bracket:
     - If stack is empty: return false (no matching opening bracket)
     - Pop the top element and check if it matches the current closing bracket
     - If they don't match: return false
4. Return true if stack is empty (all brackets matched), false otherwise

### Complexity Analysis
- **Time Complexity**: O(n), where n is the length of the string. We iterate through the string once.
- **Space Complexity**: O(n) in the worst case, where all characters are opening brackets and get pushed onto the stack.

### Example Input/Output
```javascript
Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false

Input: s = "([)]"
Output: false

Input: s = "{[]}"
Output: true
```

## Alternative Solution 1: Hash Map Approach

### Idea
Instead of using separate arrays for opening and closing characters, use a hash map to directly map each opening bracket to its corresponding closing bracket. This makes the matching logic cleaner and more efficient.

### Code
```javascript
var isValidAlt = function(s) {
    const map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    const stack = [];
    for (let char of s) {
        if (map[char]) {
            stack.push(char);
        } else if (Object.values(map).includes(char)) {
            if (stack.length === 0 || map[stack.pop()] !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
};
```

### Algorithm
1. Create a hash map mapping opening brackets to their corresponding closing brackets
2. Use a stack to track opening brackets
3. For each character:
   - If it's an opening bracket (exists as key in map): push to stack
   - If it's a closing bracket (exists as value in map): 
     - Check if stack is empty or if popped opening bracket doesn't match
     - If either condition is true: return false
4. Return whether stack is empty

### Complexity Analysis
- **Time Complexity**: O(n) - single pass through the string
- **Space Complexity**: O(n) - stack space in worst case

### Pros and Cons
**Pros:**
- Cleaner and more readable code
- Direct mapping eliminates index-based matching
- Easier to extend for additional bracket types

**Cons:**
- Slightly more memory usage due to hash map
- `Object.values(map).includes(char)` has O(1) time but creates overhead

## Alternative Solution 2: String Replacement Approach

### Idea
Continuously remove valid bracket pairs from the string until no more pairs can be removed. If the final string is empty, the original string was valid.

### Code
```javascript
var isValidReplacement = function(s) {
    while (s.includes('()') || s.includes('{}') || s.includes('[]')) {
        s = s.replace('()', '').replace('{}', '').replace('[]', '');
    }
    return s === '';
};
```

### Algorithm
1. While the string contains any valid bracket pair ('()', '{}', '[]'):
   - Remove all occurrences of these pairs
2. Return true if the final string is empty

### Complexity Analysis
- **Time Complexity**: O(n²) - in worst case, we might need n/2 iterations, each taking O(n) time
- **Space Complexity**: O(n) - string operations create new strings

### Pros and Cons
**Pros:**
- Very intuitive and easy to understand
- No need for explicit stack management
- Shorter code

**Cons:**
- Poor time complexity O(n²)
- Inefficient for large inputs
- Multiple string replacements create overhead

## Recommendation
The **main solution** and **Alternative Solution 1 (Hash Map)** are both excellent choices with O(n) time complexity. The hash map approach is slightly more elegant and readable, making it the preferred solution for production code. The string replacement approach should be avoided for performance-critical applications due to its O(n²) time complexity.