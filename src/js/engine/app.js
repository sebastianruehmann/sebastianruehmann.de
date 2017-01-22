import {default as Composition} from "./composition";
import {default as Component} from "./component";
import {default as View} from "./view";

class App {
    constructor() {
        this.color = this.randomColor;

        this.View = new View();

        this.Component = Component;
        this.Composition = Composition;

        this.compositions = {};

    }
    get randomColor() {
        var colors = ["140, 35, 24","94, 140, 106","83,125,141"];
        var r = Math.round(Math.random() * (colors.length - 1));
        return colors[r];
    }
    attachCompositionEvents() {
        for(var name in this.compositions) {
            this.compositions[name].attachEvents();
        }
    }
    initialize() {
        this.attachCompositionEvents();
        const body = new this.Component(document.body);

        document.addEventListener('DOMContentLoaded', function() {
            body.removeClass("preload")
        }, false);
    }
}

export {App as default};