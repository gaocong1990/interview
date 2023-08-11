/**
 * 把m个同样的苹果放在n个同样的盘子里，允许有的盘子空着不放，问有多少种不同的分法？(注：5,1,1和1,1,5是同一种分法)
 */

const fn = (m, n) => {
  /**
   * 思路：n>m时，必然有n-m个盘子为空，因此去掉这些盘子不影响分法，所以fn(m,n) = fn(m,m);
   * n <= m时，分为 含有0的方案数，不含有0的方案数
   * 含有0的方案时：至少有一个盘子为空，则 fn(m,n) = fn(m, n-1);
   * 不含有0的方案：则n个盘子每个至少放一个，则问题转变成把m-n个苹果放到n个盘中，所以fn(m,n) = fn(m-n, n);
   * 总的方案数fn(m,n) = fn(m, n-1) + fn(m-n, n)
   */

  // 方法1 递归
  // if (m <= 1 || n <= 1) {
  //   return 1;
  // }
  // if (n > m) {
  //   return fn(m, m);
  // } else {
  //   return fn(m, n - 1) + fn(m - n, n);
  // }

  // 动态规划

  // 初始化dp dp[i][j]表示i个同样的苹果放在j个同样的盘子里的分法
  const dp = Array(Number(m) + 1)
    .fill(0)
    .map(() => Array(Number(n + 1)).fill(1));

  for (let i = 2; i <= m; i++) {
    for (let j = 2; j <= n; j++) {
      if (i < j) {
        dp[i][j] = dp[i][i];
      } else {
        dp[i][j] = dp[i][j - 1] + dp[i - j][j];
      }
    }
  }
  return dp[m][n];
};

// test
console.log(fn(7, 3));
