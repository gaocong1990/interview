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

## Set 和 Map
