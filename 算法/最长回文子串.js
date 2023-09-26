/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。
  *如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
  *示例 1：
  *输入：s = "babad"
  *输出："bab"
  *解释："aba" 同样是符合题意的答案。
  *示例 2：
  *输入：s = "cbbd"
  *输出："bb" 
*/
var longestPalindrome = function (s) {
  /**
   * 思路： 动态规划，dp[i][j]表示s[i:j]是否是回文串
   * 状态转移方程： dp[i][j] = s[i] == s[j] && dp[i + 1][j - 1]
   * 初始化条件： dp[i][i] = true  (j - i < 3 &&s[i] == s[j]) 时 dp[i][j] = true
   * 遍历条件是字符串的长度，要由短的字符串向长的字符串遍历
   */
  const sLen = s.length;

  if (sLen < 2) {
    return s;
  }
  //初始化二维数组
  const dp = Array(sLen).fill().map(() => Array(sLen).fill(false));;

  //初始化边界条件 dp[i][i] = true 
  for (let i = 0; i < sLen; i++) {
    dp[i][i] = true;
  }

  let max = 1;
  let begin = 0;
  // 以字符串长度l=2开始遍历到s的长度
  for (let l = 2; l <= sLen; l++) {
    //字符串起始下标从0开始，到字符倒数第一位
    for (let i = 0; i < sLen - 1; i++) {
      const j = i + l - 1;
      // 超出边界直接返回，进入下一个字符串长度的遍历
      if (j >= sLen) {
        break;
      }

      // 动态规划状态转移
      if (s[i] != s[j]) {
        dp[i][j] = false;
      } else {
        if (j - i < 3) {
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i + 1][j - 1];
        }
      }

      // 取最长的
      if (dp[i][j] && l > max) {
        max = l;
        begin = i;
      }
    }
  }
  return s.slice(begin, begin + max);
};

console.log(longestPalindrome('abcba'));
