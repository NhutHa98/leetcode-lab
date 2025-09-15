/**
 * @param {string} s
 * @return {boolean}
 */
var areNumbersAscending = function (s) {
  const words = s.split(" ");
  let prevNum = 0;

  for (let i = 0; i < words.length; i++) {
    const num = parseInt(words[i]);
    if (!isNaN(num)) {
      if (num <= prevNum) return false;
      prevNum = num;
    }
  }
  return true;
};
