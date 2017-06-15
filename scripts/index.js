(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name))
                running = false;
            })
        };
        obj.addEventListener(type, func)
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize")
})()

function removeEventListeners(e) {
    var clone = e.cloneNode()
    while (e.firstChild) {
        clone.appendChild(e.lastChild)
    }
    e.parentNode.replaceChild(clone, e)
}

function allElementsFromPoint(x, y) {
    var element, elements = [];
    var old_visibility = [];
    while (true) {
        element = document.elementFromPoint(x, y);
        if (!element || element === document.documentElement) {
            break;
        }
        elements.push(element);
        old_visibility.push(element.style.visibility);
        element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.visibility = old_visibility[k];
    }
    elements.reverse();
    return elements;
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

function evaluate(a, b) {
    if (Math.abs(a - b) < THRESHOLD) {
        return 'EQUAL'
    } else {
        return a > b ? 'GREATER' : 'LESS'
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
        this.innerHTML = mode.right
    } else if (delta.x == 'LESS' && delta.y == 'EQUAL') {
        this.innerHTML = mode.left
    } else if (delta.x == 'EQUAL' && delta.y == 'LESS') {
        this.innerHTML = mode.up
    } else if (delta.x == 'EQUAL' && delta.y == 'GREATER') {
        this.innerHTML = mode.down
    } else if (delta.x == 'GREATER' && delta.y == 'GREATER') {
        this.innerHTML = mode.downright
    } else if (delta.x == 'GREATER' && delta.y == 'LESS') {
        this.innerHTML = mode.upright
    } else if (delta.x == 'LESS' && delta.y == 'GREATER') {
        this.innerHTML = mode.downleft
    } else if (delta.x == 'LESS' && delta.y == 'LESS') {
        this.innerHTML = mode.upleft
    }

    prev = curr
}

function changeMode(e) {
    mode = drawModes[e.currentTarget.value]
}

function showImage(e) {
    var imgClass = '.img-' + e.currentTarget.className.split('-')[1]
    var imgElem = document.querySelector(imgClass)

    if (imgElem !== null) {
        imgElem.style.display = 'block'
        if (imgElem.tagName === 'VIDEO') {
            imgElem.play()
        }
    }
}

function hideImage(e) {
    for (var imgElem of document.querySelectorAll('[class^="img-"]')) {
        imgElem.style.display = 'none'

        if (imgElem.tagName === 'VIDEO') {
            imgElem.pause()
        }
    }
}

function drawScreen() {
    var spans = document.querySelectorAll('.canvas span')
    for (var span of spans) {
        removeEventListeners(span)
    }
    document.querySelector('.canvas').innerHTML = ''

    var font = '12px Space Mono'
    var filler = '&nbsp;'
    var width = Math.floor(window.innerWidth / 7)

    for (var textElement of document.querySelectorAll('.text')) {
        var length = 0
        var frag = document.createDocumentFragment()
        var parent = frag
        var text = textElement.innerHTML
        var words = text.split(" ")

        if (textElement.closest('a') !== null) {
            var link = textElement.closest('a')
            parent = document.createElement('a')
            parent.href = link.href
            parent.className = link.className
        }

        for (var i = 0; i < words.length; i++) {
            var word = words[i]

            if (length + word.length > width) {
                for (var j = 0; j < width - length; j++) {
                    var span = document.createElement('span')
                    span.innerHTML = filler
                    parent.appendChild(span)
                }

                length = 0
            }

            for (var ch of word) {
                var span = document.createElement('span')
                span.innerHTML = ch
                parent.appendChild(span)
            }

            if (i !== words.length - 1) {
                var span = document.createElement('span')
                span.innerHTML = filler
                parent.appendChild(span)
                length += word.length + 1
            } else {
                length += word.length
            }
        }

        if (parent !== frag) {
            frag.appendChild(parent)
        }

        for (var i = 0; i < width - length; i++) {
            var span = document.createElement('span')
            span.innerHTML = filler
            frag.appendChild(span)
        }

        document.querySelector('.canvas').appendChild(frag)
        document.querySelector('body').style.display = 'block'
    }

    var spans = document.querySelectorAll('.canvas span')
    for (var span of spans) {
        span.addEventListener('mouseover', draw)
    }

    var links = document.querySelectorAll('a[class^="link-"]')
    for (var link of links) {
        link.addEventListener('mouseover', showImage)
        link.addEventListener('mouseleave', hideImage)
    }
}

function triggerEvent(el, type, obj){
   if ('createEvent' in document) {
        // modern browsers, IE9+
        var e = new Event(type);
        for (var key in obj) {
            e[key] = obj[key]
        }
        el.dispatchEvent(e);
    } else {
        // IE 8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on'+e.eventType, e);
    }
}

function movePen(e) {
    e.preventDefault()
    var x, y
    if (penActive) {
        if (e.type === 'touchmove') {
            x = e.touches[0].pageX
            y = e.touches[0].pageY
        } else {
            x = e.pageX
            y = e.pageY
        }
    }

    penElement.style.left = "" + x + "px";
    penElement.style.top = "" + y + "px";

    var span = allElementsFromPoint(x, y).filter(function(el) {
        return el.tagName === 'SPAN'
    })[0]

    if (span !== undefined) {
        triggerEvent(span, 'mouseover', {
            pageX: x,
            pageY: y
        })
    }
}

var penActive = false
var penElement = document.querySelector('.pen')
document.addEventListener('DOMContentLoaded', function() {
    drawScreen()
    document.querySelector('input[name="reset"]').addEventListener('mousedown', drawScreen)
    document.querySelector('select').addEventListener('change', changeMode)
    window.addEventListener("optimizedResize", drawScreen)

    penElement.addEventListener('touchstart', function() { penActive = true })
    penElement.addEventListener('touchend', function() { penActive = false })
    penElement.addEventListener('touchmove', movePen)
    penElement.addEventListener('mousedown', function() { penActive = true })
    penElement.addEventListener('mouseup', function() { penActive = false })
    penElement.addEventListener('mousemove', movePen)
})
