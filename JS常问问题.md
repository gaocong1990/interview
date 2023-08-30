## 原型和原型链

原型：每个函数在创建的时候，都会生成一个属性 prototype，这个属性指向一个对象，这个对象就是此函数的原型对象。**最主要的作用就是用来存放实例对象的公有属性和公有方法**，该原型对象中有个属性为 constructor，指向该函数。
![image](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2b435c6ed064418969d80abcddb44e6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
原型链：每个通过`构造函数`创建出来的`实例对象`，其本身有个属性`__proto__`，这个属性会指向该`实例对象`的`构造函数的原型对象`，当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会通过它的**proto**隐式属性，找到它的`构造函数的原型对象`，如果还没有找到就会再在其`构造函数的原型对象`的**proto**中查找，这样一层一层向上查找就会形成一个链式结构，称为**原型链**

## 闭包的理解

闭包就是能够读取其他函数内部变量的函数。由于在 Javascript 语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解**定义在一个函数内部的函数**。所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
用途：1. 读取函数内部的变量; 2. 让这些变量的值始终保持在内存中

## 作用域链

作用域分为：

- 全局作用域
- 函数作用域
- 块级作用域：在大括号中使用 let 和 const 声明的变量存在于块级作用域中。在大括号之外不能访问这些变量。

当在 Javascript 中使用一个变量的时候，首先会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域
如果在全局作用域里仍然找不到该变量，它就会在全局范围内隐式声明该变量(非严格模式下)或是直接报错

## 继承

JavaScript 常见的继承方式：
![image](https://yqfile.alicdn.com/img_25bb56eac56d39c40af000c015c19593.png)

- 原型链继承

  核心：将父类的实例作为子类的原型

  ```javascript
  SubType.prototype = new SuperType() 
  // 所有涉及到原型链继承的继承方式都要修改子类构造函数的指向，否则子类实例的构造函数会指向SuperType。
  SubType.prototype.constructor = SubType;
  ```

  优点：父类方法可以复用
  缺点：
  1. 父类的引用属性会被所有子类实例共享
  2. 子类构建实例时不能向父类传递参数

- 构造函数继承

  ```javascript
  function Parent(){
    this.name = 'parent1';
  }

  Parent.prototype.getName = function () {
      return this.name;
  }

  function Child(){
      Parent1.call(this);
      this.type = 'child'
  }
  // 缺点： 只能继承父类的实例属性和方法，不能继承原型属性或者方法
  let child = new Child();
  console.log(child);  // 没问题
  console.log(child.getName());  // 会报错
  ```

- 组合继承

  ```javascript
  function Parent3 () {
    this.name = 'parent3';
    this.play = [1, 2, 3];
  }

  Parent3.prototype.getName = function () {
    return this.name;
  }
  function Child3() {
    // 第二次调用 Parent3()
    Parent3.call(this);
    this.type = 'child3';
  }

  // 第一次调用 Parent3()
  Child3.prototype = new Parent3();
  // 手动挂上构造器，指向自己的构造函数
  Child3.prototype.constructor = Child3;
  // 缺点： Parent3 执行了两次，造成了多构造一次的性能开销
  ```

- 原型式继承

  ```javascript
  // Object.create的实现
  function objectCreat(o){
    function F(){}
    F.prototype = o;
    return new F();
  }

  SubType.prototype = objectCreate(SuperType.prototype);
  ```

- 寄生式继承
  核心：使用原型式继承获得一个目标对象的浅复制，然后增强这个浅复制的能力。
  ```javascript
    SubType.prototype = objectCreate(SuperType.prototype);
    // //以某种方式来增强这个对象
    SubType.prototype.fn = () => {}
  ```

- 寄生组合式继承

  ```javascript
  function inheritPrototype(subType, superType){
      var prototype = Object.create(superType.prototype); // 创建了父类原型的浅复制
      prototype.constructor = subType;             // 修正原型的构造函数
      subType.prototype = prototype;               // 将子类的原型替换为这个原型
  }

  function SuperType(name){
      this.name = name;
      this.colors = ["red", "blue", "green"];
  }

  SuperType.prototype.sayName = function(){
      alert(this.name);
  };

  function SubType(name, age){
      SuperType.call(this, name);
      this.age = age;
  }
  // 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
  inheritPrototype(SubType, SuperType);
  SubType.prototype.sayAge = function(){
      alert(this.age);
  }
  ```

## for in 和 for of 的区别

`for...in `主要用于遍历对象的可枚举属性（包括原型链上的属性）。`for...in` 遍历的顺序可能与属性的创建顺序不一致，因此不适用于需要按特定顺序遍历的场景。它的语法为：

```javascript
const obj = { a: 1, b: 2, c: 3 };
for (const key in object) {
  // 使用 object[key] 获取属性值
  console.log(key, obj[key]); // 输出 "a 1", "b 2", "c 3"
}
```

`for...of` 主要用于遍历具有迭代器（Iterator）的数据结构，如数组、字符串、Set、Map 等。`for...of` 遍历的顺序与数据结构中元素的顺序一致，适用于需要按特定顺序遍历的场景。它的语法为：

```javascript
const arr = ['x', 'y', 'z'];
for (const value of iterable) {
  // value 为当前遍历的元素值
  console.log(value); // 输出 "x", "y", "z"
}
```

## JS 为什么要进行变量提升

- 提高性能：解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
- 容错性更好：声明提升还可以提高 JS 代码的容错性，使一些不规范的代码也可以正常执行

## typeof 和 instanceOf

`typeof` 和 `instanceof` 都是用于检查变量类型的操作符，但它们的用途和返回结果有所不同。

**typeof**

`typeof` 是一元操作符，用于获取变量的基本数据类型。它的语法为：

```javascript
typeof operand;
```

`typeof` 返回一个字符串，表示 `operand` 的数据类型。可能的返回值包括：

- "undefined"：表示变量未定义或值为 `undefined`。
- "boolean"：表示变量是布尔值（`true` 或 `false`）。
- "number"：表示变量是数字（整数或浮点数）。
- "string"：表示变量是字符串。
- "bigint"：表示变量是大整数（BigInt 类型）。
- "symbol"：表示变量是符号（Symbol 类型）。
- "function"：表示变量是函数。
- "object"：表示变量是对象或 `null`。

需要注意的是，`typeof` 无法区分对象、数组、正则表达式等复杂数据类型，它们的类型都会被认为是 "object"。

**instanceof**

`instanceof` 是一个二元操作符，用于检查对象是否是某个构造函数的实例。它的语法为：

```javascript
object instanceof constructor;
```

`instanceof` 返回一个布尔值，表示 `object` 是否是 `constructor` 的实例。如果 `object` 是 `constructor` 的实例或继承自 `constructor.prototype`，则返回 `true`，否则返回 `false`。

`instanceof` 的主要用途是区分对象的具体类型，例如：

```javascript
const arr = [1, 2, 3];
const obj = { a: 1, b: 2 };
const str = 'hello';

console.log(arr instanceof Array); // 输出 true
console.log(obj instanceof Object); // 输出 true
console.log(str instanceof String); // 输出 false（str 是原始字符串，而非 String 对象）
```

`typeof` 主要用于获取基本数据类型，而 `instanceof` 主要用于检查对象类型和继承关系

## 基础类型和对象类型有什么不一样？

基本类型主要为以下 6 种：

- Number
- String
- Boolean
- Undefined
- null
- symbol（是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险）

对象类型，也叫做引用类型：

- Object
- Array
- Function
  除了上述说的三种之外，还包括 Date、RegExp、Map、Set 等

基本数据类型和引用数据类型存储在内存中的位置不同：

- 基本数据类型存储在栈中
- 引用类型的对象存储于堆中

基础类型赋值赋的是值，而引用类型赋值的是地址。

## Promise 相关

解决异步回调的地狱问题，链式操作减低了编码难度，代码可读性明显增强
`promise`对象仅有三种状态：

- pending（进行中）
- fulfilled（已成功）
- rejected（已失败）

特点

- 对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态
- 一旦状态改变（从`pending`变为`fulfilled`和从`pending`变为`rejected`），就不会再变，任何时候都可以得到这个结果

实例方法: then/catch/finally

Promise 构造函数存在以下方法：

- all() 所有都 fulfilled 才 resolve，有一个 rejected 就 reject
- race() 有一个 fulfilled 就 resolve，有一个 rejected 就 reject
- allSettled() 所有这些参数实例都返回结果，不管是 fulfilled 还是 rejected，包装实例才会结束
- any() 有一个 fulfilled 就 resolve，所有都 rejected 才 reject
- resolve() 返回一个 resolved 状态的 Promise 对象
- reject() 返回一个 rejected 状态的 Promise 对象

简单实现一个 promise

```javascript
// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    // 默认状态为 PENDING
    this.status = PENDING;
    // 存放成功状态的值，默认为 undefined
    this.value = undefined;
    // 存放失败状态的值，默认为 undefined
    this.reason = undefined;
    // 存放成功的回调函数队列
    this.onFulfilledCallbacks = [];
    // 存放失败的回调函数队列
    this.onRejectedCallbacks = [];

    // 调用此方法就是成功
    let resolve = (value) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this.onFulfilledCallbacks.forEach(item => item(value));
        this.status = FULFILLED;
        this.value = value;
      }
    }

    // 调用此方法就是失败
    let reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this..onRejectedCallbacks.forEach(item => item(reason));
        this.status = REJECTED;
        this.reason = reason;
      }
    }

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve,reject)
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error)
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(() => { onFulfilled(this.value) })
      this.onRejectedCallbacks.push(() => { onRejected(this.reason) })
    }

    return this;
  }
}
```

## 装饰器 Decorator

ES6 中 Decorator，其本质就是一个普通的函数，用于扩展类属性和类方法

```javascript
class soldier {}
function strong(target) {
  target.AK = true;
}

@strong
class soldier {}

soldier.AK; // true
```

使用 Decorator 两大优点：

1. 代码可读性变强了，装饰器命名相当于一个注释
2. 在不改变原有代码情况下，对原来功能进行扩展

如果想要传递参数，可以在装饰器外层再封装一层函数

```javascript
function testable(isTestable) {
  return function (target) {
    target.isTestable = isTestable;
  };
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable; // true
```

类属性的装饰

当对类属性进行装饰的时候，能够接受三个参数：

- 类的原型对象
- 需要装饰的属性名
- 装饰属性名的描述对象

```javascript
function readonly(target, name, descriptor) {
  descriptor.writable = false; // 将可写属性设为false
  return descriptor;
}

class Person {
  @readonly
  name() {
    return `${this.first} ${this.last}`;
  }
}

//等同于
readonly(Person.prototype, 'name', descriptor);
```

## 类型转换机制

```javascript
Number(undefined); // NAN
Number(null); // 0
Number(true); // 1
Number(false); // 0
Number([5]); // 5 // 对象：通常转换成NaN(除了只包含单个数值的数组)

parseInt('32a3'); //32

String(1); // "1"
String(true); // "true"
String(undefined); // "undefined"
String(null); // "null"
String({ a: 1 }); // "[object Object]"
String([1, 2, 3]); // "1,2,3"

Boolean(NaN); // false
Boolean(new Boolean(false)); // true

null == undefined; // true
null === undefined; //false
NaN == NaN; // false
false == undefined; // false
false == null; // false
' \t\r\n' == 0; // true
```

## this的理解
this是一个特殊的关键字，它在函数执行过程中会自动绑定到一个特定的对象上。**this的值取决于函数调用的上下文**

## 事件循环
事件循环 的概念非常简单。它是一个在 JavaScript 引擎等待任务，执行任务和进入休眠状态等待更多任务这几个状态之间转换的无限循环。
同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就是事件循环。
异步任务还可以细分为`微任务`与`宏任务`
常见的微任务有：
  - Promise.then
  - MutaionObserver
  - process.nextTick（Node.js）

常见的宏任务有：
  - script (可以理解为外层同步代码)
  -setTimeout/setInterval
  -I rendering/UI事件
  -postMessage、MessageChannel
  -setImmediate、I/O（Node.js）

## 常见内存泄漏情况
1. 意外使用全局变量，比如函数内部使用全局变量：
  ```javascript
  function foo(arg) {
      bar = "this is a hidden global variable";
  }
  或者：
  function foo2(){
  this.varable = "hello"
  }
  foo2();//调用后，this指向window全局变量
  ```
2. 定时器，定时器不清除，一直占用内存，得不到释放，或者在定时器内调用外部函数，得不到释放；
3. 闭包，内部函数引用外部函数变量，得不到释放，比如：
  ```javascript
  function bindEvent() {
    var obj = document.createElement('XXX');
    var unused = function () {
      console.log(obj, '闭包内引用obj obj不会被释放');
    };
    obj = null; // 解决方法
  }
  ```
4. 不清理dom元素的引用，比如：
  ```javascript
  const refA = document.getElementById('refA');
  document.body.removeChild(refA); // dom删除了
  console.log(refA, 'refA'); // 但是还存在引用能console出整个div 没有被回收
  refA = null;
  console.log(refA, 'refA'); // 解除引用
  ```
5. 监听事件的解除，监听的时候addEventListener，在不监听的时候要使用remveEventListener;


