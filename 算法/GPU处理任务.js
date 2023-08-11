/**
 * 为了充分发挥GPU算力，需要尽可能多的将任务交给GPU执行，现在有一个任务数组，
 * 数组元素表示在这1秒内新增的任务个数且每秒都有新增任务，
 * 假设GPU最多一次执行n个任务，一次执行耗时1秒，
 * 在保证GPU不空闲情况下，最少需要多长时间执行完成
 */

function dealFn(n, taskArr) {
  let cost = 0; // 总耗时
  let remainTaskCount = 0; // 堆积剩余任务数
  // 遍历任务数组
  taskArr.forEach((taskCount) => {
    /**当前1s内的任务数小于GPU的处理能力，当前1s内直接处理完， cost加1s */

    /**
     * 当前1s处理不完，先看之前是否有剩余任务，有加起来看是否大于n,不大于则当前1s处理完了，cost加1s
     * 大于n则处理n个剩余的继续堆积，最后数组处理完后处理剩下所有的remainTaskCount
     */
    const allTaskCount = remainTaskCount + taskCount;
    if (allTaskCount > n) {
      remainTaskCount = allTaskCount - n;
    }
    cost += 1;
  });
  if (remainTaskCount) {
    cost += Math.ceil(remainTaskCount / n);
  }

  return cost;
}

console.log(dealFn(3, [1, 2, 3, 4, 5, 1]));
