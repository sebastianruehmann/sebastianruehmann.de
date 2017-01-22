class View {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.dpr = window.devicePixelRatio || 1;
        this.scrollTop = window.pageYOffset;
        this.scrollLeft = window.pageXOffset;
        this.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    set width(value) {
        this._width = value;
    }
    get width() {
        return this._width;
    }
    set height(value) {
        this._height = value;
    }
    get height() {
        return this._height;
    }
    set dpr(value) {
        this._dpr = value;
    }
    get dpr() {
        return this._dpr;
    }
    set scrollLeft(value) {
        this._scrollLeft = value;
    }
    get scrollLeft() {
        return this._scrollLeft;
    }
    set scrollTop(value) {
        this._scrollTop = value;
    }
    get scrollTop() {
        return this._scrollTop;
    }

    //todo breakpoint function + event
}

export {View as default}