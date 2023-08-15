/**
 * 合并K个排序链表
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

var mergeKLists = function (lists) {
  const len = lists.length;
  if (len === 0 || !lists) return null; // bad case
  //  解法1：循环往第一个链表上合并 暴力合并
  let result = lists[0];
  for (let i = 1; i < len; i++) {
    result = mergeTwoLists(result, lists[i]);
  }

  return result;

  // 解法2：分治
  return merge(lists, 0, lists.length - 1);
};
/**
 * 合并两个有序链表
 */
const mergeTwoLists = (a, b) => {
  if (!a || !b) return a ? a : b;
  const res = new ListNode();
  let cur = res;
  let pa = a;
  let pb = b;
  while (pa && pb) {
    if (pa.val - pb.val < 0) {
      cur.next = pa;
      pa = pa.next;
    } else {
      cur.next = pb;
      pb = pb.next;
    }
    cur = cur.next;
  }
  cur.next = pa ? pa : pb;

  return res.next;
};
// 递归合并
const merge = (lists, left, right) => {
  if (left == right) return lists[left];
  const mid = left + Math.ceil((right - left) / 2);
  const l1 = merge(lists, left, mid);
  const l2 = merge(lists, mid + 1, right);
  return mergeTwoLists(l1, l2);
};
