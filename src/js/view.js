View = function(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = window.devicePixelRatio || 1;
};

View.prototype = {
    constructor: View
};