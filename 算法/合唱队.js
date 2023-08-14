/**
 * N 位同学站成一排，音乐老师要请最少的同学出列，使得剩下的 K 位同学排成合唱队形。
 * 设K位同学从左到右依次编号为 1，2…，K ，他们的身高分别为T1,T2,···Tk，若存在i(1≤i≤K) 使得 T1<T2<···<T并且Ti>...>Tk则称这
 * K名同学排成了合唱队形。
 * 通俗来说，能找到一个同学，他的两边的同学身高都依次严格降低的队形就是合唱队形。
 * 例子：
 * 1 2 3 2 1 是一个合唱队形
 * 1 1 2 1不是合唱队形，因为前两名同学身高相等，不符合要求
 * 3 2 1 2不是合唱队形，因为找不到一个同学，他的两侧同学身高递减。
 * 你的任务是，已知所有N位同学的身高，计算最少需要几位同学出列，可以使得剩下的同学排成合唱队形。
 * 注意：不允许改变队列元素的先后顺序 且 不要求最高同学左右人数必须相等
 */
/**
 *
 * @param {number} n 一共n个人
 * @param {[]:number} arr 每个人身高的数组
 */
function fn(n, arr) {
  // 思路： 对每个位置i,求解左边递增的最大个数，求解右边递减的最大个数
  // 将两个数加起来 - 1 (i位置计算了两次，所以减一)， 就表示i位置可以组成的最大合唱队人数
  // 取所有位置的最大合唱队人数的max，用N - max即可得到最少需要去掉的人数

  let leftArr = new Array(n).fill(1); // 初始化，默认认为左边小于它的个数为0，所以i位置左边递增到位置的最长子序列长度为1；
  let rightArr = new Array(n).fill(1); // 右边的数组同理

  // 动态规划，计算leftArray
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] - arr[j] > 0) {
        leftArr[i] = Math.max(leftArr[j] + 1, leftArr[i]); // 当前结果和之前结果的最大值
      }
    }
  }

  // 动态规划，计算rightArray
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (arr[i] - arr[j] > 0) {
        rightArr[i] = Math.max(rightArr[j] + 1, rightArr[i]); // 当前结果和之前结果的最大值
      }
    }
  }
  let max = 1;
  // 遍历每个i位置的最长序列，取最大值
  for (let i = 0; i < n; i++) {
    max = Math.max(max, leftArr[i] + rightArr[i] - 1);
  }

  // n - 最大值  即为需要最少去掉的人数
  return n - max;
}

// test

console.log(fn(8, [186, 186, 150, 200, 160, 130, 197, 200]));
