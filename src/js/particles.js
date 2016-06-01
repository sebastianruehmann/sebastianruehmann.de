Particles = function(view) {
    this.el = document.getElementById("particles");
    this.ctx = this.el.getContext("2d");
    this.particles = [];
    this.bindDistance = 100;
    this.speed = 5;
    this.canvasColor = "140, 35, 24";
    this.bsr = this.ctx.webkitBackingStorePixelRatio ||
        this.ctx.mozBackingStorePixelRatio ||
        this.ctx.msBackingStorePixelRatio ||
        this.ctx.oBackingStorePixelRatio ||
        this.ctx.backingStorePixelRatio || 1;
    this.ratio = view.dpr / this.bsr;
    this.w = view.width * this.ratio;
    this.h = view.height * this.ratio;
    this.particleCount = Math.round( view.width * view.height / 9500 + 20);
};

Particles.prototype = {
    constructor: Particles,
    initialize: function () {

        this.scaleCanvas();
        this.drawCanvas();
        this.addParticles();
    },
    initializePoint: function (p, delay) {
        setTimeout(function () {
            p.draw();
        }, delay);
    },
    drawCanvas: function () {
        this.ctx.fillStyle = this.createGradient(this.w, this.h, this.canvasColor);
        this.ctx.fillRect(0, 0, this.w, this.h);
    },
    scaleCanvas: function () {
        this.ctx.scale(this.ratio,this.ratio);
        this.el.width = this.w;
        this.el.style.width = this.w / this.ratio + "px";
        this.el.height = this.h;
        this.el.style.height = this.h / this.ratio + "px";
    },
    createGradient: function (W, H, color) {
        var grd = this.ctx.createRadialGradient(parseInt(W / 2), parseInt(H * 0.8), 0, parseInt(W / 2), parseInt(W * 0.8), parseInt(W * 2));
        grd.addColorStop(0, "rgb(" + color + ")");
        grd.addColorStop(1, "rgb(88,88,88)");

        return grd;
    },
    addParticles: function () {
        for (var t = 0; this.particleCount > t; t++) {
            var p = new Particle(this.w, this.h, this.speed, this.ctx);
            this.particles.push(p);
            this.initializePoint(p,t*10);
        }
    },
    draw: function () {
        this.drawCanvas();
        for (var t = 0; t < this.particles.length; t++) {
            this.particles[t].draw();
        }
        this.update();
    },
    update: function () {
        var W = this.w;
        var H = this.h;

        for (var t = 0; t < this.particles.length; t++) {
            var p = this.particles[t];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x + p.radius > W) {
                p.x = p.radius;
            } else if (p.x - p.radius < 0) {
                p.x = W - p.radius;
            }
            if (p.y + p.radius > H) {
                p.y = p.radius;
            } else if (p.y - p.radius < 0) {
                p.y = H - p.radius;
            }
            for (var j = t + 1; j < this.particles.length; j++) {
                var p2 = this.particles[j];
                this.distance(p, p2);
            }
        }
    },
    distance: function (t, i) {
        var a, e = t.x - i.x,
            n = t.y - i.y;
        a = Math.sqrt(e * e + n * n);

        if (this.bindDistance >= a) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "rgba(255, 255, 255," + (1 - a / this.bindDistance) + ")";
            this.ctx.moveTo(t.x, t.y);
            this.ctx.lineTo(i.x, i.y);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    },
    animloop: function () {
        this.draw();
        var self = this;
        requestAnimFrame(function() {self.animloop.call(self) });
    },
}

window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
            window.setTimeout(t, 1e3 / 60)
        }
}();