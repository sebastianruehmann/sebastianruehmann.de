import {default as Composition} from "./../composition";

class WindowComposition extends Composition {
    constructor(View) {
        const components = {
            "window": window
        };

        const events = {
            "window": {
                "scroll": "updateOffset",
                "resize": "updateDimensions"
            }
        };
        super(components, events);
        this.View = View;
    }
    updateOffset() {
        this.View.scrollTop = window.pageYOffset;
        this.View.scrollLeft = window.pageXOffset;
    }
    updateDimensions() {
        this.View.height = window.innerHeight;
        this.View.width = window.innerWidth;
    }
}

export {WindowComposition as default}