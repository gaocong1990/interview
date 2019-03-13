/**
 * 模拟实现 new 操作符
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */
function newOperator(){
    var Constructor = [].shift.call(arguments);

    if(typeof Constructor !== 'function'){
        throw 'newOperator function the first param must be a function';
    }

    // 1.创建一个全新的对象，
    // 2.并且执行[[Prototype]]链接
    // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
    var newObj = {};
    newObj.__proto__ = Constructor.prototype;


    // 3.生成的新对象会绑定到函数调用的`this`。
    // 获取到ctor函数返回结果
    var result = Constructor.apply(newObj, arguments);

    // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
    var isObject = typeof result === 'object' && result !== null;
    var isFunction = typeof result === 'function';
    if(isObject || isFunction){
        return result;
    }
    // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return newObj;
}