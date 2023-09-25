function midSearch(arr, val) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === val) {
      return mid;
    } else if (arr[mid] > val) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

console.log(midSearch([1, 2, 3, 4, 5, 6, 7, 8], 4));
