const fn = (sum, array) => {
  if (array.length === 1 && array[0] === sum) return true;
  for (let i = 0; i < array.length; i++) {
    const newArray = [...array];
    newArray.splice(i, 1);
    const minus = fn(sum - array[i], newArray);

    const div = fn(sum / array[i], newArray);

    const add = fn(sum + array[i], newArray);

    const multiy = fn(sum * array[i], newArray);

    if (minus || div || add || multiy) {
      return true;
    }
  }

  return false;
};

console.log(fn(24, [7, 2, 1, 10]));
console.log(fn(24, [4, 1, 8, 7]));
console.log(fn(24, [1, 2, 1, 2]));

