/**
 * 写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字。
 * trans(123456) —— 十二万三千四百五十六
 * trans（100010001）—— 一亿零一万零一
 */
function trans(val) {
  const numChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  // 0 1 2 3
  const numUnit = ['', '十', '百', '千'];
  // 0 1 2 3 4
  // 0 4 8 12 16
  const numSection = ['', '万', '亿', '万亿', '亿亿'];

  const str = String(val ?? '');
  const len = str.length;
  let fs = [];
  let j = 0;

  for (let i = len - 1; i >= 0; i--) {
    const item = str[i];
    const fc = numChar[item];
    const unit = j % numUnit.length;
    const fn = numUnit[unit] ?? '';
    const section = j / 4;
    const ft = numSection[section] ?? '';
    let res = fc + fn + ft;
    if (item === '0') {
      res = fc;
      if (j === 0) res = '';
    }
    fs.unshift(res);
    j++;
  }

  return fs
    .map((char, index) => {
      if (index === 0 && char == '一十') {
        return '十';
      }

      return char;
    })
    .join('')
    .replace(/零+/g, '零').replace(/零+$/, '');
}
console.log(trans(123456)); // 输出: "十二万三千四百五十六"
console.log(trans(100010001)); // 输出: "一亿零一万零一"
