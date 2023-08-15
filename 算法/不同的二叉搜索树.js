/**
 * 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？
 * 返回满足题意的二叉搜索树的种数。
 */
/**
 * 对于整数n，不同的二叉树种类可以分为取一个数做根节点，剩下的n-1个数，按左右子节点个数(0：n-1)...(1:n-2)...(n-1:0)划分
 * 所以：G(n)=G(0)∗G(n−1)+G(1)∗(n−2)+...+G(n−1)∗G(0)
 */  
/**
 * 递归解法
 */
var numTrees = function (n) {
  if (n === 0) return 1;
  if (n <= 2) {
    return n;
  }

  let sum = 0;

  for (let i = 0; i <= n - 1; i++) {
    sum += numTrees(i) * numTrees(n - 1 - i);
  }

  return sum;
};

// 非递归 动态规划
// dp[i] 表示i个节点可组成互不相同的 二叉搜索树 的种树
// dp[0] = dp[1] = 0
// dp[i] = dp[0]*dp[i-1]+...+dp[j]*dp[i-1-j]+...+dp[i-1]*dp[0]

var numTrees2 = function (n) {
  if (n <= 2) {
    return n;
  }

  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for(let i = 2; i <= n; i++){
    for(let j = 0; j < i; j++){
      dp[i] += dp[j] * dp[i - 1 -j];
    }
  }

  return dp[n]
};


//test

console.log(numTrees(1));
console.log(numTrees(3));

console.log(numTrees2(1));
console.log(numTrees2(3));

