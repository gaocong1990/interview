/**
请实现一个 add 函数，满足以下功能 
add(1); 	// 1
add(1)(2);  	// 3
add(1)(2)(3)；  // 6
add(1)(2, 3);   // 6
add(1, 2)(3);   // 6
add(1, 2, 3);   // 6

*/

function add() {
  let args = [...arguments];
  let addfun = function () {
    args.push(...arguments);
    return addfun;
  };
  addfun.toString = function () {
    return args.reduce((a, b) => {
      return a + b;
    });
  };
  return addfun;
}