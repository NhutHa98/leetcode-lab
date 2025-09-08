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
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  let m = nums1.length,
    n = nums2.length;
  let imin = 0,
    imax = m,
    halfLen = Math.floor((m + n + 1) / 2);
  while (imin <= imax) {
    let i = Math.floor((imin + imax) / 2);
    let j = halfLen - i;
    if (i < m && nums2[j - 1] > nums1[i]) {
      imin = i + 1;
    } else if (i > 0 && nums1[i - 1] > nums2[j]) {
      imax = i - 1;
    } else {
      let maxLeft;
      if (i === 0) maxLeft = nums2[j - 1];
      else if (j === 0) maxLeft = nums1[i - 1];
      else maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
      if ((m + n) % 2 === 1) return maxLeft;
      let minRight;
      if (i === m) minRight = nums2[j];
      else if (j === n) minRight = nums1[i];
      else minRight = Math.min(nums1[i], nums2[j]);
      return (maxLeft + minRight) / 2;
    }
  }
  return 0;
};
