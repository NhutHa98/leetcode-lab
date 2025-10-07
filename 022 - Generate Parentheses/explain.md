# Generate Parentheses - LeetCode Problem 22

## Problem Statement
Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

## Idea
The main intuition is to use **backtracking** to build valid parentheses combinations character by character. We maintain two counters: one for open parentheses `(` and one for close parentheses `)`. The key insight is that at any point in our construction:
1. We can add an open parenthesis `(` if we haven't used all `n` open parentheses yet
2. We can add a close parenthesis `)` only if we have more open parentheses than close parentheses in our current string (to ensure validity)

This approach ensures we never create invalid combinations like `)(` or unbalanced strings.

## Step-by-step Walkthrough

### Example 1: n = 2
Let's trace through the algorithm step by step:

1. **Start**: `current = ""`, `open = 0`, `close = 0`
2. **Add (**: `current = "("`, `open = 1`, `close = 0`
3. **Add (**: `current = "(("`, `open = 2`, `close = 0`
4. **Add )**: `current = "(()"`, `open = 2`, `close = 1`
5. **Add )**: `current = "(())"`, `open = 2`, `close = 2` → **Valid combination found!**
6. **Backtrack** to step 3, try adding `)` instead
7. **Add )**: `current = "()("`, `open = 2`, `close = 1`
8. **Add )**: `current = "()()"`, `open = 2`, `close = 2` → **Valid combination found!**
9. **Backtrack** to step 1, try different path...

**Result**: `["(())", "()()"]`

### Example 2: n = 3
Following similar logic for n = 3:
- Start with empty string
- At each step, decide whether to add `(` or `)`
- Add `(` if `open < n`
- Add `)` if `close < open`
- Stop when `current.length === 2 * n`

**Result**: `["((()))", "(()())", "(())()", "()(())", "()()()"]`

## Algorithm
**Backtracking with Constraints**

The algorithm uses recursive backtracking with two key constraints:
1. **Open constraint**: Can only add `(` if we haven't used all `n` open parentheses
2. **Close constraint**: Can only add `)` if we have more open than close parentheses

This ensures all generated combinations are valid and complete.

```javascript
function backtrack(current, open, close) {
    // Base case: reached target length
    if (current.length === 2 * n) {
        result.push(current);
        return;
    }
    
    // Try adding open parenthesis
    if (open < n) {
        backtrack(current + "(", open + 1, close);
    }
    
    // Try adding close parenthesis
    if (close < open) {
        backtrack(current + ")", open, close + 1);
    }
}
```

## Complexity Analysis
- **Time Complexity**: O(4^n / √n) - This is the nth Catalan number, which represents the number of valid parentheses combinations
- **Space Complexity**: O(4^n / √n) for storing all valid combinations, plus O(n) for the recursion stack depth

## Alternative Solutions

### Alternative 1: Dynamic Programming Approach

```javascript
var generateParenthesis = function(n) {
    const dp = [[""]]; // dp[0] = [""]
    
    for (let i = 1; i <= n; i++) {
        dp[i] = [];
        for (let j = 0; j < i; j++) {
            const left = dp[j];
            const right = dp[i - 1 - j];
            
            for (const l of left) {
                for (const r of right) {
                    dp[i].push(`(${l})${r}`);
                }
            }
        }
    }
    
    return dp[n];
};
```

**Pros**: 
- Builds solutions bottom-up from smaller subproblems
- Avoids redundant calculations through memoization
- Clear mathematical relationship (Catalan numbers)

**Cons**: 
- More complex to understand
- Higher space complexity due to storing all intermediate results
- Less intuitive than the backtracking approach

### Alternative 2: Iterative with Stack

```javascript
var generateParenthesis = function(n) {
    const result = [];
    const stack = [{str: "", open: 0, close: 0}];
    
    while (stack.length > 0) {
        const {str, open, close} = stack.pop();
        
        if (str.length === 2 * n) {
            result.push(str);
            continue;
        }
        
        if (open < n) {
            stack.push({str: str + "(", open: open + 1, close: close});
        }
        
        if (close < open) {
            stack.push({str: str + ")", open: open, close: close + 1});
        }
    }
    
    return result;
};
```

**Pros**: 
- Avoids recursion and potential stack overflow
- Same logic as backtracking but iterative
- More explicit state management

**Cons**: 
- Requires additional data structure (stack)
- Less elegant than recursive solution
- More verbose code

### Alternative 3: Iterative BFS with Queue

```javascript
var generateParenthesis = function(n) {
    if (n === 0) return [""];
    
    const result = [];
    const queue = [{str: "", open: 0, close: 0}];
    
    while (queue.length > 0) {
        const {str, open, close} = queue.shift();
        
        if (str.length === 2 * n) {
            result.push(str);
            continue;
        }
        
        if (open < n) {
            queue.push({str: str + "(", open: open + 1, close: close});
        }
        
        if (close < open) {
            queue.push({str: str + ")", open: open, close: close + 1});
        }
    }
    
    return result;
};
```

**Pros**: 
- Breadth-first exploration generates results in lexicographic order
- No recursion, completely iterative
- Easy to understand queue-based approach

**Cons**: 
- Uses more memory as it stores all intermediate states
- Queue operations can be slower than stack operations
- Still requires additional data structure

### Alternative 4: Bit Manipulation Approach

```javascript
var generateParenthesis = function(n) {
    const result = [];
    const totalCombinations = 1 << (2 * n); // 2^(2n) possible combinations
    
    for (let mask = 0; mask < totalCombinations; mask++) {
        let str = "";
        let balance = 0;
        let openCount = 0;
        let valid = true;
        
        for (let i = 0; i < 2 * n; i++) {
            if (mask & (1 << i)) {
                if (openCount < n) {
                    str += "(";
                    balance++;
                    openCount++;
                } else {
                    valid = false;
                    break;
                }
            } else {
                if (balance > 0) {
                    str += ")";
                    balance--;
                } else {
                    valid = false;
                    break;
                }
            }
        }
        
        if (valid && balance === 0 && openCount === n) {
            result.push(str);
        }
    }
    
    return result;
};
```

**Pros**: 
- Completely different approach using bit manipulation
- No recursion or additional data structures
- Demonstrates creative problem-solving

**Cons**: 
- Less efficient due to checking many invalid combinations
- Time complexity is O(2^(2n) * n) which is worse than other approaches
- More complex to understand and implement

### Alternative 5: Closure Number (Mathematical Approach)

```javascript
var generateParenthesis = function(n) {
    if (n === 0) return [""];
    
    const result = [];
    
    for (let c = 0; c < n; c++) {
        const leftCombinations = generateParenthesis(c);
        const rightCombinations = generateParenthesis(n - 1 - c);
        
        for (const left of leftCombinations) {
            for (const right of rightCombinations) {
                result.push("(" + left + ")" + right);
            }
        }
    }
    
    return result;
};
```

**Note**: This is still recursive but demonstrates the mathematical Catalan number relationship.

**Alternative 5 (Non-Recursive Version)**:

```javascript
var generateParenthesis = function(n) {
    const memo = {};
    memo[0] = [""];
    
    for (let i = 1; i <= n; i++) {
        memo[i] = [];
        for (let c = 0; c < i; c++) {
            const leftCombinations = memo[c];
            const rightCombinations = memo[i - 1 - c];
            
            for (const left of leftCombinations) {
                for (const right of rightCombinations) {
                    memo[i].push("(" + left + ")" + right);
                }
            }
        }
    }
    
    return memo[n];
};
```

**Pros**: 
- Based on mathematical Catalan number formula
- Bottom-up approach builds solutions incrementally
- No recursion in the iterative version

**Cons**: 
- Requires understanding of Catalan numbers
- More complex logic than straightforward approaches
- Higher space complexity for memoization

## Example Input/Output

### Example 1:
**Input**: `n = 1`
**Output**: `["()"]`
**Explanation**: Only one way to arrange 1 pair of parentheses

### Example 2:
**Input**: `n = 2`
**Output**: `["(())", "()()"]`
**Explanation**: Two valid arrangements of 2 pairs of parentheses

### Example 3:
**Input**: `n = 3`
**Output**: `["((()))", "(()())", "(())()", "()(())", "()()()"]`
**Explanation**: Five valid arrangements of 3 pairs of parentheses

### Example 4:
**Input**: `n = 0`
**Output**: `[""]`
**Explanation**: Empty string is the only valid arrangement for 0 pairs

The backtracking solution is generally preferred due to its clarity, efficiency, and intuitive approach to the problem. It directly models the constraint-based generation process, making it easy to understand and implement.