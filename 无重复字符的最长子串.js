/**
 * 
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

 */

/**
 * 解题思路： 字符串长度小于等于1的时候直接返回字符串长度
 * 定义左右两个指针，起始指向第一和第二个字符，右指针开始向右移动
 * 每次截取字符串从left到right-1位置的字符串，判断right位置的字符是否在字符串中
 * 如果不在字符串中，那么right指针向右移动一位，更新max为Math.max(max,right-left)
 * 若在则 left指针向右移动一位，right<length时结束循环
 */
var lengthOfLongestSubstring = function (str) {
  const sLength = str.length;
  if (sLength <= 1) return sLength;
  let left = 0; // 左指针初始位置
  let right = 1; // 右指针初始位置
  let maxLength = 0; // 最大长度
  while (right < sLength) {
    // 遍历整个字符串
    const tempStr = str.slice(left, right);
    if (tempStr.indexOf(str[right]) === -1) {
      /**right位置的字符串不在子字符中，right右移，同时计算最大值 */
      right++;
      maxLength = Math.max(maxLength, right - left);
    } else {
      /**right位置的字符串在子字符中，left右移*/
      left++;
    }
  }
  console.log(maxLength);
  return maxLength;
};

// test
lengthOfLongestSubstring('abcabcbb'); // 3
lengthOfLongestSubstring('bbbbb'); // 1
lengthOfLongestSubstring('pwwkew'); // 3
