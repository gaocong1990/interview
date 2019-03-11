function add(x){
    var sum = function(y){
        x = x + y;
        return sum
    }

    sum.toString = function(){
        return x
    }

    return sum;
}