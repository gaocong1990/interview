function add(a, b) {
    var arr = [];
    var lenA = a.length;
    var lenB = b.lenght;
    var len = lenA > lenB ? lenA : lenB;
    if (lenA > lenB) {
        for (var i = 0; i < lenA - lenB; i++) {
            b = '0' + b;
        }
    } else {
        for (var i = 0; i < lenB - lenA; i++) {
            a = '0' + a;
        }
    }

    var aTemp = a.split('').reverse();
    var bTemp = b.split('').reverse();
    var carryNum = 0;
    for(var i = 0; i < len; i++){
        temp = Number(aTemp[i]) + Number(bTemp[i]) + carryNum
        temp > 9 ? (arr[i] = temp - 10,carryNum = 1) : (arr[i] = temp,carryNum = 0);
    }

    if(carryNum == 1){
        arr[len] = 1
    }

    return arr.reverse().join();

}