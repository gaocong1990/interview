/**
 * 模拟实现 new 操作符
 * new到底做了什么事情:
 * 1. 创建一个新的对象
 * 2. 继承父类原型上的方法.
 * 3. 添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
 * 4. 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */
function newOperator() {
  var Constructor = [].shift.call(arguments);

  if (typeof Constructor !== 'function') {
    throw 'newOperator function the first param must be a function';
  }
  // var newObj = {};
  // newObj.__proto__ = Constructor.prototype;  这种写法obj.__proto__ 已弃用，影响性能

  // Object.create() 静态方法以一个现有对象作为原型，创建一个新对象。
  //1. 创建一个新的对象  2. 继承父类原型上的方法.
  let newObj = Object.create(Constructor.prototype);

  //3. 添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
  var result = Constructor.apply(newObj, arguments);

  // 4. 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof result === 'object' ? result : newObj;
}
