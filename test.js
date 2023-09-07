// for
async function loop(arr) {
  for (let i = 0; i < arr.length; i++) {
    let result = await asyncFunction(arr[i]);
    console.log(result);
  }
}
loop([1, 2, 3]);
async function asyncFunction(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value * 2), 200);
  });
}

// // forEach
// async function loop(arr) {
//   arr.forEach(async (value) => {
//     let result = await asyncFunction(value);
//     console.log(result);
//   });
// }
// loop([1, 2, 3]);
// async function asyncFunction(value) {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(value * 2), 200);
//   });
// }
