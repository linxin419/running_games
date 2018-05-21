/**
 * Created by kimi on 2015/9/21.
 */
! function(undefined) {
    var PreLoad = function(source, opt) {
        var cfg = opt || {};
        this.source = source;
        this.count = 0;
        this.total = source.length;
        // 加载事件
        this.onload = cfg.onload;
        this.prefix = cfg.prefix || "";
        this.init();
    };
    PreLoad.prototype.init = function() {
        var self = this;
        self.source.forEach(function(item) {
            var type = item.substr(item.lastIndexOf(".") + 1).toLowerCase(),
                src = self.prefix + item;
            switch (type) {
                case "js":
                    self.script.call(self, src);
                    break;
                case "css":
                    self.stylesheet.call(self, src);
                    break;
                case "svg":
                case "jpg":
                case "gif":
                case "png":
                case "mp3":
                case "jpeg":
                    self.image.call(self, src);
            }
        })
    };
    PreLoad.prototype.getProgress = function() {
        return Math.round(this.count / this.total * 100)
    };
    PreLoad.prototype.image = function(src) {
        var el = document.createElement("img");
        this.load(el, src);
        el.src = src;
    };
    PreLoad.prototype.stylesheet = function(src) {
        var el = document.createElement("link");
        this.load(el, src);
        el.rel = "stylesheet";
        el.type = "text/css";
        el.href = src;
        document.head.appendChild(el);
    };
    PreLoad.prototype.script = function(src) {
        var el = document.createElement("script");
        this.load(el, src);
        el.type = "text/javascript";
        el.src = src;
        document.head.appendChild(el);
    };
    PreLoad.prototype.load = function(el, src) {
        var self = this;
        el.onload = el.onerror = el.onabort = function(event) {
            self.onload && self.onload({ count: ++self.count, total: self.total, item: src, type: event.type });
        }
    };

    // todo tasks
    var tasks = ["big.gif","title1.mp3","title2.mp3", "character1_icon1.png", "character4_icon1.png", "character2_icon1.png", "character3_icon1.png", "racetrack_icon.jpg", "character2_icon6.png", "character1_icon8.png", "loading_pic.jpg", "character1_icon6.png", "page_back.jpg", "character3_icon4.png", "character4_icon6.png", "rule_icon3.png", "rule_icon4.png", "character_bg1.jpg", "character_bg4.jpg", "character_bg3.jpg", "character_bg2.jpg", "character_icon2.png", "character_icon.png", "racetrack_btn.png", "character_icon1.png"];
    var $progress = document.getElementById('j_progress');

    function loading(load) {
        var count = load.count;
        var total = load.total;
        $progress && ($progress.innerHTML = Math.round(100 * count / total) + '%');
        if (count === total) return complete();
    }

    function next(el, fn) {
        el.className += ' scaleOut';
        setTimeout(function() {
            el.parentNode.removeChild(el);
            /**
             * load结束事件
             */
            $('.animation img').attr('src', 'img/big.gif')
            $('.animation').addClass('on')

            function start() {
                $('.character').addClass('start')
                $('.animation').addClass('disnone')
            }
            setTimeout(function() { start() }, 2300)
            setTimeout(function() {
                setTimeout(function() { title1.play() }, 900)
                setTimeout(function() { title2.play() }, 1000)
            }, 1800)

            function audioAutoPlay(id) {
                var audio = document.getElementById(id);
                audio.play();
                document.addEventListener("WeixinJSBridgeReady", function() {
                    audio.play();
                }, false);
                document.addEventListener('YixinJSBridgeReady', function() {
                    audio.play();
                }, false);
            }
            audioAutoPlay('back');

            // 判断是安卓还是iOS
            var ua = navigator.userAgent.toLowerCase(); //获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
            var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1); //判断是否是苹果手机，是则是true
            if (isIos) {

            } else {

            }
            fn && fn();
        }, 800)
    }

    function complete() {
        var $loader = document.getElementById('j_loader');
        var url = '';
        reFresh();
        next($loader, function() {
            if (!url) return;
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        });
    }

    // todo prefix
    new PreLoad(tasks, { onload: loading, prefix: 'img/' });

    function reFresh() {
        orientationHandler(function() {

        });
        /**
         *
         * @param fn {function} callback
         */
        function orientationHandler(fn) {
            var win = window;
            var supportsOrientation = (typeof win.orientation == 'number' && typeof win.onorientationchange == 'object');
            var orientationEvent = supportsOrientation ? 'orientationchange' : 'resize';
            var body = document.body;
            var HTMLNode = body.parentNode;
            if (body.clientWidth > body.clientHeight) {
                HTMLNode.setAttribute('class', 'landscape');
            }
            var updateOrientation = function() {
                if (supportsOrientation) {
                    updateOrientation = function() {
                        var orientation = win.orientation;
                        switch (orientation) {
                            case 90:
                            case -90:
                                orientation = 'landscape';
                                break;
                            default:
                                orientation = 'portrait';
                        }
                        HTMLNode.setAttribute('class', orientation);
                    }
                } else {
                    updateOrientation = function() {
                        var orientation = (win.innerWidth > win.innerHeight) ? 'landscape' : 'portrait';
                        HTMLNode.setAttribute('class', orientation);
                    }
                }
                typeof fn === 'function' && fn();
                updateOrientation();
            };
            win.addEventListener(orientationEvent, updateOrientation, false);
        }
    }
}();