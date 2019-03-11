// 深拷贝的实现
// JSON.parse(JSON.stringfy(source))
function deepClone(source) {
    function isObject(obj) {
        return typeof obj === 'object' && obj !== null;
    }
    if (!isObject(source)) return source;
    var result = Object.prototype.toString.call(source).toLowerCase() === '[object array]' ? [] : {};
    for (var i in source) {
        if (source.hasOwnProperty(i)) {
            if (isObject(source[i])) {
                result[i] = deepClone(source[i])
            } else {
                result[i] = source[i];
            }
        }
    }
    return result;
}