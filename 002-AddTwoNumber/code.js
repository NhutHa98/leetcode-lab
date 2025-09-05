/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// leatcode solution
var addTwoNumbers = function (l1, l2, carry = 0) {
  if (!l1 && !l2 && !carry) return null;
  let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
  let node = new ListNode(sum % 10);
  node.next = addTwoNumbers(
    l1 ? l1.next : null,
    l2 ? l2.next : null,
    Math.floor(sum / 10)
  );
  return node;
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// Solution 1: Iteration
// Time: O(max(N, M)), Space: O(max(N, M))
var addTwoNumbers1 = function (l1, l2) {
  let dummy = new ListNode(0);
  let curr = dummy,
    carry = 0;
  while (l1 || l2 || carry) {
    let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return dummy.next;
};

/**
 * Solution 2: Recursion
 * Time: O(max(N, M)), Space: O(max(N, M))
 */
function addTwoNumbersRecursive(l1, l2, carry = 0) {
  if (!l1 && !l2 && !carry) return null;
  let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
  let node = new ListNode(sum % 10);
  node.next = addTwoNumbersRecursive(
    l1 ? l1.next : null,
    l2 ? l2.next : null,
    Math.floor(sum / 10)
  );
  return node;
}

/**
 * Solution 3: Convert to Array, then Back
 * Time: O(N + M), Space: O(N + M)
 */
function addTwoNumbersArray(l1, l2) {
  let arr1 = [],
    arr2 = [];
  while (l1) {
    arr1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    arr2.push(l2.val);
    l2 = l2.next;
  }
  let i = 0,
    carry = 0,
    dummy = new ListNode(0),
    curr = dummy;
  while (i < arr1.length || i < arr2.length || carry) {
    let sum = (arr1[i] || 0) + (arr2[i] || 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    i++;
  }
  return dummy.next;
}
