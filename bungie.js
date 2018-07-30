(function() {
    
    // get the bungie bar elements
    var bungie = document.getElementById("bungie"),
        leftdiv = document.getElementById("left"),
        rightdiv = document.getElementById("right"),
        list = bungie.getElementsByTagName("UL")[0],
        listitems = list.getElementsByTagName("LI"),
        currentIndex = 0,
        listwidth = bungie.scrollWidth,
        visiblewidth = 0,
        currentScroll = 0,
        maxScroll = 0,
        leftbutton,
        rightbutton;

    // initialize
    setBungieWidth();

    window.onresize = setBungieWidth;

    function setBungieWidth() {
        // calculate the visible width of the bungie 
        visiblewidth = Math.ceil(window.innerWidth - ((leftdiv.offsetWidth + rightdiv.offsetWidth)));

        // determine how much to scroll on each step
        step = Math.ceil(listwidth / (list.getElementsByTagName("LI").length / 2));

        // show scrolling buttons only if the list is too wide for the bungie
        if (listwidth > visiblewidth) {
            addScrollButtons();
        } else {
            removeScrollButtons();
        }

        // account for padding around the bungie
        var padleft = parseInt(window.getComputedStyle(bungie, null).getPropertyValue('padding-left')),
            padright = parseInt(window.getComputedStyle(bungie, null).getPropertyValue('padding-left'));

        bungie.style.maxWidth =  ((visiblewidth - (padleft + padright)) - 2) + "px";

        var id = setInterval(reset, 5);
        
        function reset() {
            if (currentScroll >= 0) {
                currentScroll = 0;
                clearInterval(id);
            } else {
                currentScroll += 10;
            }
            list.style.marginLeft = currentScroll + 'px';
        }

        currentIndex = 0;
    }

    function addScrollButtons() {
        removeScrollButtons();

        // add the right button and subtract it's width from the list's visible width
        rightbutton = document.createElement("button");
        rightbutton.setAttribute("id", "right-btn");
        bungie.parentNode.appendChild(rightbutton);
        rightbutton.addEventListener("click", scrollRight);
        visiblewidth -= rightbutton.offsetWidth;

        // add the left button and subtract it's width from the list's visible width
        leftbutton = document.createElement("button");
        leftbutton.setAttribute("id", "left-btn");
        bungie.parentNode.insertBefore(leftbutton, bungie);
        leftbutton.addEventListener("click", scrollLeft);
        visiblewidth -= leftbutton.offsetWidth;

        // set maxScroll, which is the limit of how far right the bungie bar can be scrolled
        maxScroll = (0 - (listwidth - visiblewidth));
    }

    function removeScrollButtons() {
        if (typeof leftbutton !== "undefined" && leftbutton !== null) {
            leftbutton.parentNode.removeChild(leftbutton);
            leftbutton = null;
        }

        if (typeof rightbutton !== "undefined" && rightbutton !== null) {
            rightbutton.parentNode.removeChild(rightbutton);
            rightbutton = null;
        }
    }

    function getElementFullWidth(element) {
        // thanks and credit to reaxis from StackOverflow:
        // https://stackoverflow.com/questions/23268784/how-to-get-element-width-height-with-margin-padding-border-in-native-javascrip
        var style = element.currentStyle || window.getComputedStyle(element),
            width = parseFloat(style.width),
            margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight) + 4,
            padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
            border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth),
            fullwidth = width + margin + padding + border;

        return fullwidth;
    }

    function scroll(amount, button) {
        button.disabled = true;
        let scrollTo = currentScroll + amount;

        if (scrollTo > maxScroll) {
            if (scrollTo > 0) {
                currentScroll = 0;
            } else {
                currentScroll = scrollTo;
            }
        } else {
            currentScroll = maxScroll;
        }

        list.style.marginLeft = currentScroll + 'px';

        if (currentScroll === maxScroll) {
            currentIndex--;
            
        } 
        
        button.disabled = false;
    }

    function scrollRight() {
        if (currentScroll > maxScroll) {
            let index = currentIndex + 1 > listitems.length + 1 ? currentIndex : currentIndex++,
                amount = -Math.abs(getElementFullWidth(listitems[index]));

            scroll(amount, rightbutton);
        }
    }

    function scrollLeft() {
        if (currentScroll < 0) {
            let index = currentIndex - 1 < 0 ? 0 : --currentIndex,
                amount = Math.abs(getElementFullWidth(listitems[index]));

            scroll(amount, leftbutton);
        }
    }

})();