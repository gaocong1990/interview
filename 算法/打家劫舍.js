/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如
 * 果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 * 
 * 进阶：所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // 特殊情况
  let length = nums.length;
  if (length == 1) {
    return nums[0];
  } else if (length == 2) {
    return Math.max(nums[0], nums[1]);
  }

  // 简单版： 首尾的房屋不相连
  var rob_fn = function (arr) {
    /**
     * 动态规划
     * 1.dp[i]表示可以从前i家中打劫到的最大值
     * 2.状态转移方程： dp[i] = Math.max(dp[i-1], dp[i-2] + arr[i]); // 第i家可以选择偷或者不偷，取两者中的大值
     * 3. 初始化dp[0]=arr[0] dp[1]=Math.max(arr[0], arr[1]);
     */
    const len = arr.length;

    const dp = new Array(len);
    // 初始化dp
    dp[0] = arr[0];
    dp[1] = Math.max(arr[0], arr[1]);

    for (let i = 2; i < len; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i]);
    }

    return dp[len - 1];
  };

  // 在打家劫舍的基础上增加了环，则可分为两种情况，第0和n-1家不能同时偷，分为0...n-2和1...n-1两个数组，取其中的最大值即可
  const res1 = rob_fn(nums.slice(0, length - 1));
  const res2 = rob_fn(nums.slice(1));

  return Math.max(res1, res2);
};
