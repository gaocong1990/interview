const quickSort = (arr) => {
  const len = arr.length;
  if (len <= 1) return arr;
  const flag = Math.floor(len / 2);
  // 取中间的元素为基准元素， 小于该元素的push到left数组，大于该元素的push到right数组
  const tmp = arr[flag];
  const left = [];
  const right = [];

  for (let i = 0; i < len; i++) {
    if (i === flag) continue;
    if (arr[i] < tmp) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([tmp], quickSort(right));
};

console.log(quickSort([3,1,2,6,7,23,1233,5455,778]))


