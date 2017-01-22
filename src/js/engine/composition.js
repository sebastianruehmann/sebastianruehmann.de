import {default as Component} from "./component";

class Composition {
    constructor(components, events) {
        this.components = {};
        for(var component in components) {
            this.components[component] = new Component(components[component]);
        }
        this.events = events;
    }
    attachEvents(){
        for(var component in this.events) {
            this.attachComponentsEvents(component, this.events[component]);
        }
    }

    attachComponentsEvents(component, elementsEvents) {
        for(var event in elementsEvents) {
            var trigger = elementsEvents[event];

            var scope = this;

            this.components[component].on(event, scope[trigger].bind(scope, scope.components[component]));

        }
    }
}

export {Composition as default}