function getRandomColor() {
    var colors = ["140, 35, 24","94, 140, 106","83,125,141"];
    var r = Math.round(Math.random() * (colors.length - 1));
    return colors[r];
}

var color = getRandomColor();

var W = window.innerWidth;
var H = window.innerHeight;