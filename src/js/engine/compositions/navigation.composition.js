import {default as Composition} from "./../composition";

class NavigationComposition extends Composition {
    constructor() {
        const components = {
            "microman": "microman",
            "navi": "navigation"
        };

        const events = {
            "microman": {
                "click": "toggleNavigation"
            }
        };

        super(components, events)
    }
    toggleNavigation() {
        if (this.components.microman.hasClass('active')) {
            this.components.microman.removeClass("active");
            this.components.navi.removeClass("active");
        } else {
            this.components.microman.addClass("active");
            this.components.navi.addClass("active");
        }
    }
}

export {NavigationComposition as default}