/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1) return s;

  let rows = Array.from({ length: Math.min(numRows, s.length) }, () => "");
  let currRow = 0;
  let goingDown = false;

  for (let i = 0; i < s.length; i++) {
    rows[currRow] += s[i];
    if (currRow === 0) goingDown = true;
    if (currRow === numRows - 1) goingDown = false;
    currRow += goingDown ? 1 : -1;
  }

  return rows.join("");
};
