class Composition {
    constructor() {
        this.components = {};
        this.events = {};
        this.animations = {};
    }
    set components(value) {
        this._components = value;
    }
    set events(value) {
        this._events = value;
    }
    set animations(value) {
        this._animations = value;
    }
    get components() {
        return this._components;
    }
    get events() {
        return this._events;
    }
    get animations() {
        return this._animations;
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

            this.components[component].on(event, scope.animations[trigger].bind(scope, scope.components[component]));

        }
    }
}

