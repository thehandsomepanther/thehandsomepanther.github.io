$(document).ready(function() {
  var mouse = {
    x: $(document).width()/2,
    y: $(document).height()/2,
    lastScrolledLeft: 0,
    lastScrolledTop: 0
  }

  $(window).mousemove(function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    followMouse(mouse);
  })

  $(window).scroll(function(e) {
    if(mouse.lastScrolledLeft != $(document).scrollLeft()){
        mouse.x -= mouse.lastScrolledLeft;
        mouse.lastScrolledLeft = $(document).scrollLeft();
        mouse.x += mouse.lastScrolledLeft;
    }
    if(mouse.lastScrolledTop != $(document).scrollTop()){
        mouse.y -= mouse.lastScrolledTop;
        mouse.lastScrolledTop = $(document).scrollTop();
        mouse.y += mouse.lastScrolledTop;
    }

    followMouse(mouse)
  })

  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $(window).scroll(function(e) {
      mouse.x = window.pageXOffset + $(document).width/2;
      mouse.y = window.pageYOffset + $(document).height/2;
      followMouse(mouse)
    })
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
    }
  }
})

function followMouse(mouse) {
  $('.image-container').each(function(i) {
    var x_center = $(this).offset().left + $(this).width()/2,
        y_center = $(this).offset().top + $(this).height()/2;

    var dist_x = (mouse.x - x_center)/30
        dist_y = (mouse.y - y_center)/10;

    $(this).css('transform', 'rotateX(' + -dist_y + 'deg) rotateY(' + dist_x + 'deg)')
    $(this).css('box-shadow', -dist_x/2 + 'px ' + -dist_y/2 + 'px ' + '0px #111')
  })
}

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
