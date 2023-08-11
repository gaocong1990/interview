const fn = (m, n) => {
  if (n === 0) {
    return 0;
  }

  return m + fn(m, n - 1);
};

console.log(fn(3, 6));
