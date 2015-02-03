$(document).ready(function () {

    $('#contact-circle').click(function () {
        $('#contact-circle').css("top", "-25px").css("right", "-25px");
        $('#contact-circle').animate({
            height: "300px"
        }, {
            duration: 100,
            queue: false
        });
        $('#contact-circle').animate({
            width: "300px"
        }, {
            duration: 100,
            queue: false
        });
        $('#contact-circle-text').html("Jump to:<br><a href='#anchor-design'>design</a><br><a href='#anchor-code'>code</a>");
        $('#contact-circle-text').css("left", "45px");
        $('#contact-circle:hover').css('cursor', 'auto');
    });

    $(document).mouseup(function () {
        $('#contact-circle').css("top", "-10px").css("right", "-10px");
        $('#contact-circle').animate({
            height: "100px"
        }, {
            duration: 100,
            queue: false
        });
        $('#contact-circle').animate({
            width: "100px"
        }, {
            duration: 100,
            queue: false
        });
        $('#contact-circle-text').addClass('notransition');
        $('#contact-circle-text').html('<i class="fa fa-bars fa-3x"></i>');
        $('#contact-circle-text').css("left", "30%");
        $('#contact-circle-text').removeClass('notransition');
        $('#contact-circle:hover').css('cursor', 'pointer');
    });

    $(document).scroll(function () {
        $('#scroll').css('opacity', 100 - $(this).scrollTop());
    });

    $('#resume_link').mouseenter(function () {
        $('.tint:before').css('background', 'rgba(0,0,0, 0.8)');
    });
});