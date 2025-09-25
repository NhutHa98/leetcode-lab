# Add Two Numbers - LeetCode 2

## Overview
Given two non-empty linked lists representing two non-negative integers stored in reverse order, add the two numbers and return the sum as a linked list. Each node contains a single digit, and the digits are stored in reverse order (e.g., 342 is represented as 2 → 4 → 3). The goal is to simulate elementary school addition with carry-over.

## Idea
The main intuition is to simulate elementary school addition digit by digit. Since the digits are stored in reverse order, we can traverse both linked lists simultaneously from the least significant digit (head) to the most significant digit. We maintain a carry value for cases where the sum of two digits exceeds 9. The algorithm creates a new linked list to store the result.

## Step-by-step Walkthrough

### Example 1: l1 = [2,4,3], l2 = [5,6,4] (representing 342 + 465 = 807)

1. **Initialize**: dummy head node, carry = 0, current pointer to dummy
2. **Step 1**: Add 2 + 5 + 0(carry) = 7, carry = 0, create node(7)
3. **Step 2**: Add 4 + 6 + 0(carry) = 10, carry = 1, create node(0)
4. **Step 3**: Add 3 + 4 + 1(carry) = 8, carry = 0, create node(8)
5. **Result**: [7,0,8] representing 807

### Example 2: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9] (representing 9999999 + 9999 = 10009998)

1. **Initialize**: dummy head node, carry = 0
2. **Steps 1-4**: Add 9 + 9 = 18, carry = 1, create node(8) for each
3. **Steps 5-7**: Add 9 + 0(null) + 1(carry) = 10, carry = 1, create node(0)
4. **Final step**: carry = 1, create node(1)
5. **Result**: [8,9,0,0,0,0,0,1] representing 10009998

## Algorithm
**Linked List Traversal with Carry Simulation**
- Use a dummy head node to simplify edge cases
- Traverse both linked lists simultaneously
- For each position, sum corresponding digits plus carry
- Create new nodes with sum % 10, update carry = sum / 10
- Continue until both lists are exhausted and carry is 0

## Complexity Analysis
- **Time Complexity**: O(max(N, M)), where N and M are the lengths of the two linked lists. We traverse both lists once.
- **Space Complexity**: O(max(N, M)) for the result linked list. The algorithm uses O(1) extra space excluding the output.

## Alternative Solutions

### Solution 1: Recursive Approach
```javascript
var addTwoNumbersRecursive = function(l1, l2, carry = 0) {
    if (!l1 && !l2 && carry === 0) return null;
    
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;
    
    const node = new ListNode(sum % 10);
    node.next = addTwoNumbersRecursive(
        l1 ? l1.next : null,
        l2 ? l2.next : null,
        Math.floor(sum / 10)
    );
    return node;
};
```
**Pros**: Clean and elegant, natural recursive structure
**Cons**: Uses O(max(N,M)) space for recursion stack, may cause stack overflow for very long lists

### Solution 2: Convert to Numbers (Limited Range)
```javascript
var addTwoNumbersConvert = function(l1, l2) {
    const listToNumber = (list) => {
        let num = 0, multiplier = 1;
        while (list) {
            num += list.val * multiplier;
            multiplier *= 10;
            list = list.next;
        }
        return num;
    };
    
    const sum = listToNumber(l1) + listToNumber(l2);
    // Convert back to linked list...
};
```
**Pros**: Conceptually simple
**Cons**: Limited by JavaScript's number precision, fails for very large numbers

## Example Input/Output
```javascript
// Input
l1 = [2,4,3]  // represents 342
l2 = [5,6,4]  // represents 465

// Output
[7,0,8]       // represents 807

// Input
l1 = [0]      // represents 0
l2 = [0]      // represents 0

// Output
[0]           // represents 0

// Input
l1 = [9,9,9,9,9,9,9]  // represents 9999999
l2 = [9,9,9,9]        // represents 9999

// Output
[8,9,0,0,0,0,0,1]     // represents 10009998
```
