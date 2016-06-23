class App {
    constructor() {
        this.color = this.randomColor;

        this.view = new View();
        this.particles = new Particles();
        this.particles.ratio = this.view.dpr;
        this.particles.width = this.view.width;
        this.particles.height = this.view.height;

        this.Component = Component;
        this.Composition = Composition;
    }
    get randomColor() {
        var colors = ["140, 35, 24","94, 140, 106","83,125,141"];
        var r = Math.round(Math.random() * (colors.length - 1));
        return colors[r];
    }
}

let myApp = new App();

myApp.particles.canvasColor = myApp.color;
if(myApp.view.width <= 700) {
    myApp.particles.speed = 10;
}

myApp.particles.initialize();


document.getElementById("hi").style.color = "rgb(" + myApp.color + ")";