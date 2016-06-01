var App = App || function(){
        this.color = this.getRandomColor();
    };

App.prototype = {
    constructor: App,
    getRandomColor: function() {
        var colors = ["140, 35, 24","94, 140, 106","83,125,141"];
        var r = Math.round(Math.random() * (colors.length - 1));
        return colors[r];
    }
};

myApp = new App();

myApp.view = new View();
myApp.particles = new Particles(myApp.view);

myApp.particles.canvasColor = myApp.color;
if(myApp.view.width <= 700) {
    myApp.particles.speed = 10;
}

myApp.particles.initialize();

setTimeout(function () {
    myApp.particles.animloop();
}, myApp.particles.particleCount * 10);

document.getElementById("hi").style.color = "rgb(" + myApp.color + ")";
document.getElementById("hamburger-icon").style.background = "rgba(" + myApp.color + ",0)";