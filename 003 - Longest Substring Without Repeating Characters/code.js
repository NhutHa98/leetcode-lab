/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringxx = function (s) {
  let maxLength = 0;
  let start = 0;
  const charIndexMap = new Map();

  for (let end = 0; end < s.length; end++) {
    if (charIndexMap.has(s[end])) {
      start = Math.max(start, charIndexMap.get(s[end]) + 1);
    }
    charIndexMap.set(s[end], end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
};
