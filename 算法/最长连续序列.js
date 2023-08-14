/**
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 */
var longestConsecutive = function (nums) {
  if (nums.length <= 1) {
    return nums.length;
  }

  //思路1： 先对数组进行排序，然后顺序遍历
  // 当nums[i+1] = nums[i] + 1 时 更新最长连续序列长度
  // 当nums[i+1] = nums[i] 时 continue
  // 其他情况重置起始位置，最长值重置为1
  // nums.sort((a,b) => a -b);

  // let max = 1;
  // let cur = 1;

  // for(let i = 1; i < nums.length; i++){
  //     if(nums[i] === nums[i - 1] + 1){
  //         cur++
  //     }else if(nums[i] === nums[i - 1]){
  //         continue
  //     }else{
  //         max = Math.max(max, cur);
  //         cur = 1;
  //     }
  // }
  // max = Math.max(max, cur);

  // return max;

  // 思路2：建立set去重，每个数字i，如果set中不存在i-1，则它可以作为连续序列的第一个数字，
  // 遍历set中的所有数字，对于满足这样条件的i
  // 开始在set中递增寻找i+1，直到返回false，记录当前的长度，更新到最长长度上
  // 然后继续下一个这样的i
  let set = new Set(nums);

  let max = 1;

  for (let num of set) {
    let curNum = num;
    if (!set.has(curNum - 1)) {
      cur = 1;
      while (set.has(curNum + 1)) {
        curNum++;
      }
      max = Math.max(max, curNum - num + 1);
    }
  }

  return max;
};
