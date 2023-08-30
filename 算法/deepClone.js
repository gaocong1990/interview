// 深拷贝的实现
// JSON.parse(JSON.stringfy(source))
function deepClone(source) {
  function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
  }
  if (!isObject(source)) return source;
  var result =
    Object.prototype.toString.call(source).toLowerCase() === '[object array]'
      ? []
      : {};
  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      if (isObject(source[i])) {
        result[i] = deepClone(source[i]);
      } else {
        result[i] = source[i];
      }
    }
  }
  return result;
}

// 浅拷贝
function shallowClone(obj) {
  const newObj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}
