function insertSort(arr) { // 插入排序
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

function selectSort(arr) { // 选择排序
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                minIndex = j;
                minValue = arr[j]
            }
        }
        var tmp = minValue;
        arr[minIndex] = arr[i];
        arr[i] = tmp;
    }
    return arr
}
// 归并排序
function merge(left, right) {
    var tmp = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            tmp.push(left.shift());
        } else {
            tmp.push(right.shift());
        }
    }
    return tmp.concat(left, right)
}

function mergeSort(arr) {
    if (arr.length == 1) return arr;
    var mid = Math.floor(a.length / 2),
        left = arr.slice(0, mid);
    right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right))
}
// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    var partitionIndex = Math.floor(arr.length / 2);
    var tmp = arr[partitionIndex];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < tmp) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([tmp], quickSort(right))
}
// 快速排序
function quickSort(arr) {
    function swap(arr, right, left) {
        var tmp = arr[right];
        arr[right] = arr[left];
        arr[left] = tmp;
    }

    function partition(arr, left, right) { //分区操作，
        var pivotValue = arr[right] //最右面设为标准
        var storeIndex = left;
        for (var i = left; i < right; i++) {
            if (arr[i] <= pivotValue) {
                swap(arr, storeIndex, i);
                storeIndex++;
            }
        }
        swap(arr, right, storeIndex);
        return storeIndex //返回标杆元素的索引值
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

function bubbleSort(arr){
    var len = arr.length;
    for(var i = len -1; i > 0; i--){
        for(var j = 0 ; j < i; j++){
            if(arr[j]>arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr
}