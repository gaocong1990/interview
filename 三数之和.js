/**给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意： 答案中不可以包含重复的三元组。

示例：

给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ] 
*/
var threeSum = function (nums) {
  /**
   * 思路：对数组排序，设置三个指针，i，left=i+1，right=nums.length-1
   * 以i遍历数组长度，若nums[i]>0,则break，返回当前结果
   * nums[i] === nums[i-1] continue 去重
   * 判断 sum = nums[i] + nums[left] + nums[right]
   * sum > 0 right--
   * sum < 0 left++
   * sum == 0   找到答案时，双指针同时收缩 left++ right--
   * 此时还需要去重
   * nums[l] === nums[l + 1] left++
   * nums[r] === nums[r - 1] right--
   */

  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      break;
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        left++;
        right--;
      }
    }
  }
  console.log(result);
  return result;
};

// test

threeSum([-1, 0, 1, 2, -1, -4]);
