(function() {
    
    // get the bungie bar elements
    var bungie = document.getElementById("bungie"),
        leftdiv = document.getElementById("left"),
        rightdiv = document.getElementById("right"),
        list = bungie.getElementsByTagName("UL")[0],
        leftbutton,
        rightbutton,
        listwidth = 0,
        visiblewidth = 0,
        scroll = 0,
        step = 0;

    // measure the full width of the list inside the bungie bar
    // by making a clone, measuring it, and deleting it
    var cln = bungie.cloneNode(true);
    document.body.appendChild(cln);
    listwidth = Math.ceil(cln.offsetWidth);
    cln.parentNode.removeChild(cln);

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

        var id = setInterval(frame, 5),
        pos = 0;
        function frame() {
            if (scroll >= 0) {
                clearInterval(id);
            } else {
                scroll += 9;
                list.style.marginLeft = scroll + 'px';
            }
        }
    }

    function addScrollButtons() {
        removeScrollButtons();

        rightbutton = document.createElement("button");
        rightbutton.setAttribute("id", "right-btn");
        bungie.parentNode.appendChild(rightbutton);
        rightbutton.addEventListener("click", scrollRight);
        visiblewidth -= rightbutton.offsetWidth;

        leftbutton = document.createElement("button");
        leftbutton.setAttribute("id", "left-btn");
        bungie.parentNode.insertBefore(leftbutton, bungie);
        leftbutton.addEventListener("click", scrollLeft);
        visiblewidth -= leftbutton.offsetWidth;
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

    function scrollRight() {
        if (scroll > (0 - (listwidth - visiblewidth))) {
            rightbutton.disabled = true;
            var id = setInterval(frame, 5),
            pos = 0;
            function frame() {
                if (pos <= (0 - step)) {
                    clearInterval(id);
                    rightbutton.disabled = false;
                } else {
                    if (scroll > (0 - (listwidth - visiblewidth))) {
                        pos -= 3; 
                        scroll -= 3;
                        list.style.marginLeft = scroll + 'px';
                    } else {
                        clearInterval(id);
                        rightbutton.disabled = false;
                        return;
                    }                    
                }
            }
        }
    }

    function scrollLeft() {
        if (scroll < 0) {
            leftbutton.disabled = true;
            var id = setInterval(frame, 5),
            pos = 0;
            function frame() {
                if (pos >= step) {
                    clearInterval(id);
                    leftbutton.disabled = false;
                } else {
                    if (scroll < 0) {
                        pos += 3; 
                        scroll += 3;
                        list.style.marginLeft = scroll + 'px';
                    } else {
                        clearInterval(id);
                        leftbutton.disabled = false;
                        return;
                    }
                }
            }
        }
    }
})();