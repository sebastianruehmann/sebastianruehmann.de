let WindowComposition = new myApp.Composition();

WindowComposition.components = {
    "window": new myApp.Component(window)
};
WindowComposition.events = {
    "window": {
        "scroll": "updateOffset",
        "resize": "updateDimensions"
    }
};

WindowComposition.animations = {
    "updateOffset": function() {
        myApp.view.scrollTop = window.pageYOffset;
        myApp.view.scrollLeft = window.pageXOffset;
    },
    "updateDimensions": function() {
        myApp.view.height = window.innerHeight;
        myApp.view.width = window.innerWidth;
    }
};

WindowComposition.attachEvents();
