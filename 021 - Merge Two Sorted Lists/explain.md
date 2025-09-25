# LeetCode 21: Merge Two Sorted Lists

## Overview
The problem asks us to merge two sorted linked lists into one sorted linked list. Given two already sorted linked lists `list1` and `list2`, we need to combine them while maintaining the sorted order. The result should be a new linked list that contains all nodes from both input lists in ascending order.

## Idea
The main intuition is to use a **two-pointer approach** where we compare the current nodes of both lists and always choose the smaller value to add to our result list. Since both input lists are already sorted, we can make decisions locally (comparing only the current heads) without looking ahead, knowing that this greedy approach will produce the globally optimal result.

We use a dummy node as a starting point to simplify the logic - this eliminates the need for special handling of the first node and makes the code cleaner.

## Step-by-step Walkthrough

### Algorithm Steps:
1. Create a dummy node to serve as the starting point of our merged list
2. Keep a `current` pointer that tracks where we should attach the next node
3. While both lists have remaining nodes:
   - Compare the values of the current nodes from both lists
   - Attach the smaller node to our result list
   - Move the pointer of the list we took from
   - Move our `current` pointer forward
4. When one list is exhausted, attach the remaining nodes from the other list
5. Return `dummy.next` (the actual start of our merged list)

### Example Walkthrough 1:
**Input:** `list1 = [1,2,4]`, `list2 = [1,3,4]`

```
Initial state:
list1: 1 -> 2 -> 4
list2: 1 -> 3 -> 4
dummy: 0
current: points to dummy

Step 1: Compare 1 and 1
- Equal values, so we take from list1 (could take from either)
- dummy: 0 -> 1
- current moves to node with value 1
- list1 advances to 2

Step 2: Compare 2 and 1
- 1 < 2, take from list2
- dummy: 0 -> 1 -> 1
- current moves to second node with value 1
- list2 advances to 3

Step 3: Compare 2 and 3
- 2 < 3, take from list1
- dummy: 0 -> 1 -> 1 -> 2
- current moves to node with value 2
- list1 advances to 4

Step 4: Compare 4 and 3
- 3 < 4, take from list2
- dummy: 0 -> 1 -> 1 -> 2 -> 3
- current moves to node with value 3
- list2 advances to 4

Step 5: Compare 4 and 4
- Equal, take from list1
- dummy: 0 -> 1 -> 1 -> 2 -> 3 -> 4
- current moves to node with value 4
- list1 becomes null

Step 6: list1 is null, append remaining list2
- dummy: 0 -> 1 -> 1 -> 2 -> 3 -> 4 -> 4

Result: [1,1,2,3,4,4]
```

### Example Walkthrough 2:
**Input:** `list1 = []`, `list2 = [0]`

```
Initial state:
list1: null
list2: 0
dummy: 0
current: points to dummy

Step 1: list1 is null, so we skip the while loop
Step 2: Attach remaining list2 to current.next
- dummy: 0 -> 0

Result: [0]
```

## Algorithm
This solution uses the **Two Pointers** technique combined with **Merge Process** from merge sort. The key insight is that we can merge two sorted sequences by always taking the smaller current element, which is optimal due to the sorted property.

**Key Characteristics:**
- **Greedy approach**: Always choose the locally optimal solution (smaller current value)
- **Pointer manipulation**: Efficiently reuses existing nodes instead of creating new ones
- **Dummy node pattern**: Simplifies edge cases and code structure

## Complexity Analysis
- **Time Complexity**: O(m + n), where m and n are the lengths of list1 and list2 respectively. We visit each node exactly once.
- **Space Complexity**: O(1), as we only use a constant amount of extra space (dummy node and pointers). We're not creating new nodes, just rearranging existing ones.

## Alternative Solutions

### Alternative 1: Recursive Approach

```javascript
var mergeTwoLists = function(list1, list2) {
    // Base cases
    if (!list1) return list2;
    if (!list2) return list1;
    
    // Recursive case
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};
```

**Pros:**
- More concise and elegant code
- Easier to understand the logic conceptually
- Natural divide-and-conquer approach

**Cons:**
- Uses O(m + n) space due to recursive call stack
- Risk of stack overflow for very large lists
- Generally slower due to function call overhead

**Complexity:**
- Time: O(m + n)
- Space: O(m + n) due to recursion stack

### Alternative 2: Priority Queue/Min Heap Approach

```javascript
var mergeTwoLists = function(list1, list2) {
    // This approach is overkill for just 2 lists, but useful for k lists
    const MinPriorityQueue = require('datastructures-js').MinPriorityQueue;
    
    const pq = new MinPriorityQueue(node => node.val);
    
    // Add first nodes to priority queue
    if (list1) pq.enqueue(list1);
    if (list2) pq.enqueue(list2);
    
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (!pq.isEmpty()) {
        const node = pq.dequeue();
        current.next = node;
        current = current.next;
        
        // Add next node from the same list
        if (node.next) {
            pq.enqueue(node.next);
        }
    }
    
    return dummy.next;
};
```

**Pros:**
- Easily extensible to merge k sorted lists
- Maintains the same time complexity
- Good practice for understanding heap operations

**Cons:**
- Overkill for just 2 lists
- More complex implementation
- Higher space complexity due to priority queue
- Requires external library or custom heap implementation

**Complexity:**
- Time: O((m + n) * log(k)) where k=2, so effectively O(m + n)
- Space: O(k) = O(2) = O(1) for the priority queue, but with higher constants

## Example Input/Output

### Example 1:
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Explanation: The merged list maintains sorted order by interleaving elements from both lists.
```

### Example 2:
```
Input: list1 = [], list2 = []
Output: []
Explanation: Both lists are empty, so the result is an empty list.
```

### Example 3:
```
Input: list1 = [], list2 = [0]
Output: [0]
Explanation: One list is empty, so we return the non-empty list as-is.
```

The iterative two-pointer approach (our main solution) is generally preferred because it's efficient, uses constant space, and is easy to understand and implement correctly.