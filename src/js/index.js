import {default as App} from "./engine/app";
import {default as Particles} from "./engine/modules/particles";
import {default as WindowComposition} from "./engine/compositions/window.composition";
import {default as ContactComposition} from "./engine/compositions/contact.composition";
import {default as HeaderComposition} from "./engine/compositions/header.composition";
import {default as NavigationComposition} from "./engine/compositions/navigation.composition";
import {default as ParticlesComposition} from "./engine/compositions/particles.composition";
import {default as PopupBehavior} from "./popup.behavior";
import {default as NavigationBehavior} from "./navigation.behavior";

Math.easeInOutQuad = function (currentIteration, startValue, changeInValue, totalIterations) {
    if ((currentIteration /= totalIterations / 2) < 1) {
        return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
    }
    return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
};

let myApp = new App();

myApp.particles = new Particles();
myApp.particles.ratio = myApp.View.dpr;
myApp.particles.width = myApp.View.width;
myApp.particles.height = myApp.View.height;

myApp.particles.canvasColor = myApp.color;
if(myApp.View.width <= 700) {
    myApp.particles.speed = 10;
}

window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
            window.setTimeout(t, 1e3 / 60)
        }
}();

myApp.particles.initialize();

new myApp.Component("hi").style("color", "rgb(" + myApp.color + ")");

myApp.compositions = {
    "Window": new WindowComposition(myApp.View),
    "Contact": new ContactComposition(),
    "Header": new HeaderComposition(myApp.color,myApp.View),
    "Navigation": new NavigationComposition(),
    "Particles": new ParticlesComposition(myApp.particles,myApp.View)
};

new PopupBehavior(document.getElementsByClassName("case-content"), myApp.View);
new NavigationBehavior(document.getElementsByClassName("navigation-link"), myApp.View);

myApp.initialize();