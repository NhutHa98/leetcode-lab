/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// mine: time: O((m+n)log(m+n)), space: O(m+n)
var findMedianSortedArrays = function (nums1, nums2) {
  const ls = [...nums1, ...nums2].sort((a, b) => a - b);
  const len = ls.length;
  if (len % 2 === 0) {
    return ls[len / 2 - 1] / 2 + ls[len / 2] / 2;
  }
  return ls[Math.floor(len / 2)];
};

// Optimal: time: O(log(min(m, n))), space: O(1)
var findMedianSortedArrays = function (nums1, nums2) {
  // Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  const length1 = nums1.length,
    length2 = nums2.length;
  let left = 0,
    right = length1,
    partitionSize = Math.floor((length1 + length2 + 1) / 2);
  while (left <= right) {
    const partition1 = Math.floor((left + right) / 2);
    const partition2 = partitionSize - partition1;
    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    const minRight1 = partition1 === length1 ? Infinity : nums1[partition1];
    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    const minRight2 = partition2 === length2 ? Infinity : nums2[partition2];
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((length1 + length2) % 2 === 1) {
        return Math.max(maxLeft1, maxLeft2);
      }
      return (
        (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
      );
    } else if (maxLeft1 > minRight2) {
      right = partition1 - 1;
    } else {
      left = partition1 + 1;
    }
  }
  return 0;
};
