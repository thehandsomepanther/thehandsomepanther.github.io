if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

} else {
  $.fn.scrollTo = function(target, options, callback) {
    if (typeof options == 'function' && arguments.length == 2) {
      callback = options;
      options = target;
    }
    var settings = $.extend({
      scrollTarget: target,
      offsetTop: 50,
      duration: 500,
      easing: 'swing'
    }, options);
    return this.each(function() {
      var scrollPane = $(this);
      var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
      var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
      scrollPane.animate({
        scrollTop: scrollY
      }, parseInt(settings.duration), settings.easing, function() {
        if (typeof callback == 'function') {
          callback.call(this);
        }
      });
    });
  }

  $(document).ready(function() {


    previous_active = false;
    var offsetNum = $('.dropdown li').outerHeight(true);

    $('html, body').animate({
      scrollTop: $('.intro').offset().top - .05 * $(window).height()
    }, 0);

    $('.dropdown .active').click(function() {
      previous_active = this;
      showDropdown($("li").index(this));
    });

    $('.dropdown').mouseleave(function() {
      if(previous_active) {
        hideDropdown($("li").index(previous_active));
      }
    });

    $('.dropdown-wrapper')
      .delegate('.dropdown .active', 'mouseover',
        function() {
          if ($(".dropdown .active").length == 1) {
            previous_active = this;
            showDropdown($("li").index(this));
          }
      })
      .delegate('.bio.active', 'click',
        function() {
          shiftDropdown(1, offsetNum);
          $(this).addClass('active');
          $('body').scrollTo(0);
      })
      .delegate('.things.active', 'click',
        function() {
          shiftDropdown(2, offsetNum);
          $(this).addClass('active');
      })
      .delegate('.code.active', 'click',
        function() {
          shiftDropdown(3, offsetNum);
          $(this).addClass('active');
          $('body').scrollTo($('.code-section').offset().top - 50);
      })
      .delegate('.design.active', 'click',
        function() {
          shiftDropdown(4, offsetNum);
          $(this).addClass('active');
          $('body').scrollTo($('.design-section').offset().top - 50);
      });

      setTimeout(function() {
        $('.dropdown .active').mouseover();
      }, 200)

      setTimeout(function() {
        $('.dropdown .active').mouseleave();
      }, 1000)
      

  });

  function showDropdown(i) {
    $ ('.dropdown').children('li').each(function(j) {
      var that = this;

      setTimeout(function() {
        $(that).addClass('active');
      }, 80 * Math.abs(i - j));
    });
  }

  function hideDropdown(i) {
    $('.dropdown').children('li').each(function(j) {
      var that = this;

      if (that != previous_active) {
        setTimeout(function() {
          $(that).removeClass('active');
        }, 80 * Math.abs(i - j));
      }
    });
  }

  function shiftDropdown(i, offsetNum) {
    topOffset = (i * -offsetNum) + "px";
    $('.dropdown-wrapper').animate({
      top: topOffset
    }, 200);

    $('.dropdown').children('li').each(function(j) {
      var that = this;

      if (i != j + 1) {
        $(that).removeClass('active');
      } else {
        $(that).addClass('active');
        previous_active = that;
      }
    });
  }
}
