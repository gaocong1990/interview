###ES6箭头函数 this指向
**箭头函数函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。**
*例子*
```javascript
var foo = () => {
    console.log('箭头函数：', this.box)
}
var bar = function () {
    console.log('普通函数：', this.box)
}
var box = 10

foo.call({ box: 20 })// 箭头函数： 10
bar.call({ box: 20 })// 普通函数： 20
bar()// 普通函数： 10
```
*说明*
- 箭头函数 `foo` 里的 `this` 对象，指向的就是函数 `foo` 定义时所在的对象，即 `window`。所以调用 `foo.call({ box: 20 })` 时的 `this.box` 实际上就是 `window.box`，得到`10`；
- 普通函数 `bar` 里的`this`，指向的是 `bar` 调用时所在的对象，即 `{ box: 20 }`。所以调用 `bar.call({ box: 20 })` 时的 `this.box` 实际上就是 `{ box: 20 }.box`， 得到`20`
- 调用 `bar()` 时的 `this.box` 实际上就是 `window.box`， 得到10

**普通函数中this对象的指向是可变的，但是在箭头函数中，它是固定的。**

*另一个例子*
``` javascript
// A
function foo () {
    setTimeout(() => {
        console.log('箭头函数:', this.box)
    }, 200)
}
var box = 10

foo.call({ box: 20 })
// 箭头函数: 20

// B
function foo () {
    setTimeout(function () {
        console.log('普通函数：', this.box)
    }, 200)
}
var box = 10

foo.call({ box: 20 })
// 普通函数： 10
```
*说明*


- 场景A里 `setTimeout` 函数的参数是箭头函数，该箭头函数定义生效是在函数 `foo` 被调用时， `this` 指向的就是定义生效时所在的对象，即` { box: 20 }`，所以最终输出20。


- 场景B里 `setTimeout` 函数的参数是普通函数，等到200ms后函数执行时，`this`指向的是 `window`，所以最终输出10。
