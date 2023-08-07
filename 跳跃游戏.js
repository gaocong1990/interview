/**
 * 给定一个非负整数数组 nums ，你最初位于数组的第一个下标
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 判断你是否能够到达最后一个下标。
 */

var canJump = function(nums) {
  //思路：定义变量cover,表示当前可以覆盖到哪个下标，初始值为nums[0],循环遍历cover内的所有角标，然后动态更新cover = Math.max(cover, nums[i]+i)可以覆盖的角标范围 
  // 如果cover >= nums.length - 1, 则表示可以到达最后一个角标

  let cover = nums[0];
  const maxCover = nums.length  - 1;

  for(let i = 0; i <= cover; i++){
      cover = Math.max(cover, nums[i] + i);

      if(cover >= maxCover){
          return true
      }
  }

  return false
};