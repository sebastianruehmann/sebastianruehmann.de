import Component from "./engine/component";
import Popup from "./popup";

export default class PopupBehavior {
    constructor(triggers, View) {
        this.popups = {};
        this.View = View;

        for (let i = 0; i < triggers.length; ++i) {
            let popupEl = this.getPopupElement(triggers[i]);
            if(popupEl && this.checkIfNotOpen(popupEl)) {
                let PopupClass = new Popup(triggers[i], popupEl, this.View);

                this.popups[this.getPopupKey(triggers[i])] = PopupClass;
            }

        }
    }
    checkIfNotOpen(popup) {
        const popupComponent = new Component(popup);

        if(popupComponent.hasClass("open")) {
            return false;
        }
        return true;
    }
    getPopupKey(trigger) {
        return trigger.dataset.key;
    }
    getPopupElement(trigger) {
        const key = this.getPopupKey(trigger);
        const overlay = document.querySelector('[data-overlay="'+ key +'"]');

        if(overlay) {
            return overlay;
        }
    }
}