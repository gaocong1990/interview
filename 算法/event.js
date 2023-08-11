    /**
     * [description]  黏性事件
     */
const events = (function () {
        var __this, listen, trigger, one, remove, l, t, anony;
        __this = this, l = {}, t = {}, anony = function () {};
        listen = function (key, eventfn) {
            if (l[key]) {
                l[key].push(eventfn || anony);
            } else {
                l[key] = [eventfn || anony];
            }
            t[key] && eventfn.apply(__this, t[key]); //先triggger后listen的情况
        };
        trigger = function () {
            var key = [].shift.call(arguments);
            var ls = l[key];
            if (ls && ls.length) {
                for (var i = 0, len = ls.length; i < len; i++) {
                    var fn = ls[i];
                    fn.apply(__this, arguments);
                }
            } else {
                t[key] = arguments; //无listen,保存trigger
            }
        }
        one = function (key, eventfn) {
            remove(key);
            return listen(key, eventfn); //只触发一次，如果有相同的key
        };
        remove = function (key) {
            l[key] = void 0;
            t[key] = void 0;
        };
        return {
            listen: listen,
            one: one,
            remove: remove,
            trigger: trigger
        }
    })();