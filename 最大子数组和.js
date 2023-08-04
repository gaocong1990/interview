/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
子数组 是数组中的一个连续部分。

示例 1：

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
示例 2：

输入：nums = [1]
输出：1
示例 3：

输入：nums = [5,4,-1,7,8]
输出：23
 */

var maxSubArray = function (nums) {
  const len = nums.length;
  let max = -Infinity;

  // 暴力解法 全遍历所有子数组
  // for(let i = 0; i < len; i++){
  //     let sum = 0;
  //     for(let j = i; j <len; j++){
  //         sum += nums[j];
  //         max = Math.max(max, sum)
  //     }
  // }

  // 贪心算法，一直累加，每次累加完更新最大值，当和为负数的时候放弃之前的累加结果，重新累加计算
  // let count = 0;
  // for (let i = 0; i < len; i++) {
  //   count += nums[i];
  //   if (count > max) {
  //     max = count;
  //   }
  //   if (count < 0) {
  //     count = 0;
  //   }
  // }

  // 动态规划 dp[i] 以i结尾的子数组的最大和
  // dp[i] = Math.max(dp[i-1]+nums[i] ,nums[i]);
  // 初始值 dp[0] = nums[0]; result = dp[0]
  let dp = [nums[0]];
  max = dp[0];
  for (let i = 1; i < len; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    if (dp[i] > max) {
      max = dp[i];
    }
  }
  console.log(max);
  return max;
};

//test
maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6
maxSubArray([1]); // 1
maxSubArray([5, 4, -1, 7, 8]); // 23
