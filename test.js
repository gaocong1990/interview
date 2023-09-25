
function objToArray(obj) {
  return Object.keys(obj).map(key => {
    const tmp = {key};
    Object.keys(obj[key]).map(innerKey => {
      tmp.op = innerKey;
      tmp.value = obj[key][innerKey];
    })

    return tmp;
  })
}

console.log(
  objToArray({
    key1: {
      op1: "value1",
    },
    key2: {
      op2: "value2",
    },
  })
);
// result示例
// [
//     {key: 'key1', op: 'op1', value: 'value1'},
//     {key: 'key2', op: 'op2', value: 'value2'}
// ]