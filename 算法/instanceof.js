/**
 * instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。
 * 因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，
 * 如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。
 *  */
function myInstanceof(left, right) {
  // 这里先用typeof来判断基础数据类型，如果是，直接返回false
  if (typeof left !== 'object' || left === null) return false;
  // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left); // 等同于left.__proto__
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true; //找到相同原型对象，返回true
    proto = Object.getPrototypeof(proto);
  }
}
