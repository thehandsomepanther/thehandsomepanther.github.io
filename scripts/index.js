String.prototype.width = function(font) {
    var f = font || '12px arial',
        o = $('<span>' + this + '</span>')
        .css({
            'position': 'absolute',
            'float': 'left',
            'white-space': 'nowrap',
            'visibility': 'hidden',
            'font': f
        })
        .appendTo($('body')),
        w = o.width();
    o.remove();
    return w;
}

String.prototype.height = function(font) {
    var f = font || '12px arial',
        o = $('<span>' + this + '</span>')
        .css({
            'position': 'absolute',
            'float': 'left',
            'white-space': 'nowrap',
            'visibility': 'hidden',
            'font': f
        })
        .appendTo($('body')),

        h = o.height();
    o.remove();
    return h;
}

var THRESHOLD = 5;
var prev = {
    x: undefined,
    y: undefined
}

var drawModes = {
    lines: {
        up: '|',
        down: '|',
        left: '–',
        right: '–',
        upleft: '\\',
        upright: '/',
        downleft: '/',
        downright: '\\'
    },
    arrows: {
        up: '↑',
        down: '↓',
        left: '←',
        right: '→',
        upleft: '↖',
        upright: '↗',
        downleft: '↙',
        downright: '↘'
    },
    dots: {
        up: '░',
        down: '░',
        left: '░',
        right: '░',
        upleft: '░',
        upright: '░',
        downleft: '░',
        downright: '░'
    },
    twinkle: {
        up: '✨',
        down: '✨',
        left: '✨',
        right: '✨',
        upleft: '✨',
        upright: '✨',
        downleft: '✨',
        downright: '✨'
    },
    redacted: {
        up: '▇',
        down: '▇',
        left: '▇',
        right: '▇',
        upleft: '▇',
        upright: '▇',
        downleft: '▇',
        downright: '▇'
    }
}
var mode = drawModes.lines

$(document).ready(function() {
    var font = '12px Space Mono'
    var filler = '&nbsp;'
    var width = Math.floor(window.innerWidth / filler.width(font))
    var height = Math.floor(window.innerHeight / filler.height(font))

    for (var textElement of $('.text')) {
        var frag = document.createDocumentFragment()
        var parent = frag
        var text = textElement.innerHTML
        if (textElement.closest('a')) {
            parent = textElement.closest('a')
        }

        for (var ch of text) {
            var span = document.createElement('span')
            span.innerHTML = ch
            parent.appendChild(span)
        }

        if (parent !== frag) {
            frag.appendChild(parent)
        }

        for (var i = 0; i < width - text.length; i++) {
            var span = document.createElement('span')
            span.innerHTML = filler
            frag.appendChild(span)
        }

        textElement.remove()
        $('body').append(frag)
        document.querySelector('body').style.display = 'block'
    }

    // var frag = document.createDocumentFragment()
    // for (var i = 0; i < width * height; i++) {
    //     var span = document.createElement('span')
    //     span.innerHTML = filler
    //     frag.appendChild(span)
    // }
    //
    // $('body').append(frag)
    $('span').on('mouseover', draw)
    $('select').on('change', changeMode)
    $('a[class^="link-"]').on('mouseover', showImage)
    $('a[class^="link-"]').on('mouseleave', hideImage)
})

function evaluate(a, b) {
    if (Math.abs(a - b) < THRESHOLD) {
        return 'EQUAL'
    } else {
        return a > b ? 'GREATER' : 'LESS';
    }
}

function draw(e) {
    var curr = {
        x: e.pageX,
        y: e.pageY
    }

    var delta = {
        x: evaluate(curr.x, prev.x),
        y: evaluate(curr.y, prev.y)
    }

    if (delta.x == 'GREATER' && delta.y == 'EQUAL') {
        this.innerHTML = mode.right;
    } else if (delta.x == 'LESS' && delta.y == 'EQUAL') {
        this.innerHTML = mode.left;
    } else if (delta.x == 'EQUAL' && delta.y == 'LESS') {
        this.innerHTML = mode.up;
    } else if (delta.x == 'EQUAL' && delta.y == 'GREATER') {
        this.innerHTML = mode.down;
    } else if (delta.x == 'GREATER' && delta.y == 'GREATER') {
        this.innerHTML = mode.downright;
    } else if (delta.x == 'GREATER' && delta.y == 'LESS') {
        this.innerHTML = mode.upright;
    } else if (delta.x == 'LESS' && delta.y == 'GREATER') {
        this.innerHTML = mode.downleft;
    } else if (delta.x == 'LESS' && delta.y == 'LESS') {
        this.innerHTML = mode.upleft;
    }

    prev = curr;
}

function changeMode(e) {
    mode = drawModes[e.currentTarget.value];
}

function showImage(e) {
    var imgClass = '.img-' + e.currentTarget.className.split('-')[1]
    document.querySelector(imgClass).style.display = 'block';
}

function hideImage(e) {
    for (var img of document.querySelectorAll('img[class^="img-"]')) {
        img.style.display = 'none';
    }
}
