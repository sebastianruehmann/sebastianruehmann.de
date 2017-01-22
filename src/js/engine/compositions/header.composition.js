import {default as Composition} from "./../composition";

class HeaderComposition extends Composition {
    constructor(color, View) {
        const components = {
            "overlay": "welcome-overlay",
            "welcome": "welcome-content",
            "hamburger": "microman",
            "window": window
        };

        const events = {
            "window": {
                "scroll": "fade"
            }
        };
        super(components, events);
        this.color = color;
        this.View = View;
    }
    fade() {
        var opacity = ((window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0)) / parseInt(this.components.overlay.style("height"), 10) * 1.4;

        // todo simplify function and implement breakpoint event
        if (opacity <= 1) {
            this.components.overlay.style("opacity", opacity);
            this.components.welcome.style("opacity", 1 + (opacity * -1));
            if (this.View.width >= 1240) {
                this.components.hamburger.style("background", "rgba(" + this.color + "," + opacity * 0.6 + ")");
                this.components.hamburger.style("top", opacity * -1 * 25 + 40 + "px");
            } else {
                this.components.hamburger.style("background", "rgba(" + this.color + ", 0)");
                this.components.hamburger.style("top","15px");
            }
        } else {
            this.components.overlay.style("opacity", 1);
            this.components.welcome.style("opacity", 0);
            if (this.View.width >= 1240) {
                this.components.hamburger.style("background", "rgba(" + this.color + ",0.6)");
                this.components.hamburger.style("top", 15 + "px");
            } else {
                this.components.hamburger.style("background", "rgba(" + this.color + ", 0)");
                this.components.hamburger.style("top", "15px");
            }
        }
    }
}

export {HeaderComposition as default}