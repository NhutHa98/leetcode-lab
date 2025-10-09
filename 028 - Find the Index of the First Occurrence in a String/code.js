/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
/*
Big O Complexity Analysis:
Time complexity: O(n) where n is the length of haystack.
*/
var strStr = function (haystack, needle) {
  return haystack.indexOf(needle);
};
// Runtime: 64 ms, faster than 99.87% of JavaScript online submissions for Find the Index of the First Occurrence in a String.
// Memory Usage: 42.1 MB, less than 98.70% of JavaScript online submissions for Find the Index of the First Occurrence in a String.
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
// Tags: String, Two Pointers, Sliding Window
// Difficulty: Easy

/*
Big O Complexity Analysis:
Time complexity: O(n*m) in the worst case, where n is the length of haystack and m is the length of needle.
*/
var strStrAlternative = function (haystack, needle) {
  if (needle === "") return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.substring(i, i + needle.length) === needle) {
      return i;
    }
  }
  return -1;
};
