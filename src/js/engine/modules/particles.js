import {default as Particle} from "./particle";

class Particles {
    constructor() {
        this.el = document.getElementById("particles");
        this.ctx = this.el.getContext("2d");
        this.particles = [];
        this.bindDistance = 100;
        this.speed = 5;
        this.canvasColor = "140, 35, 24";
    }
    set ratio(value) {
        this.bsr = this.ctx.webkitBackingStorePixelRatio ||
        this.ctx.mozBackingStorePixelRatio ||
        this.ctx.msBackingStorePixelRatio ||
        this.ctx.oBackingStorePixelRatio ||
        this.ctx.backingStorePixelRatio || 1;

        this._ratio = value / this.bsr;
    }
    get ratio() {
        return this._ratio;
    }
    set width(value) {
        this._w = value * this.ratio;
    }
    get width() {
        return this._w;
    }
    set height(value) {
        this._h = value * this.ratio;
    }
    get height() {
        return this._h;
    }
    set canvasColor(value) {
        this._canvasColor = value;
    }
    get canvasColor() {
        return this._canvasColor;
    }
    initialize() {
        this.particleCount = Math.round(this.width * this.height / 9500 + 20);
        this.scaleCanvas();
        this.drawCanvas();
        this.addParticles();

        var animloop = this.animloop.bind(this);

        setTimeout(function () {
            animloop();
        }, this.particleCount * 10);
    }
    initializePoint(p, delay) {
        setTimeout(function () {
            p.draw();
        }, delay);
    }
    drawCanvas() {
        this.ctx.fillStyle = this.createGradient();
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    scaleCanvas() {
        this.el.width = this.width;
        this.el.style.width = this.width / this.ratio + "px";
        this.el.height = this.height;
        this.el.style.height = this.height / this.ratio + "px";
        this.ctx.scale(this.ratio,this.ratio);
    }
    createGradient() {
        var grd = this.ctx.createRadialGradient(parseInt(this.width / 2), parseInt(this.height * 0.8), 0, parseInt(this.width / 2), parseInt(this.width * 0.8), parseInt(this.width * 2));
        grd.addColorStop(0, "rgb(" + this.canvasColor + ")");
        grd.addColorStop(1, "rgb(88,88,88)");

        return grd;
    }
    addParticles() {
        for (var t = 0; this.particleCount > t; t++) {
            var p = new Particle(this.width, this.height, this.speed, this.ctx);
            this.particles.push(p);
            this.initializePoint(p,t*10);
        }
    }
    draw() {
        this.drawCanvas();
        for (var t = 0; t < this.particles.length; t++) {
            this.particles[t].draw();
        }
        this.update();
    }
    update() {
        var W = this.width;
        var H = this.height;

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
    }
    distance(p1, p2) {
        var a, e = p1.x - p2.x,
            n = p1.y - p2.y;
        a = Math.sqrt(e * e + n * n);

        if (this.bindDistance >= a) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "rgba(255, 255, 255," + (1 - a / this.bindDistance) + ")";
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
    animloop() {
        this.draw();
        var self = this;
        this.animation = requestAnimFrame(() => { this.animloop() });
    }
    destroy() {
        this.particles = [];
        if (this.animation) {
            window.cancelAnimationFrame(this.animation);
            this.animation = undefined;
        }
    }
}

export {Particles as default}