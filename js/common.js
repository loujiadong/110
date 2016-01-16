$(function() {

	'use strict';

    var clickEvent = (document.ontouchstart!==null) ? 'click' : 'touchstart';
    var transitionEvent = whichTransitionEvent();
    var animationEvent = whichAnimationEvent();
    // var mySlider, setClassFunc;
    var sliderOpts = {
        wrap: '.wrapper',
        item: '.page',
        lastLocate: false,
        noslide: [0, 1, 2, 3, 4],
        speed: 0,
        // index: 3,
        onslide: function (index) {
            // clearTimeout(setClassFunc);
            // $('.point')[0].className = 'point animation';
            // setClassFunc = setTimeout(function() {
            //     $('.point')[0].className = 'point animation page' + (index + 1);
            //     $('.point').data('page', index);
            // }, index === 4 ? 0 : 2200);

            typeof MtaH5 !== 'undefined' && MtaH5.clickStat('slide' + index);

            // 鍒濆鍖�
            $('.point')[0].className = 'point animation';
            var currentPage = index + 1;
            if (index !== 4) {
                // setTimeout(function() {
                $('.page' + currentPage + ' h2.page_title').one(animationEvent, function() {
                    $('.point')[0].className = 'point animation page' + currentPage;
                    $('.point').data('page', index);
                });
                // }, 2200);
            } else {
                $('.point')[0].className = 'point animation page' + currentPage;
                $('.point').data('page', index);
            }
        }
    };


    function whichTransitionEvent(){
        var t,
            el = document.createElement("fakeelement");

        var transitions = {
            "transition"      : "transitionend",
            "OTransition"     : "oTransitionEnd",
            "MozTransition"   : "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        }

        for (t in transitions){
            if (el.style[t] !== undefined){
                return transitions[t];
            }
        }
    }

    function whichAnimationEvent(){
        var t,
            el = document.createElement("fakeelement");

        var animations = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        }

        for (t in animations){
            if (el.style[t] !== undefined){
                return animations[t];
            }
        }
    }

    // 棰勫姞杞藉姩鐢�
    new preloader({
        files: preload,
        progress: function(err, response, percent) {
            $('.percent').text(percent + '%');
        },
        complete: function() {
            // 闅愯棌鍔犺浇鍣�
            $('.preloader').addClass('loaded');
            $('.preloader').on(animationEvent, function() {
                $('.preloader').remove();
                setTimeout(function() {
                    $('.point .avatar').remove();
                }, 200);
            });

            window.mySlider = new iSlider(sliderOpts);
            bgAudio.play();
        }
    });

    // 棣栭〉鐐瑰嚮缁跨偣鍒囨崲鍒扮浜岄〉
    $(document).on(clickEvent, '.point', function() {
        var current     = $('.point').data('page');
        var currentPage = current + 1;
        var isPlayed    = $('.point').hasClass('page' + currentPage);
        if (typeof current !== 'undefined' && current < 4 && isPlayed) {
            // mySlider.slideTo(current + 1);
            mySlider.next();
        }
    });

    // 閲嶆柊鍥為【鎸夐挳
    $(document).on(clickEvent, '.replay, .point.page5', function() {
        mySlider.slideTo(0);
        bgAudio.play();
        typeof MtaH5 !== 'undefined' && MtaH5.clickStat('replay');
    });

    // 鑳屾櫙闊充箰鎺у埗
    var bgMusic = $('#bgMusic');
    var bgMusicContr = $('#bgMusicContr');
    var bgAudio = document.getElementById("bgMusic");
    $(document).on(clickEvent, '#bgMusicContr', function(e) {
        var $this = $(this);
        if (!$this.hasClass('playing')) {
            document.getElementById("bgMusic").play();
        } else {
            document.getElementById("bgMusic").pause();
        }
    });

    // 鎾斁浜嬩欢
    bgMusic.on('play', function() {
        bgMusicContr.addClass('playing');
    });

    // 鏆傚仠浜嬩欢
    bgMusic.on('pause', function() {
        bgMusicContr.removeClass('playing');
    });

    // 瀵逛笉鏀寔鑷姩鎾斁鐨勮澶囦娇鐢ㄤ竴娆℃€х殑 touchstart 浜嬩欢瑙﹀彂
    $(document).one('touchstart', function() {
        bgAudio.play();
    });

    // 寰俊鍒嗕韩
    var shareTitle = '褰撲綘鎵撳紑杩欎釜锛屼綘涓庡井淇＄殑鏁呬簨灏辫繖鏍峰彂鐢熶簡';
    var shareDesc  = '2016 寰俊鍏紑璇� PRO 鐗�';
    var shareLink  = 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/getmyrelationwithwx?action=getme';
    var shareImg   = 'https://support.weixin.qq.com/zh_CN/htmledition/getmyrelationwithwx/images/share.jpg';

    document.addEventListener('WeixinJSBridgeReady', function() {
        WeixinJSBridge.on('menu:share:appmessage', function() {
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid": "",
                "img_url": shareImg,
                "img_width": "120",
                "img_height": "120",
                "link": shareLink,
                "desc": shareDesc,
                "title": shareTitle
            }, function(res) {
                // 鍒嗕韩鍒拌亰澶╁悗鍥炶皟鍑芥暟
                typeof MtaH5 !== 'undefined' && MtaH5.clickStat('sendAppMessage');
            });
            return false;
        });
        WeixinJSBridge.on('menu:share:timeline', function() {
            WeixinJSBridge.invoke('shareTimeline', {
                "appid": "",
                "img_url": shareImg,
                "img_width": "120",
                "img_height": "120",
                "link": shareLink,
                "desc": shareDesc,
                "title": shareTitle
            }, function(res) {
                // 鍒嗕韩鍒版湅鍙嬪湀鍚庡洖璋冨嚱鏁�
                typeof MtaH5 !== 'undefined' && MtaH5.clickStat('shareTimeline');
            });
            return false;
        });
    }, false);

});