import Component from "./engine/component";

export default class Navigation {
    constructor(navigation,destEl, View) {
        this.destEl = new Component(destEl);
        this.navigation = new Component(navigation);
        this.View = View;

        this.speed = 5;
        this.increment = 5;

        this.bindEvent();
    }
    bindEvent() {
        this.navigation.on("click", (e) => { this.initialize(e); });
    }
    initialize(e) {
        this.scrollToDest();
        e.preventDefault();
        return false;
    }
    scrollToDest() {
        this.start = this.View.scrollTop;
        let header = document.getElementsByTagName("header")[0].offsetHeight;
        this.change = this.destEl.element.offsetTop - header - this.start;
        this.duration = this.View.width * 0.3;
        this.currentTime = 0;

        this.animateScroll();
    }
    animateScroll() {
        this.currentTime = this.currentTime + this.speed;
        console.log(this.currentTime, this.speed, this.increment);
        var val = Math.easeInOutQuad(this.currentTime, this.start, this.change, this.duration);
        window.scrollTo(0, val);
        if(this.currentTime < this.duration) {
            setTimeout(() => { this.animateScroll() }, this.increment);
        }
    }
    destroy() {
    }
}
