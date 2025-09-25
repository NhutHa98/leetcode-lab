/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 0. Hash Map (O(n) time)
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return []; // Return empty array if no solution found
};

// 1. Brute Force (O(n²) time)
var twoSumBruteForce = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};

// 2. Sorting with Two Pointers (O(n log n) time, but loses original indices)
var twoSumSort = function (nums, target) {
  const arr = nums.map((num, idx) => [num, idx]);
  arr.sort((a, b) => a[0] - b[0]);
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    const sum = arr[left][0] + arr[right][0];
    if (sum === target) {
      return [arr[left][1], arr[right][1]];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
};
