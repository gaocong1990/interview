/**
 * 已知如下数组：
 * var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
 * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */

Array.prototype.falt = function () {
    return [].concat(...this.map(item => (Array.isArray(item) ? item.falt() : [item])));
}

Array.prototype.unique = function () {
    return [...new Set(this)]
}

const sort = (a, b) => a - b;

console.log(arr.falt().unique().sort(sort)); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]