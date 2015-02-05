$(document).ready(function () {
    var nav_down = false;

    $(document).scroll(function () {
        $('#scroll').css('opacity', (100 - $(this).scrollTop()) / 100);
    });

    $('.nav-square').click(function () {
        if (nav_down) {
            $('.nav-square').animate({
                top: "-90px"
            }, 200, function () {});
            nav_down = false;
        } else {
            $('.nav-square').animate({
                top: "0"
            }, 200, function () {});
            nav_down = true;
        };
    });

});