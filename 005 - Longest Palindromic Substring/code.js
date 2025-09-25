function longestPalindrome(s) {
  let maxLength = 1;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    // Check for odd-length palindromes
    let low = i - 1;
    let high = i + 1;
    while (low >= 0 && high < s.length && s[low] === s[high]) {
      if (high - low + 1 > maxLength) {
        maxLength = high - low + 1;
        start = low;
      }
      low--;
      high++;
    }

    // Check for even-length palindromes
    low = i;
    high = i + 1;
    while (low >= 0 && high < s.length && s[low] === s[high]) {
      if (high - low + 1 > maxLength) {
        maxLength = high - low + 1;
        start = low;
      }
      low--;
      high++;
    }
  }

  return s.substring(start, start + maxLength);
}
// Alternative Solution: Dynamic Programming
function longestPalindromeDP(s) {
  const n = s.length;
  if (n === 0) return "";
  let dp = Array.from({ length: n }, () => Array(n).fill(false));
  let start = 0,
    maxLength = 1;

  // All substrings of length 1 are palindromes
  for (let i = 0; i < n; i++) dp[i][i] = true;

  // Check for substrings of length 2
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLength = 2;
    }
  }

  // Check for substrings of length > 2
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      let j = i + len - 1;
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        if (len > maxLength) {
          start = i;
          maxLength = len;
        }
      }
    }
  }
  return s.substring(start, start + maxLength);
}
// Alternative Solution: Manacher's Algorithm
function longestPalindromeManacher(s) {
  if (!s || s.length === 0) return "";
  // Transform s to add boundaries (#) to handle even/odd length palindromes
  let t = "^#" + s.split("").join("#") + "#$";
  let n = t.length;
  let p = new Array(n).fill(0);
  let center = 0,
    right = 0;
  for (let i = 1; i < n - 1; i++) {
    let mirror = 2 * center - i;
    if (i < right) {
      p[i] = Math.min(right - i, p[mirror]);
    }
    // Expand around center i
    while (t[i + 1 + p[i]] === t[i - 1 - p[i]]) {
      p[i]++;
    }
    // Update center and right boundary
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
  }
  // Find the maximum palindrome length
  let maxLen = 0,
    centerIndex = 0;
  for (let i = 1; i < n - 1; i++) {
    if (p[i] > maxLen) {
      maxLen = p[i];
      centerIndex = i;
    }
  }
  // Extract the palindrome from the original string
  let start = (centerIndex - maxLen) / 2;
  return s.substring(start, start + maxLen);
}
