## Math常用的方法
- `Math.abs()` 返回绝对值
- `Math.ceil()`向上取整
- `Math.floor()`向下取整
- `Math.max()` 最大值
- `Math.min()` 最小值
- `Math.round()` 四舍五入
- `Math.random()` 随机数
- `Math.pow()` 指数运算
- `Math.sqrt()` 平方根
- `Math.log()` 自然对数
- `Math.exp()` e的指数


## Array常用的方法
- 数组的创建
  ```javascript
  // 字面量
  var arr = [1,2,3]; // [1,2,3]
  // 构造方式 Array.of() 等同于 Array()
  var arr = Array(); // []
  var arr = Array(1,2,3); // [1,2,3]
  var arr = Array(3); //[,,]
  // Array.from() 将两类对象转为真正的数组：类似数组的对象和可遍历（iterable）的对象（ Set 和 Map）
  let a = {0: '1', 1: '2', 2: '3', 'length': 3};
  let arr = Array.from(a); //['1','2','3']
  // 字符串
  let arr = Array.from('array'); //['a','r','r','a','y']
  // Set、Map
  let arrset = Array.from(new Set(['func', window])); //['func', window]
  let arrMap = Array.from(new Map([1,2],[3,4],[5,6])); // [[1,2], [3,4],[5,6]]
  // 类 map 方法的使用 // 还可以接受第二个参数，用来对每个元素进行处理，将处理后的值放入返回的数组
  let theArr = Array.from([1,2,3], x => ++x); // [2,3,4]
  ```
- splice(index, num, item1, item2, ...) 添加/删除/替换 [改变原数组]
- pop() 删除数组的最后一个元素[改变原数组]
- shift() 删除数组的第一个元素[改变原数组]
- push(item1, item2, ...) 向末尾添加元素[改变原数组]
- unshift(item1, item2, ...) 向数组开头添加元素[改变原数组]
- sort() 数组的排序[改变原数组]
- reverse() 数组的反转[改变原数组]
- copyWithin(index, start, end) 数组的指定位置复制[改变原数组、ES6]
  ```javascript
  let arr = [1,2,3,4,5];
  arr.copyWithin(0,2,4); //复制了几个元素，就替代几个元素
  console.log(arr); // [3,4,3,4,5]
  ```
- fill(value, start, end) 数组的填充 [改变原数组、ES6]
  ```javascript
  let arr = new Array(3);
  arr.fill(1);//[1,1,1]
  arr.fill(2,1,3);//[1,2,2]
  ```
- slice(start, end) 拷贝数组元素 [不改变原数组] // [start,end)不包含end
- join(str) 将数组转换为字符串[不改变原数组]
- concat(arr1,arr2,arr3) 连接合并多个[数组]，返回新数组。[不改变原数组]
- indexOf(value, fromIndex) 查找数组中某元素的索引值。[不改变原数组]
- lastIndexOf(value, fromIndex) 查找指定元素在数组中的最后一个位置。[不改变原数组]
- includes(value, fromIndex) 查找数组是否包含某个元素。[不改变原数组, ES7]
  与`indexOf`的区别:
  1. `indexOf`不能识别 `NaN`,但 `includes` 可以。
  2. 当我们只需要查找是否含有时，若返回索引可能是0的情况，不方便我们直接进行一些判断操作。

遍历相关
入参：`fn(function(value, index, arr), this）`
- forEach() 按升序依次遍历数组中的值
- some() 检测数组中是否存在满足条件的元素
- every() 检测数组中的元素是否全部满足条件
- filter()过滤原数组，返回新数组
- map() 对数组中的每一个元素都进行处理，返回新的数组
- reduce((total, value, index, arr), init)数组的累加器，合并成为一个值。
  ```javascript
  let arr = [1,2,3,4];
  let sum = arr.reduce((total,value) => total + value ); //10
  let sum = arr.reduce((total,value) => total + value, 20); // 30
  ```
- find() / findIndex() 根据条件找到数组成员 [ES6]
  返回值： find()返回第一个符合条件的数组成员，若不存在返回undefined。 findIndex()返回符合条件的数组成员的索引。
- flat(depth)深度遍历展开数组， depth(可选): 提取嵌套数组的结构深度，默认为1。Infinity无线展开
- keys() 遍历键名 / values() 遍历键值/ entries() 遍历键值对
  ```javascript
  let arr = [9,8,7,6,5,4,3,2,1]
  for(let index of arr.keys()){
      console.log(index); //0,1,2,3,4...依次打印
  }
  for(let value of arr.values()){
      console.log(value); //9,8,7,6,5....依次打印
  }
  for(let [index, value] of arr.entries()){
      console.log(index,value); // 0,9  1,8  2,7
  }
  ```
## String常用的方法
- `charAt`
  charAt(index)返回字符串中`index`位置的字符，下标从 0 开始。
- `charCodeAt`
  charCodeAt(index)返回字符串中`index`位置处字符的`unicode`值。
- `concat`
  concat(str1,str2...) 方法用于连接两个或多个字符串，此方法不改变现有的字符串，返回拼接后的新的字符串。
- `fromCharcode`
  ```javascript 
  String.fromCharCode(97,98,99,120,121,122) //output: abcxyz
  ```
- `indexOf`
  返回一个字符在字符串中首次出现的位置
- `lastIndexOf`
  返回一个字符在字符串中最后一次出现的位置
- `slice`
  slice(start, [end])包括字符串从 start 开始到 end 结束（不包括 end）为止的所有字符。
- `split`
  split(delimiter, [limit])把一个字符串分割成字符串数组，返回一个字符串数组返回的数组中的字串不包括 delimiter自身。 可选的“limit”是一个整数，允许各位指定要返回的最大数组的元素个数。
  ```javascript
  console.log('xsxsxs'.split('s', 2)) // ['x','x']
  ```
- `substr`
  substr(start, [length]) 
  包含从 start处开始的 length 个字符。如果没有指定 length，那么返回的字符串包含从 start 到该字符串的结尾的字符。
- `substring`
  substring(from, [to])
  包括 start 处的字符，但不包括 stop 处的字符，to 可选，如果省略该参数，那么返回的子串会一直到字符串的结尾。
- `match`
  match(regexp) 
  根据正则表达式在字符串中搜索匹配项。如果没有找到匹配项，则返回一个信息数组或null。
  ```javascript
  var str = '2018年结束了，2019年开始了，2020年就也不远了';
  var str2 = 'xxxxx';
  var rex = /\d+/g  // 这里是定义匹配规则，匹配字符串里的1到多个数字
  str.match(rex)  //输出符合匹配规则的内容，以数组形式返回 ['2018', '2019', '2020']
  str2.match(rex) // null
  str.match('20')// 不使用正则 ["20", index: 0, input: "2018年结束了，2019年开始了"]
  ```
- `replace`
  replace(regexp/substr, replacetext/function)
  ```javascript
  var str = '2018年结束了，2019年开始了，2020年就也不远了',str1='',str2='';
  var rex = /\d+/g  // 这里是定义匹配规则，匹配字符串里的1到多个数字
  str1 = str.replace(rex, '****') //输出："****年结束了，****年开始了,****年也不远了";
  str1 = str.replace('年', ''); //2018结束了，2019开始了，2020就也不远了
  str2 = str.replace(rex, item => {
    // item =  2018 2019 2020
    var arr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    var newStr = '';
    [...item].forEach(val =>  newStr += arr[val])					
    return newStr       
  })
  console.log(str2)// 输出：贰零壹捌年结束了，贰零壹玖年开始了,贰零贰零年也不远了
  // $1、$2、...、$99	与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。
  var str = '2018年结束了，2019年开始了，2020年就也不远了';
  var rex = /(\d+)(年)/g; // 用括号括起来需要匹配的表达式
  console.log(str.replace(rex, '$1  的 $2'));// 2018  的 年结束了，2019  的 年开始了，2020  的 年就也不远了
  ```

- `search`
  search(regexp) 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，如果找到，返回与 regexp 相匹配的子串的起始位置，否则返回 -1。
  ```javascript
  var intRegex = /[0-9-\(\)+]+$/;
  var myNumber = 'sadasda9-(99';
  var isInt = myNumber.search(intRegex);
  console.log(isInt);  //output: 7
  ```
- `includes`
  includes() 方法用于检查字符串是否包含指定的字符串或字符。返回Boolean值
- `startsWith`
  startsWith() 用来检测当前字符是否是目标字符串的起始部分
- `endsWith`
  endsWith() 是用来检测是否是目标字符串的结尾部分
  ```javascript
  var str = 'Excuse me, how do I get to park road?';
  str.includes('how') // 输出：true;
  str.startsWith('Excuse')    // 输出： true;
  str.endsWith('?')   // 输出： true;
  ```
- `repeat`
  repeat() 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
  ```javascript
  var str = 'http';
  str.repeat(3)   // 输出： 'httphttphttp';
  ```
- `trim`
  trim() 方法会从一个字符串的两端删除空白字符
- `toLowerCase`
  toLowerCase()把字母转换成小写
- `toUpperCase`
  toUpperCase()把字母转换成大写
