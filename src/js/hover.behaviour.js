var areaList = document.getElementsByClassName("area");

for (var i = 0; areaList.length > i; i++) {
    areaList[i].addEventListener("mouseover", function (el) {
        var el = document.getElementsByClassName(el.target.getAttribute("data-area"));
        for (var i = 0; el.length > i; i++) {
            el[i].classList.add("active");
        }
    }, false);
    areaList[i].addEventListener("mouseleave", function (el) {
        var el = document.getElementsByClassName(el.target.getAttribute("data-area"));
        for (var i = 0; el.length > i; i++) {
            el[i].classList.remove("active");
        }
    }, false);
}

var caseslinks = document.getElementsByClassName("cases_summary_links");

for (var i = 0; caseslinks.length > i; i++) {
    caseslinks[i].addEventListener("mouseover", function (el) {
        var el = document.getElementById(el.target.getAttribute("data-case"));
        el.classList.add("active");
    }, false);

    caseslinks[i].addEventListener("mouseleave", function (el) {
        var el = document.getElementById(el.target.getAttribute("data-case"));
        el.classList.remove("active");
    }, false);
}