var content = document.getElementById("content");
var contentw = document.getElementById("content-wrapper");
var navilinks = document.getElementsByClassName("navigation-link");
var navi = document.getElementById("mobile-navigation");
var hamburger = document.getElementById("hamburger-icon");

document.getElementById("logo").addEventListener("click",function() {scrollToElem("welcome") }, false);

function scrollToElem(element, changed) {
    var start = window.pageYOffset,
        header = document.getElementsByTagName("header")[0].offsetHeight,
        change = document.getElementById(element).offsetTop - header - start,
        currentTime = 0,
        increment = 5,
        duration = window.innerWidth * 0.5;

    var animateScroll = function(){
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);
        console.log(val);
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        } else {
            typeof changed === 'function' && changed();
        }
    };
    animateScroll();
}

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

function loadFile(file, callback) {
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 && xhr.status == 200)
            {
                callback(xhr.responseText);
            }
            else if(xhr.readyState == 4 && xhr.status == 404) {
                callback('<a href="#" onclick="back()" class="back-button">Back</a><div class="container"><div id="error"><h1>Error</h1><div class="content">Die Seite "'+ file +'" wurde nicht gefunden.</div></div></div>');
            }
        };
        xhr.onprogress = function(p) {
            if (p.lengthComputable) {
                var percentComplete = p.loaded / p.total;
            }
            loaderpercentage = percentComplete * 100;
        };
        xhr.open("GET",pathBase + file + "?noRewrite=1", true);
        xhr.send();
    }
}

function navilinkclicked(evt) {
    var link = this.getAttribute("href").split("#")[1];
    contentw.className = "isChanged";

    hamburger.className = 'notActive';
    navi.className = "notActive";
    contentw.className = "notActive";
    setTimeout(function() { scrollToElem(link)},300);

    evt.preventDefault();
    return false;
}

for(var i=0;i<navilinks.length;i++){
    navilinks[i].addEventListener('click', navilinkclicked, false);
}

function toggleNavigation(nav) {
    if (nav.className != 'active') {
        nav.className = 'active';
        navi.className = "isActive";
        contentw.className = "isActive";
    } else {
        nav.className = 'notActive';
        document.body.style.overflowY = "auto";
        navi.className = "notActive";
        contentw.className = "notActive";
    }

    return false;
}

document.addEventListener("touchend", scroll, false);
document.addEventListener("scroll", scroll, false);
