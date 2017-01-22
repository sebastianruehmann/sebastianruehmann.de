import Component from "./engine/component";
import Navigation from "./navigation";

export default class NavigationBehavior {
    constructor(triggers, View) {
        this.navigation = {};
        this.View = View;

        for (let i = 0; i < triggers.length; ++i) {
            let destEl = this.getDestElement(triggers[i]);
            if(destEl) {
                let NavigationClass = new Navigation(triggers[i], destEl, this.View);

                this.navigation[this.getDestKey(triggers[i])] = NavigationClass;
            }

        }
    }
    getDestKey(trigger) {
        let href = trigger.attributes.href.value;
        return href.split("#")[1];
    }
    getDestElement(trigger) {
        let key = this.getDestKey(trigger);
        const dest = document.getElementById(key);

        if(dest) {
            return dest;
        }
    }
}