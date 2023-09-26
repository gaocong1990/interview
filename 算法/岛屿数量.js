/**
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * 此外，你可以假设该网格的四条边均被水包围。
 * BFS:Breadth First Search 广度优先搜索
 * DFS:Deepth First Search 深度优先搜索
 * 相关问题：
 * 岛屿的周长（https://leetcode.cn/problems/island-perimeter/）
 * 岛屿的最大面积(https://leetcode.cn/problems/max-area-of-island/)
 * 最大人工岛(https://leetcode.cn/problems/making-a-large-island/)
 */
/**
 *
 * @param {Array} grid m*n的二维数组
 */
const islandNums = (grid) => {
  // 思路：DFS 深度优先遍历
  // 两层循环遍历grid的每个元素，当遍历到第(i,j)个元素的时候，判断这个元素是否为1，
  // 为1 则遍历它的上下左右四个元素(i,j-1)，(i,j+1)，(i-1,j)，(i+1,j)
  // 遍历到为 1的时候 将该元素置为2，表示已经遍历过
  // 遍历到0或者边界外 则返回，不用继续搜索遍历了

  const m = grid.length;
  const n = grid[0].length;

  const isInArea = (x, y) => {
    return 0 <= x && x < m && 0 <= y && y < n;
  };

  const dfs = (x, y) => {
    if (isInArea(x, y) && grid[x][y] == 1) {
      grid[x][y] = 2;
      dfs(x, y - 1);
      dfs(x, y + 1);
      dfs(x - 1, y);
      dfs(x + 1, y);
    }
  };
  // 非递归dfs
  // const dfs = (x, y) => {
  //   const stack = [[x, y]]; // 栈，先进后出
  //   while (stack.length) {
  //     const [i, j] = stack.pop(); //取数组尾的元素
  //     if (isInArea(i, j) && grid[i][j] == 1) {
  //       grid[i][j] = 2;
  //       stack.push([i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]);
  //     }
  //   }
  // };
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
};

const islandNums2 = (grid) => {
  // 思路： BFS 广度优先
  const m = grid.length;
  const n = grid[0].length;

  const isInArea = (x, y) => {
    return 0 <= x && x < m && 0 <= y && y < n;
  };
  const bfs = (x, y) => {
    const queue = [[x, y]]; // 队列，先进先出
    while (queue.length) {
      const [i, j] = queue.shift(); // 取数组头的元素
      if (isInArea(i, j) && grid[i][j] == 1) {
        grid[i][j] = 2;
        queue.push([i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]);
      }
    }
  };


  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        count++;
        bfs(i, j);
      }
    }
  }

  return count;
};

// test
const grid1 = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
]; // 1
const grid2 = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
]; // 3
console.log('--islandNums---');
console.log(islandNums(grid1));
console.log(islandNums(grid2));
console.log('--islandNums2---');
console.log(islandNums2(grid1));
console.log(islandNums2(grid2));
