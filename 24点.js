/**
 * 给定一个长度为4的整数数组 cards 。你有 4 张卡片，每张卡片上都包含一个范围在 [1,9] 的数字。您应该使用运算符 ['+', '-', '*', '/'] 和括号 '(' 和 ')' 将这些卡片上的数字排列成数学表达式，以获得值24。
 * 你须遵守以下规则:
 * 除法运算符 '/' 表示实数除法，而不是整数除法。
 * 例如， 4 /(1 - 2 / 3)= 4 /(1 / 3)= 12 。
 * 每个运算都在两个数字之间。特别是，不能使用 “-” 作为一元运算符。
 * 例如，如果 cards =[1,1,1,1] ，则表达式 “-1 -1 -1 -1” 是 不允许 的。
 * 你不能把数字串在一起
 * 例如，如果 cards =[1,2,1,2] ，则表达式 “12 + 12” 无效。
 * 如果可以得到这样的表达式，其计算结果为 24 ，则返回 true ，否则返回 false 。
 */

const judgePoint24 = (nums) => {
  /**
   * 思路： 递归求解，先选出两个数，用这个两个数进行加减乘除运算；加和乘是满足交换律的，减和除要考虑a-b/b-a a/b b/a两种情况；
   * 另外除法还要考虑被除数不能为0
   * 两个数计算完的结果和剩余的两个数组成三个数，然后再计算是否能够得出24点
   * 裁剪分支： 有任何一个分支计算出结果，就可以结束其他分支的递归
   */
  let len = nums.length;

  if (len === 1) {
    return Math.abs(24 - nums[0]) < 1e-9; // 因为除法涉及到小数点
  }

  let isValid = false;
  let restNums = []; // 剩下的数

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      // 两层循环，遍历所有的两个数组合

      // 去掉 i 和 j位置后剩下的数字
      restNums = [...nums];
      restNums.splice(Math.max(i,j), 1);
      restNums.splice(Math.min(i,j), 1);

      let ni = nums[i];
      let nj = nums[j];
      // 加法计算
      isValid = isValid || judgePoint24([...restNums, ni + nj]);

      // 乘法计算
      isValid = isValid || judgePoint24([...restNums, ni * nj]);

      //减法计算
      isValid = isValid || judgePoint24([...restNums, ni - nj]);
      isValid = isValid || judgePoint24([...restNums, nj - ni]);

      //除法计算, 保证被除数不为0
      if(nj !== 0){
        isValid = isValid || judgePoint24([...restNums, ni / nj]);
      }

      if(ni !== 0){
        isValid = isValid || judgePoint24([...restNums, nj / ni]);
      }

      if(isValid){
        return true;
      }

    }
  }

  // 循环递归完还是没返回，则认为无解
  return false;
};

// test

console.log(judgePoint24([1,2,1,2]));
console.log(judgePoint24([4, 1, 8, 7]))
