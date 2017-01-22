import Component from "./engine/component";

export default class Popup {
    constructor(trigger,popup, View) {
        this.trigger = new Component(trigger);
        this.popup = new Component(popup);
        this.bg = new Component("case-content-overlay-bg");
        this.View = View;
        this.ltr = undefined;

        this.bindEvent();
    }
    bindEvent() {
        this.trigger.on("click", () => { this.initialize(); });
    }
    initialize() {
        if(this.popup.hasClass("case-section-left")) {
            this.ltr = true;
        } else {
            this.ltr = false;
        }

        this.adjust();
        this.open();
    }
    open() {
        window.addEventListener("resize", () => {
            this.adjust();
        });
        this.bg.style("display", "block");
        this.bg.element.addEventListener("click", this.destroy.bind(this));

        this.animate();
    }
    calculateDimensions() {
        const container = new Component("cases_wrapper");
        let offset = 0 + "px";
        let width = "auto";
        if (this.View.width >= 600) {
            if(this.ltr) {
                offset = this.trigger.element.offsetWidth + this.trigger.element.offsetLeft + "px";
            } else {
                const outterContainerOffset = (this.View.width - container.element.offsetWidth) / 2;
                const windowOffsetRight = this.View.width - this.trigger.element.getBoundingClientRect().left;

                offset = windowOffsetRight - outterContainerOffset + "px";
            }
            width = container.element.offsetWidth - offset + "px";
        }

        const top = this.trigger.element.offsetTop + "px";

        return { top, offset, width }
    }
    adjust(param) {
        let dimensions = (param ? param : this.calculateDimensions());

        let popupWrapper = new Component(this.popup.element.querySelector(".case-content-overlay-wrapper"));
        this.popup.style("top", dimensions.top);
        if(this.ltr) {
            popupWrapper.style("marginLeft", dimensions.offset);
        } else {
            popupWrapper.style("marginRight", dimensions.offset);
        }
        popupWrapper.style("width", dimensions.width);

        this.mobileTriggerSpace();
    }
    mobileTriggerSpace() {
        if(this.View.width < 600) {
            this.popup.style("paddingTop", this.trigger.element.offsetHeight + 50 + "px");
        } else {
            this.popup.style("paddingTop", "");
        }
    }
    animate() {
        this.trigger.addClass("front");
        this.popup.addClass("open");

        let divider = new Component(this.popup.element.querySelector(".case-content-divider"));

        setTimeout(() => {
            divider.addClass("animate");
        }, 10);
    }
    destroy() {
        this.trigger.removeClass("front");
        this.popup.removeClass("open");
        let divider = new Component(this.popup.element.querySelector(".case-content-divider"));

        this.adjust({
            top: "",
            offset: "",
            width: "auto"
        });

        divider.removeClass("animate");

        this.bg.style("display", "none");
        this.bg.element.removeEventListener("click", this.destroy);
    }
}
