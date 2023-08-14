/**
 * 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
 * 你可以对一个单词进行如下三种操作：插入一个字符  删除一个字符   替换一个字符
 *
 * 示例 1：
 * 输入：word1 = "horse", word2 = "ros"
 * 输出：3
 * 解释：
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 *
 * 示例 2：
 * 输入：word1 = "intention", word2 = "execution"
 * 输出：5
 * 解释：
 * intention -> inention (删除 't')
 * inention -> enention (将 'i' 替换为 'e')
 * enention -> exention (将 'n' 替换为 'x')
 * exention -> exection (将 'n' 替换为 'c')
 * exection -> execution (插入 'u')
 */
var minDistance = function (word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;

  // 有一个字符串为空，则距离就是另一个字符串的长度
  if (len1 * len2 === 0) {
    return len1 + len2;
  }
  // 两个字符串相等
  if (word1 === word2) {
    return 0;
  }

  const dp = Array(len1 + 1)
    .fill(0)
    .map(() => Array(len2 + 1).fill(0));

  // dp[i][j]表示word1的前i个字符转成word2前j个字符的编辑距离
  // 若第i个字符等于第j个字符  word1[i-1] === word2[j-1], 则dp[i][j] = dp[i-1][j-1]
  // 不等时，则有3种情况：
  //1. word1插入一个字符后一样，dp[i][j] = dp[i-1][j]+1
  //2. word2插入一个字符后一样，dp[i][j] = dp[i][j-1]+1
  //3. word1替换一个字符，dp[i][j] = dp[i-1][j-1]+1

  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (i * j === 0) {
        //初始化dp
        dp[i][j] = i + j;
      } else {
        if (word1[i - 1] === word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] =
            Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1])) +
            1;
        }
      }
    }
  }

  return dp[len1][len2];
};
