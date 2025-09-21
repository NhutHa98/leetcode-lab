/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs || strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
};

// B. Vertical Scanning
function longestCommonPrefixVertical(strs) {
  if (!strs || strs.length === 0) return "";
  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== char) {
        return strs[0].substring(0, i);
      }
    }
  }
  return strs[0];
}

// C. Divide and Conquer
function longestCommonPrefixDivideAndConquer(strs) {
  if (!strs || strs.length === 0) return "";
  function lcp(l, r) {
    if (l === r) return strs[l];
    const mid = Math.floor((l + r) / 2);
    const left = lcp(l, mid);
    const right = lcp(mid + 1, r);
    let minLen = Math.min(left.length, right.length);
    let i = 0;
    while (i < minLen && left[i] === right[i]) i++;
    return left.substring(0, i);
  }
  return lcp(0, strs.length - 1);
}

// D. Binary Search on Prefix Length
function longestCommonPrefixBinarySearch(strs) {
  if (!strs || strs.length === 0) return "";
  let minLen = Math.min(...strs.map((s) => s.length));
  let low = 0,
    high = minLen;
  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);
    const prefix = strs[0].substring(0, mid);
    if (strs.every((s) => s.startsWith(prefix))) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  return strs[0].substring(0, low);
}

// E. Trie (Prefix Tree)
class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0;
  }
}
function longestCommonPrefixTrie(strs) {
  if (!strs || strs.length === 0) return "";
  const root = new TrieNode();
  for (const word of strs) {
    let node = root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
      node.count++;
    }
  }
  let prefix = "";
  let node = root;
  while (true) {
    const keys = Object.keys(node.children);
    if (keys.length !== 1) break;
    const char = keys[0];
    if (node.children[char].count !== strs.length) break;
    prefix += char;
    node = node.children[char];
  }
  return prefix;
}
