/** 字符串按Ascii码值升序排序
 * 字符串s, 第k个最小的 */

/**
 * 输入一个由n个大小写字母组成的字符串，按照Ascii码值从小到大的排序规则，查找字符串中第k个最小ascii码值的字母（k>=1），
 * 输出该字母所在字符串的位置索引(字符串的第一个字符位置索引为0）。
 * k如果大于字符串长度，则输出最大ascii值的字母所在字符串的位置索引，
 *如果有重复的字母，则输出字母的最小位置索引
 */

function test(s, k) {
  // 去重排序
  const uniSortedString = [
    ...new Set(
      [].slice.call(s).sort((a, b) => a.charCodeAt() - b.charCodeAt())
    ),
  ];
  let resCode;
  if (k > s.length) {
    resCode = uniSortedString[uniSortedString.length - 1];
  } else {
    uniSortedString.forEach((code, index) => {
      if (index + 1 === k) {
        resCode = code;
      }
    });
  }
  console.log(resCode);
  return s.indexOf(resCode);
}

console.log(test('sEaewaAASKLJsdefsdfASED', 100));
