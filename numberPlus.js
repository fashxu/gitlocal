/**
 * Created by yxh on 2017/9/8.
 */


/**
 * 多数字运算 支持浮点数
 * 调用方法：numberPlus.accAdd(a,b)
 */

(function(undefined){
    "use strict" //严格模式
    var _global;
    function result(args,fn){
        var argsArr = Array.prototype.slice.call(args);
        if(argsArr.length > 0){
            return argsArr.reduce(fn);
        } else {
            return 0;
        }
    }
    var numberPlus={
        accAdd:function(){
            return result(arguments,function(total,cur){
                var r1,r2,m;
                try{r1=total.toString().split(".")[1].length}catch(e){r1=0}
                try{r2=cur.toString().split(".")[1].length}catch(e){r2=0}
                m=Math.pow(10,Math.max(r1,r2))
                return (total*m+cur*m)/m;
            });
        },
        accSub:function(){
            return result(arguments,function(total,cur){
                var r1,r2,m,n;
                try{r1=total.toString().split(".")[1].length}catch(e){r1=0}
                try{r2=cur.toString().split(".")[1].length}catch(e){r2=0}
                m=Math.pow(10,Math.max(r1,r2))//动态控制精度长度
                n = (r1 >= r2) ? r1 : r2;
                return ((total*m-cur*m)/m).toFixed(n);
            });
        },
        accMul:function(){
            return result(arguments,function(total,cur){
                var m = 0, s1 = total.toString(), s2 = cur.toString();
                try{m += s1.split(".")[1].length}catch(e){}
                try{m += s2.split(".")[1].length}catch(e){}
                return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
            });
        },
        accDiv:function(){
            return result(arguments,function(total,cur){
                var t1 = 0, t2 = 0, r1, r2;
                try {t1 = total.toString().split(".")[1].length}catch (e) {}
                try {t2 = cur.toString().split(".")[1].length}catch (e) {}
                r1 = Number(total.toString().replace(".", ""));
                r2 = Number(cur.toString().replace(".", ""));
                return (r1 / r2) * Math.pow(10, t2 - t1);
            });
        },
        accSur:function(){
            return result(arguments,function(total,cur){
                var t1 = 0, t2 = 0, r1, r2;
                try {t1 = total.toString().split(".")[1].length}catch (e) {}
                try {t2 = cur.toString().split(".")[1].length}catch (e) {}
                r1 = Number(total.toString().replace(".", ""));
                r2 = Number(cur.toString().replace(".", ""));
                return (r1 % r2) * Math.pow(10, t2 - t1);
            });
        }
    };
    //加入全局对象
    _global = (function(){ return this || (0,eval)('this'); }());   //(0,eval)其实就是eval 只是部分ie无法直接运行eval，所以只能(0,eval)
    if (typeof module !== "undefined" && module.exports) {
        module.exports = numberPlus;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return numberPlus;});
    } else {
        !('numberPlus' in _global) && (_global.numberPlus = numberPlus);
    }
}());


/*
with (numberPlus){
    var a=0.3,b=2.2,c=4
    console.log(accAdd(a,b))
    console.log(accSub(a,b))
    console.log(accMul(a,b))
    console.log(accDiv(30,6,5,2))
    console.log(accSur(a,b))
}*/
console.log(numberPlus.accAdd(2,3))
