let NavigationComposition = new myApp.Composition();

NavigationComposition.components = {
    "microman": new myApp.Component("microman"),
    "navi": new myApp.Component("mobile-navigation")
};
NavigationComposition.events = {
    "microman": {
        "click": "toggleNavigation"
    }
};

NavigationComposition.animations = {
    "toggleNavigation": function() {
        if (this.components.microman.hasClass('active')) {
            this.components.microman.removeClass("active");
            this.components.navi.removeClass("active");
        } else {
            this.components.microman.addClass("active");
            this.components.navi.addClass("active");
        }
    }
};

NavigationComposition.attachEvents();
