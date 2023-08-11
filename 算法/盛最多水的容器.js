/**
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量。
 * 说明：你不能倾斜容器。
 * https://leetcode.cn/problems/container-with-most-water/description/
 */

/**
 * 暴力解法，两层循环，计算所有的可能性
 */
var maxArea = function (height) {
  const len = height.length;

  let max = 0;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      const v = (j - i) * Math.min(height[j], height[i]);

      max = Math.max(max, v);
    }
  }

  return max;
};

/**
 * 滑动窗口，双指针，从两边向中间移动，计算当前窗口可以容纳水
 * 然后哪边小，就移动哪边往中间走，知道两个指针相遇
 */

var maxArea2 = function (height) {
  const len = height.length;

  let max = 0;
  let left = 0;
  let right = len - 1;
  while (left < right) {
    let min;
    const diff = right - left;
    if (height[left] < height[right]) {
      min = height[left];
      left++;
    } else {
      min = height[right];
      right--;
    }
    max = Math.max(min * diff, max);
  }
  return max;
};

console.log(maxArea2([1, 8, 6, 2, 5, 4, 8, 3, 7]));
