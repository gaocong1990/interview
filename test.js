/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false; // bad case

  const { val, left, right } = root;

  if (!left && !right) {
    return val === targetSum;
  }
  const tmp = targetSum - val;
  return hasPathSum(left, tmp) || hasPathSum(right, tmp);
};
