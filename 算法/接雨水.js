/**
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * https://leetcode.cn/problems/trapping-rain-water/description/
 */

/**
 * @param {number[]} height
 * @return {number}
 * 思路：从两端向中间滑动，来计算能接多少雨水，维护左边最高leftMax和右边最高rightMax，
 * 计算i处能接到的最大雨水，依赖的leftMax和rightMax的短边，Math.min(leftMax, rightMax) - height[i]
 * 每次由短边向中间移动，若移动长边的话会导致当前的计算有可能不成立，因为移动长边后可能会导致下一个边比当前的短边还短，当前的计算结果就无效了
 */
var trap = function (height) {
  const len = height.length;

  /**
   * 初始化变量
   */
  let left = 0;
  let right = len - 1;
  let leftMax = 0;
  let rightMax = 0;
  let result = 0;

  /**
   * 开始循环，结束条件left < right
   */
  while (left < right) {
    // 更新左右最高值
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (height[left] < height[right]) {
      result += leftMax - height[left];
      left++;
    } else {
      result += rightMax - height[right];
      right--;
    }
  }

  return result;
};

// test

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5])); // 9
