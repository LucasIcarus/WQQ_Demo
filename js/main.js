$(document).ready(function () {

    var h = $(window).width(),
        e;

    function setFullpage() {
        $("#fullpage").fullpage({
            navigation: true,
            navigationPosition: "right",
            showActiveTooltip: true,
            verticalCentered: false,
            keyboardScrolling: true,
            css3: false,
            scrollingSpeed: 700,
            autoScrolling: true,
            easingcss3: "ease-in"
        });
        return true;
    }

    function setFade() {
        var wrapper = $(".allbg .banner"),
            info = $(".first-line .item"),
            info_xs = $(".first-line-xs .item"),
            r = 0;
        $(".section").fadeIn();
        wrapper.eq(0).show();
        setInterval(function () {
            r++;
            var e = r - 1;
            if (r > wrapper.length - 1) {
                r = 0;
            }
            $(wrapper).stop().fadeOut();
            $(wrapper[r]).stop().fadeIn(2e3);
            info.stop().fadeOut();
            $(info[r]).stop().fadeIn(2e3);
            info_xs.stop().fadeOut();
            $(info_xs[r]).stop().fadeIn(2e3);
        }, 5 * 1e3);
    }

    function setSecondRow() {
        var container_2 = $(".second.area");
        container_2.hover(function () {
            if (h < 768) {
                return
            }
            var img_1 = $(this).find("img")[0];
            var img_2 = $(this).find("img")[1];
            $(img_1).hide();
            $(img_2).show();
            $(this).find(".txt").stop().animate({opacity: 0}, 500)
        }, function () {
            if (h < 768) {
                return
            }
            var img_1 = $(this).find("img")[0];
            var img_2 = $(this).find("img")[1];
            $(img_2).hide();
            $(img_1).show();
            $(this).find(".txt").stop().animate({opacity: 1}, 500)
        });
        if (g_is_ie) {
            var c = $(".js-action-second-img-1");
            var l = $(".js-action-second-img-2");
            $(l).hide();
            $(c).show()
        }
    }

    function setHeightRight() {
        var e = $(window).height();
        $(".section:first-child").height(e);
        $(".page-3").css({height: e});
        if (g_is_ie) {
            $(".section").css({height: e + "px !important"});
            if (n > 950) {
                $(".js-action-ie-fixed").addClass("ie-fix");
                $("body").removeClass("body-fix")
            } else {
                $(".js-action-ie-fixed").removeClass("ie-fix");
                $("body").addClass("body-fix")
            }
        }
    }


    setFade();
    setSecondRow();
    setHeightRight();
    if (h > 767) {
        e = setFullpage()
    }
    $(window).resize(function () {
        if (h > 767 && !e) {
            e = setFullpage()
        } else if (h < 768 && e) {
            $.fn.fullpage.destroy("all");
            e = null;
        }
        setHeightRight();
    });
});


