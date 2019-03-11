/**
 * instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。
 * 因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，
 * 如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。
 *  */
function new_instance_of(leftVaule, rightVaule) {
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
        if (leftVaule === null) {
            return false;
        }
        if (leftVaule === rightProto) {
            return true;
        }
        leftVaule = leftVaule.__proto__
    }
}