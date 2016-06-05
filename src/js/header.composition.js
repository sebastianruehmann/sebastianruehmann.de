let HeaderComposition = new myApp.Composition();

HeaderComposition.components = {
    "overlay": new myApp.Component("welcome-overlay"),
    "welcome": new myApp.Component("welcome-content"),
    "hamburger": new myApp.Component("hamburger-icon"),
    "window": new myApp.Component(window)
};
HeaderComposition.events = {
    "window": {
        "scroll": "fade"
    }
};

HeaderComposition.animations = {
    "fade": function() {
        var opacity = ((window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0)) / parseInt(this.components.overlay.style("height"), 10) * 1.4;

        if (opacity <= 1) {
            this.components.overlay.style("opacity", opacity);
            this.components.welcome.style("opacity", 1 + (opacity * -1));
            if (myApp.view.width >= 1240) {
                this.components.hamburger.style("background", "rgba(" + myApp.color + "," + opacity * 0.6 + ")");
                this.components.hamburger.style("top", opacity * -1 * 25 + 40 + "px");
            } else {
                this.components.hamburger.style("background", "rgba(" + myApp.color + ", 0)");
                this.components.hamburger.style("top","15px");
            }
        } else {
            this.components.overlay.style("opacity", 1);
            this.components.welcome.style("opacity", 0);
            if (myApp.view.width >= 1240) {
                this.components.hamburger.style("background", "rgba(" + myApp.color + ",0.6)");
                this.components.hamburger.style("top", 15 + "px");
            } else {
                this.components.hamburger.style("background", "rgba(" + myApp.color + ", 0)");
                this.components.hamburger.style("top", "15px");
            }
        }
    }
};

HeaderComposition.attachEvents();
