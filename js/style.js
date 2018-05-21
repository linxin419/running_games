(function($) {
    var oWidth, oHeight;
    //初始化字体
    var resetFontSize = function() {
        oWidth = $(window).width();
        oHeight = $(window).height();
        $('html').css("font-size", parseInt(oWidth / 75 * 10) + "px");
    }
    resetFontSize();
    $(window).resize(function() {
        resetFontSize();
    })
}(jQuery))

$(function() {

    /**
     * 跑步动画
     */
    
    $('.rule .btn').click(function() {
        $('.swiper-container').hide()
        $('.racetrack').show()
    })

    var num = 0
    $('.racetrack .btn').click(function() {
        $('.racetrack .character').removeClass('Starting')
        $('.racetrack .character').removeClass('no')
        num += 1
        var distance = num * 25
        $('.racetrack').stop().animate({
            'background-position-x': '-' + distance + 'px'
        }, function() {
            $('.racetrack .character').addClass('no')
        })
        $('.racetrack .distance').text(distance + '米')
        if (num == 1) {
            setTimeout(function() { $('.racetrack .btn').hide() }, 30000)
            var s = 29;
            setInterval(function() {
                if (s < 0) {
                    $('.racetrack .time p').text('00')
                } else if (s == 0) {
                    $('.racetrack .character').addClass('no')
                    setTimeout(function() {
                        $('.racetrack').hide();
                        $('.reward').show()
                    }, 900)
                    $('.racetrack .time p').text('00')
                } else if (s < 10) {
                    $('.racetrack .time p').text('0' + s + 's')
                } else {
                    $('.racetrack .time p').text(s + 's')
                }
                s--;
            }, 1000)
        }
    })

    /**
     * tem测试
     */
    $('.reward .btn span').click(function() {
        $(this).parents('.reward').hide().siblings('.fail').show()
    })


    /**
     * 音乐
     */
    var run = document.getElementById("run");
    window.addEventListener('shake', shakeEventDidOccur, false);

    function shakeEventDidOccur(obj) { 
        run.play();
    }
    var run = document.getElementById("run");
    document.addEventListener("WeixinJSBridgeReady", function() { 
        run.load();
    }, false);

    var back = document.getElementById("back");
    window.addEventListener('shake', shakeEventDidOccur, false);

    function shakeEventDidOccur(obj) { 
        back.play();
    }
    var back = document.getElementById("back");
    document.addEventListener("WeixinJSBridgeReady", function() { 
        back.load();
    }, false);

    var back = document.getElementById("back");
    window.addEventListener('shake', shakeEventDidOccur, false);

    function shakeEventDidOccur(obj) { 
        back.play();
    }

    function music() {
        var title1 = document.getElementById("title1");
        window.addEventListener('shake', shakeEventDidOccur, false);

        function shakeEventDidOccur(obj) { 
            title1.play();
        }
        var title1 = document.getElementById("title1");
        document.addEventListener("WeixinJSBridgeReady", function() { 
            title1.load();
        }, false);

        var title2 = document.getElementById("title2");
        window.addEventListener('shake', shakeEventDidOccur, false);

        function shakeEventDidOccur(obj) { 
            title2.play();
        }
        var title2 = document.getElementById("title2");
        document.addEventListener("WeixinJSBridgeReady", function() { 
            title2.load();
        }, false);
    }

    // 判断是安卓还是iOS
    var ua = navigator.userAgent.toLowerCase(); //获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1); //判断是否是苹果手机，是则是true
    if (isIos) {

        music()
        // run.play();

    } else {

    }

    /**
     * 微信返回刷新
     * @return {[type]} [description]
     */
    function pushHistory() {
        window.addEventListener("popstate", function(e) {
            window.location.reload()

            //window.history.back();
            //在历史记录中后退,这就像用户点击浏览器的后退按钮一样。

            //window.history.go(-1);
            //你可以使用go()方法从当前会话的历史记录中加载页面（当前页面位置索引值为0，上一页就是-1，下一页为1）。

            //self.location=document.referrer;
            //可以获取前一页面的URL地址的方法,并返回上一页。
        }, false);
        var state = {
            title: "",
            url: "#"
        };
        window.history.pushState(state, "", "#");
    };

    pushHistory();

    /**
     * 轮播插件
     */

    var mySwiper = new Swiper('.swiper-container', {
        // autoplay: true, //可选选项，自动滑动
        direction: 'vertical',

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
})