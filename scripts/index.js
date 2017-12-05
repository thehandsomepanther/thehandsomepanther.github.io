if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

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
        down: '💫',
        left: '⭐️',
        right: '🌟',
        upleft: '✨',
        upright: '💫',
        downleft: '🌟',
        downright: '⭐️'
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
    },
    sheriff: {
        up: '🤠',
        down: '👇',
        left: '👢',
        right: '👢',
        upleft: '💯',
        upright: '💯',
        downleft: '💯',
        downright: '💯'
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
    var imgElems = document.querySelectorAll('[class^="img-"]')
    for (var i = 0; i < imgElems.length; i++) {
        var imgElem = imgElems[i]
        imgElem.style.display = 'none'

        if (imgElem.tagName === 'VIDEO') {
            imgElem.pause()
        }
    }
}

function drawScreen() {
    var spans = document.querySelectorAll('.canvas span')
    for (var i = 0; i < spans.length; i++) {
        var span = spans[i]
        removeEventListeners(span)
    }
    document.querySelector('.canvas').innerHTML = ''

    var font = '12px Space Mono'
    var filler = '&nbsp;'
    var canvasElement = document.querySelector('.canvas')
    var canvasWidth = canvasElement.getBoundingClientRect().width -
        (parseInt(window.getComputedStyle(canvasElement, null).getPropertyValue('padding-left')) +
        parseInt(window.getComputedStyle(canvasElement, null).getPropertyValue('padding-right')))
    var width = Math.floor(canvasWidth / 7)
    canvasElement.style.width = width * 7 + 'px'

    var textElements = document.querySelectorAll('.text')
    for (var i = 0; i < textElements.length; i++) {
        var textElement = textElements[i]
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
            parent.target = link.target
        }

        for (var j = 0; j < words.length; j++) {
            var word = words[j]

            if (length + word.length + 1 > width) {
                for (var k = 0; k < width - length; k++) {
                    var span = document.createElement('span')
                    span.innerHTML = filler
                    parent.appendChild(span)
                }

                length = 0
            }

            for (var k = 0; k < word.length; k++) {
                var ch = word[k]
                var span = document.createElement('span')
                span.innerHTML = ch
                parent.appendChild(span)
            }

            if (j !== words.length - 1) {
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

        for (var j = 0; j < width - length; j++) {
            var span = document.createElement('span')
            span.innerHTML = filler
            frag.appendChild(span)
        }

        document.querySelector('.canvas').appendChild(frag)
        document.querySelector('body').style.display = 'block'
    }

    var spans = document.querySelectorAll('.canvas span')
    var eventType = isMobile ? 'penover' : 'mouseover'
    for (var i = 0; i < spans.length; i++) {
        var span = spans[i]
        span.addEventListener(eventType, draw)
    }

    var links = document.querySelectorAll('a[class^="link-"]')
    for (var i = 0; i < links.length; i++) {
        var link = links[i]
        link.addEventListener('mouseover', showImage)
        link.addEventListener('mouseleave', hideImage)
    }
}

function triggerEvent(el, type, obj){
   if ('createEvent' in document) {
        // modern browsers, IE9+
        var e = new Event(type)
        for (var key in obj) {
            e[key] = obj[key]
        }
        el.dispatchEvent(e);
    } else {
        // IE 8
        var e = document.createEventObject()
        e.eventType = type
        el.fireEvent('on'+e.eventType, e)
    }
}

function movePen(e) {
    e.preventDefault()
    if (penActive) {
        var x, y

        if (e.type === 'touchmove') {
            x = e.touches[0].pageX - 48
            y = e.touches[0].pageY - 48
        } else {
            x = e.pageX - 48
            y = e.pageY - 48
        }

        penElement.style.left = "" + x + "px";
        penElement.style.top = "" + y + "px";
        var rect = penElement.getBoundingClientRect()
        var span = allElementsFromPoint(rect.left, rect.top).filter(function(el) {
            return el.tagName === 'SPAN'
        })[0]

        if (span !== undefined) {
            triggerEvent(span, 'penover', {
                pageX: rect.left,
                pageY: rect.top
            })
        }
    }
}

var penActive = false
var penElement = document.querySelector('.pen')
var oldWidth
var isMobile = 'ontouchstart' in window
document.addEventListener('DOMContentLoaded', function() {
    drawScreen()

    document.querySelector('input[name="reset"]').addEventListener('mousedown', drawScreen)
    document.querySelector('select').addEventListener('change', changeMode)
    window.addEventListener("resize", function() {
        if (window.innerWidth !== oldWidth) {
            drawScreen()
        }
        oldWidth = window.innerWidth
    })

    if (isMobile) {
        penElement.className += ' is-shown'
        penElement.addEventListener('touchstart', function() { penActive = true })
        penElement.addEventListener('touchend', function() { penActive = false })
        penElement.addEventListener('touchmove', movePen)
        penElement.addEventListener('mousedown', function() { penActive = true })
        penElement.addEventListener('mouseup', function() { penActive = false })
        penElement.addEventListener('mousemove', movePen)
    }
})
