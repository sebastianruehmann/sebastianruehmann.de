class Component {
    constructor(element) {
        if(typeof element === 'string') {
            if(this.check(document.getElementById(element))) {
                this.element = document.getElementById(element);
            } else {
                this.element = document.createElement("div");
            }
        } else if(this.check(element)) {
            this.element = element;
        } else {
            this.element = document.createElement("div");
        }
    }
    style(prop, value) {
        if(typeof value !== 'undefined') {
            this.element.style[prop] = value;
        } else {
            var defaultView = (this.element.ownerDocument || document).defaultView;
            if (defaultView && defaultView.getComputedStyle) {
                prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
                return defaultView.getComputedStyle(this.element, null).getPropertyValue(prop);
            } else if (this.element.currentStyle) {
                prop = prop.replace(/\-(\w)/g, function (str, letter) {
                    return letter.toUpperCase();
                });
                value = this.element.currentStyle[prop];
                if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                    return (function (value) {
                        var oldLeft = this.element.style.left, oldRsLeft = this.element.runtimeStyle.left;
                        this.element.runtimeStyle.left = this.element.currentStyle.left;
                        this.element.style.left = value || 0;
                        value = this.element.style.pixelLeft + "px";
                        this.element.style.left = oldLeft;
                        this.element.runtimeStyle.left = oldRsLeft;
                        return value;
                    })(value);
                }
                return value;
            }
        }
    }
    on(event, callback) {
        this.element.addEventListener(event,callback);
    }
    off(event, callback) {
        this.element.removeEventListener(event,callback);
    }
    addClass(name) {
        this.element.classList.add(name);
    }
    removeClass(name) {
        this.element.classList.remove(name);
    }
    hasClass(name) {
        return this.element.classList.contains(name);
    }
    check(element) {
        if(typeof element === 'undefined') {
            return false;
        }

        return true;
    }
}

export {Component as default}