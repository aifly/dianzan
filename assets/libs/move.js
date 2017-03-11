/*
 * by fly 2014-11-24
 */
!function (w) {
    var Util = {
        browerKernel: function () {//获取支持VisibilityState事件的浏览器的内核前缀。
            var result;
            var arr = ['webkit', 'moz', 'o', 'ms'];
            for (var i = 0; i < arr.length; i++) {
                if (typeof document[arr[i] + 'Hidden'] != 'undefined') {
                    result = arr[i];
                }
            }
            return result;
        },
          setCss3: function (obj, attr) {
            for (var i in attr) {
                var newI = i;
                if (newI.indexOf('-') > 0) {
                    var num = newI.indexOf('-');
                    newI = newI.replace(newI.substr(num, 2), newI.substr(num + 1, 1).toUpperCase());
                }
                obj.style[newI] = attr[i];
                newI = newI.replace(newI.charAt(0), newI.charAt(0).toUpperCase());
                obj.style["webkit" + newI] = attr[i];
                obj.style["moz" + newI] = attr[i];
                obj.style["ms" + newI] = attr[i];
                obj.style["o" + newI] = attr[i];
            }
            return obj;
        },
        requestAnimFrame: (function () { //用来做动画的。
            var lastTime = 0;
            var vendors = ['webkit', 'moz', 'ms'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestNextAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelNextAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                              window[vendors[x] + 'CancelRequestAnimationFrame'];
            }
            if (!window.requestNextAnimationFrame) {

                window.requestNextAnimationFrame = function (callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                    var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }
            if (!window.cancelNextAnimationFrame) {
                window.cancelNextAnimationFrame = function (id) {
                    clearTimeout(id);
                };
            }
        })(),
        getStyle: function (obj, attr) {//得到css文件里面定义的样式属性值
            return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
        },
        startMove: function (obj, json, times, fx, fn) { //运动框架
            var iCur = {};
            var startTime = now();
            for (var attr in json) {//当为透明度变化的时候.
                iCur[attr] = 0;
                if (attr === 'opacity') {
                    iCur[attr] = Math.round(this.getStyle(obj, attr) * 100);
                } else if (attr === "transformX") {
                    iCur[attr] = parseFloat(obj.getAttribute("transX")) || 0;
                } else if (attr === "transformY") {
                    iCur[attr] = parseFloat(obj.getAttribute("transY")) || 0;
                } else if (attr === "scale") {
                    iCur[attr] = parseFloat(obj.getAttribute("scale")) || 0;
                } else {
                    iCur[attr] = parseInt(this.getStyle(obj, attr)) || 0;
                }
            }
            window.cancelNextAnimationFrame(obj.timer);
            obj.timer = window.requestNextAnimationFrame(move);
            function now() {
                return (new Date()).getTime();
            }
            var _this = this;
            function move() {
                var changeTime = now();
                var scale = 1 - Math.max(0, startTime - changeTime + times) / times;
                for (var attr in json) {

                    var value = ltTween[fx](scale * times, parseFloat(iCur[attr]), parseFloat(json[attr]) - parseFloat(iCur[attr]), times);
                    //alert(value)
                    switch (attr.toLowerCase()) {
                        case "opacity":
                            obj.style.filter = 'alpha(oapcity=' + value + ')';
                            obj.style.opacity = value / 100;
                            break;
                        case "scrollTop":
                            document.body.scrollTop = value;
                            document.documentElement.scrollTop = value;
                            break;
                        case "width":
                        case "height":
                        case "left":
                        case "top":
                        case "bottom":
                        case "right":
                            if (json[attr].toString().indexOf("%") > -1) {//带百分比的距离
                                obj.style[attr] = value + '%';
                            } else {
                                obj.style[attr] = value + 'px';
                            }

                            if (json[attr].toString().indexOf("rem") > -1) {//带百分比的距离
                                obj.style[attr] = value + 'rem';
                            }

                            break;
                        case "backgroundposition"://火孤下不支持backgroundPositionY(X)
                            if (json[attr].toString().indexOf("%") > -1) {//带百分比的距离
                                obj.style[attr] = value + '%';
                            } else {
                                obj.style[attr] = value;
                            }
                            break;
                        case "transformx":
                            obj.setAttribute("transX", value);
                            var prefix = "px";
                            if (json[attr].toString().indexOf("%") > -1) {//带百分比的距离
                                prefix = "%";
                            }

                            _this.setCss3(obj, { transform: "translateX(" + value + "" + prefix + ")" })
                            break;
                        case "transformy":
                            console.log(value)
                            obj.setAttribute("transY", value);
                            var prefix = "px";
                            if (json[attr].toString().indexOf("%") > -1) {//带百分比的距离
                                prefix = "%";
                            }
                            if (json[attr].toString().indexOf("rem") > -1) {//带百分比的距离
                                prefix = "rem";
                            }
                            _this.setCss3(obj, { transform: "translateY(" + value + "" + prefix + ")" })
                            break;
                        case "scale":
                            obj.setAttribute("scale", value);
                            _this.setCss3(obj, { transform: "scale(" + value + ")" });
                            break;
                    }
                     
                }
                if (scale === 1) {
                    //_this.requestAnimFrame.cancel(obj.timer);
                    window.cancelNextAnimationFrame(obj.timer);
                    fn && typeof fn === "function" && fn.call(obj);
                }
                else {
                    obj.timer = window.requestNextAnimationFrame(move);
                }
            }
        },
       
        isWeiXin: function () {//判断一个页面是否是在微信页面打开
            var ua = window.navigator.userAgent.toLowerCase();
            return ua.match(/MicroMessenger/i) === 'micromessenger';
        }
        
    }
    w.ltUtil = Util;
}(window);

Array.prototype.unique = function () { //数组去重
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}
Array.prototype.clear = function () {//清空数组。
    this.length = 0;
}
//两端去空格函数
String.prototype.trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); }
//动画函数
!function (w) {
    var Tween = {
        //t : 当前时间   b : 初始值  c : 变化值   d : 总时间  //return : 当前的位置
        linear: function (t, b, c, d) {  //匀速
            return c * t / d + b;
        },
        easeIn: function (t, b, c, d) {  //加速曲线
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {  //减速曲线
            return -c * (t /= d) * (t - 2) + b;
        },
        easeBoth: function (t, b, c, d) {  //加速减速曲线
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInStrong: function (t, b, c, d) {  //加加速曲线
            return c * (t /= d) * t * t * t + b;
        },
        easeOutStrong: function (t, b, c, d) {  //减减速曲线
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeBothStrong: function (t, b, c, d) {  //加加速减减速曲线
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b;
            }
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        elasticIn: function (t, b, c, d, a, p) {  //正弦衰减曲线（弹动渐入）
            if (t === 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) {
                p = d * 0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        elasticOut: function (t, b, c, d, a, p) {    //正弦增强曲线（弹动渐出）
            if (t === 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) {
                p = d * 0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        elasticBoth: function (t, b, c, d, a, p) {
            if (t === 0) {
                return b;
            }
            if ((t /= d / 2) == 2) {
                return b + c;
            }
            if (!p) {
                p = d * (0.3 * 1.5);
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else {
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) {
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                    Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            }
            return a * Math.pow(2, -10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        },
        backIn: function (t, b, c, d, s) {     //回退加速（回退渐入）
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        backOut: function (t, b, c, d, s) {
            if (typeof s == 'undefined') {
                s = 3.70158;  //回缩的距离
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        backBoth: function (t, b, c, d, s) {
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            }
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        bounceIn: function (t, b, c, d) {    //弹球减振（弹球渐出）
            return c - Tween['bounceOut'](d - t, 0, c, d) + b;
        },
        bounceOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            }
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        },
        bounceBoth: function (t, b, c, d) {
            if (t < d / 2) {
                return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
            }
            return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    }
    w.ltTween = Tween;
}(window);
