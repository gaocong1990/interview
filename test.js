var largestIsland = function (grid) {
  // 思路： 类似计算最大岛屿面积，设置index初始值2，每计算完一个岛屿将map[index]=岛屿的面积，然后index+1
  // 完成后会将grid变成 同一个岛屿具有相同的index编号，index编号对应的面积存储在map中
  // 再次遍历grid中为0的元素，判断上下左右四个块是否在范围内，是否为0，不为0则取出index，在map里取面积，加上面积
  // 另外要确保四个元素的index不重复，重复的index不用计算，表示是同一个岛屿的
  // 最后要考虑特殊情况，整个grid没有0，则表示只有一个最大的岛屿，返回map[2]就ok了
  const n = grid.length;
  let index = 2;
  const map = {};
  const isInArea = (x, y) => 0 <= x && x < n && 0 <= y && y < n;

  const dfs = (x, y, index) => {
    if (isInArea(x, y) && grid[x][y] == 1) {
      grid[x][y] = index;
      return (
        1 +
        dfs(x, y - 1, index) +
        dfs(x, y + 1, index) +
        dfs(x - 1, y, index) +
        dfs(x + 1, y, index)
      );
    } else {
      // 越界或者为0，都不增加面积
      return 0;
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        map[index] = dfs(i, j, index);
        index++;
      }
    }
  }
  let result = 0;
  const caclAreas = (x, y, keyArr) => {
    if (!isInArea(x, y)) return 0;
    let key = grid[x][y];
    if (key != 0 && keyArr.indexOf(key) === -1) {
      keyArr.push(key);
      return map[key];
    } else {
      return 0;
    }
  };
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 0) {
        let sum = 1;
        let keysArr = [];
        // 判断上下左右的块是否在范围内，在的话是否不为0，取出index，在map里取面积，全部加起来，更新最大值
        sum +=
          caclAreas(i, j - 1, keysArr) +
          caclAreas(i, j + 1, keysArr) +
          caclAreas(i - 1, j, keysArr) +
          caclAreas(i + 1, j, keysArr);

        result = Math.max(result, sum);
      }
    }
  }

  return result === 0 ? map[2] : result;
};
