## 原型和原型链
原型：每个函数在创建的时候，都会生成一个属性prototype，这个属性指向一个对象，这个对象就是此函数的原型对象。**最主要的作用就是用来存放实例对象的公有属性和公有方法**，该原型对象中有个属性为constructor，指向该函数。
![image](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2b435c6ed064418969d80abcddb44e6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
原型链：每个通过`构造函数`创建出来的`实例对象`，其本身有个属性`__proto__`，这个属性会指向该`实例对象`的`构造函数的原型对象`，当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会通过它的__proto__隐式属性，找到它的`构造函数的原型对象`，如果还没有找到就会再在其`构造函数的原型对象`的__proto__中查找，这样一层一层向上查找就会形成一个链式结构，称为**原型链**


## for in 和 for of 的区别
`for...in `主要用于遍历对象的可枚举属性（包括原型链上的属性）。`for...in` 遍历的顺序可能与属性的创建顺序不一致，因此不适用于需要按特定顺序遍历的场景。它的语法为：
``` javascript
const obj = { a: 1, b: 2, c: 3 };
for (const key in object) {
  // 使用 object[key] 获取属性值
  console.log(key, obj[key]); // 输出 "a 1", "b 2", "c 3"
}
```
`for...of` 主要用于遍历具有迭代器（Iterator）的数据结构，如数组、字符串、Set、Map 等。`for...of` 遍历的顺序与数据结构中元素的顺序一致，适用于需要按特定顺序遍历的场景。它的语法为：
``` javascript
const arr = ['x', 'y', 'z'];
for (const value of iterable) {
  // value 为当前遍历的元素值
  console.log(value); // 输出 "x", "y", "z"
}
```
## JS为什么要进行变量提升
- 提高性能：解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
- 容错性更好：声明提升还可以提高JS代码的容错性，使一些不规范的代码也可以正常执行

## typeof 和 instanceOf
`typeof` 和 `instanceof` 都是用于检查变量类型的操作符，但它们的用途和返回结果有所不同。

**typeof**

`typeof` 是一元操作符，用于获取变量的基本数据类型。它的语法为：

```javascript
typeof operand
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
object instanceof constructor
```

`instanceof` 返回一个布尔值，表示 `object` 是否是 `constructor` 的实例。如果 `object` 是 `constructor` 的实例或继承自 `constructor.prototype`，则返回 `true`，否则返回 `false`。

`instanceof` 的主要用途是区分对象的具体类型，例如：

```javascript
const arr = [1, 2, 3];
const obj = { a: 1, b: 2 };
const str = "hello";

console.log(arr instanceof Array); // 输出 true
console.log(obj instanceof Object); // 输出 true
console.log(str instanceof String); // 输出 false（str 是原始字符串，而非 String 对象）
```

`typeof` 主要用于获取基本数据类型，而 `instanceof` 主要用于检查对象类型和继承关系

## 基础类型和对象类型有什么不一样？
基本类型主要为以下6种：
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
除了上述说的三种之外，还包括Date、RegExp、Map、Set等

基本数据类型和引用数据类型存储在内存中的位置不同：
- 基本数据类型存储在栈中
- 引用类型的对象存储于堆中

基础类型赋值赋的是值，而引用类型赋值的是地址。
