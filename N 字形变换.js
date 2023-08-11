/**
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 * 示例：
 * 输入：s = "PAYPALISHIRING", numRows = 4
 * 输出："PINALSIGYAHRPI"
 * 解释：
 * P     I    N
 * A   L S  I G
 * Y A   H R
 * P     I
 */

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  // 思路： 使用一维数组，数组的每个元素代表第i行的所有字符，从上到小，从下到上，反复填充数组的每一个元素
  // 初始行curRow = 0, 当curRow === 0 || curRow === n - 1 时改变上下方向
  /**
    * 0              2n-2    ----------------------> curRow = 0
    * 1       n+1    2n-1 
    * .    n         ...
    * n-1            3n-3    ----------------------> curRow = n-1
  */
  const len = s.length;

  if (len <= numRows || numRows === 1) {
    return s;
  }

  //初始化一个n行的一维维数组
  let result = Array(numRows).fill('');
  let goDown = false;
  let curRow = 0;

  for (let i = 0; i < len; i++) {
    result[curRow] += s[i];
    if (curRow === 0 || curRow === numRows - 1) {
      goDown = !goDown;
    }

    curRow += goDown ? 1 : -1;
  }

  return result.join('');
};
