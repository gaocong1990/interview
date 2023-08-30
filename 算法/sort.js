/**
 * 插入排序
 * 算法描述：
 * 1. 从第一个元素开始，该元素可以认为已经被排序
 * 2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
 * 3. 如果该元素（已排序）大于新元素，将该元素移到下一位置
 * 4. 重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置
 * 5. 将新元素插入到该位置后
 * 6. 重复步骤 2~5
 * 时间复杂度O(n^2)
 */
function insertSort(arr) {
  var tmp;
  for (var i = 1; i < arr.length; i++) {
    tmp = arr[i];
    for (var j = i; j >= 0; j--) {
      if (arr[j - 1] > tmp) {
        arr[j] = arr[j - 1];
      } else {
        arr[j] = tmp;
        break;
      }
    }
  }
  return arr;
}
/**
 * 选择排序
 * 直接从待排序数组中选择一个最小（或最大）数字，放入新数组中。
 * 时间复杂度O(n^2)
 */
function selectSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        minIndex = j;
      }
    }
    var tmp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = tmp;
  }
  return arr;
}
/**
 * 归并排序
 * 算法描述：
 * 1. 把 n 个记录看成 n 个长度为 l 的有序子表
 * 2. 进行两两归并使记录关键字有序，得到 n/2 个长度为 2 的有序子表
 * 3. 重复第 2 步直到所有记录归并成一个长度为 n 的有序表为止。
 * 时间复杂度O(nlogn)
 */
function merge(left, right) {
  var tmp = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      tmp.push(left.shift());
    } else {
      tmp.push(right.shift());
    }
  }
  return tmp.concat(left, right);
}
function mergeSort(arr) {
  if (arr.length == 1) return arr;
  var mid = Math.floor(a.length / 2),
    left = arr.slice(0, mid);
  right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 快速排序
 *
 * 1. 在数据集之中，选择一个元素作为”基准”（pivot）。
 * 2. 所有小于”基准”的元素，都移到”基准”的左边；所有大于”基准”的元素，都移到”基准”的右边。这个操作称为分区 (partition)操作，分区操作结束后，    基准元素所处的位置就是最终排序后它的位置。
 * 3. 对”基准”左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 * 时间复杂度O(nlogn)
 */

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  var partitionIndex = Math.floor(arr.length / 2);
  var tmp = arr[partitionIndex];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if(i === partitionIndex) continue;
    if (arr[i] < tmp) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([tmp], quickSort(right));
}

function quickSort(arr) {
  function swap(arr, right, left) {
    var tmp = arr[right];
    arr[right] = arr[left];
    arr[left] = tmp;
  }

  function partition(arr, left, right) {
    //分区操作，
    var pivotValue = arr[right]; //最右面设为标准
    var storeIndex = left;
    for (var i = left; i < right; i++) {
      if (arr[i] <= pivotValue) {
        swap(arr, storeIndex, i);
        storeIndex++;
      }
    }
    swap(arr, right, storeIndex);
    return storeIndex; //返回标杆元素的索引值
  }

  function sort(arr, left, right) {
    if (left > right) return;
    var storeIndex = partition(arr, left, right);
    sort(arr, left, storeIndex - 1);
    sort(arr, storeIndex + 1, right);
  }
  sort(arr, 0, arr.length - 1);
  return arr;
}
/**
 * 冒泡排序
 * 1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
 * 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
 * 3. 针对所有的元素重复以上的步骤，除了最后一个。
 * 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
 * 时间复杂度O(n^2)
 */
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = len - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
