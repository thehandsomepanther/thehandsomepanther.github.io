$(document).ready(function () {
    $(document).scroll(function () {
        $('#scroll').css('opacity', (100 - $(this).scrollTop()) / 100);
    });
});