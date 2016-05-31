function paintCanvas() {
    var grd = ctx.createRadialGradient(W / 2, H * 0.8, 0, W / 2, W * 0.8, W * 2);
    grd.addColorStop(0, "rgb("+color+")");
    grd.addColorStop(1, "rgb(88,88,88)");
    ctx.fillStyle = grd, ctx.fillRect(0, 0, W, H)
}

function Particle() {
    this.x = Math.random() * W, this.y = Math.random() * H, this.vx = (-1 + 2 * Math.random()) / speed, this.vy = (-1 + 2 * Math.random()) / speed, this.radius = 2 * Math.random() + 1;
    this.draw = function () {
        ctx.fillStyle = "rgb(255,255,255)", ctx.beginPath(), ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !1), ctx.fill()
    }
}

function start() {
    particleCount = Math.round(W * H / 9500 + 20), canvas.width = W * ratio, canvas.style.width = W +"px", canvas.height = H * ratio, canvas.style.height = H + "px", particles = [];
    for (var t = 0; particleCount > t; t++) particles.push(new Particle)

    ctx.scale(ratio,ratio);
}

function initialize() {
    paintCanvas();
    for (var t = 0; t < particles.length; t++) {
        initializePoints(t);
    }
}

function initializePoints(t) {
    setTimeout(function () {
        p = particles[t];
        p.draw();
    }, t * 10);
}

function draw() {
    paintCanvas();
    for (var t = 0; t < particles.length; t++) {
        p = particles[t];
        p.draw();
    }
    update();
}

function update() {
    for (var t = 0; t < particles.length; t++) {
        p = particles[t], p.x += p.vx, p.y += p.vy, p.x + p.radius > W ? p.x = p.radius : p.x - p.radius < 0 && (p.x = W - p.radius), p.y + p.radius > H ? p.y = p.radius : p.y - p.radius < 0 && (p.y = H - p.radius);
        for (var i = t + 1; i < particles.length; i++) p2 = particles[i], distance(p, p2)
    }
    rebuild = !1
}

function distance(t, i) {
    var a, e = t.x - i.x,
        n = t.y - i.y;
    a = Math.sqrt(e * e + n * n), minDist >= a && (ctx.beginPath(), ctx.strokeStyle = "rgba(255, 255, 255," + (1 - a / minDist) + ")", ctx.moveTo(t.x, t.y), ctx.lineTo(i.x, i.y), ctx.stroke(), ctx.closePath())
}

function animloop() {
    draw(), requestAnimFrame(animloop)
}

window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
            window.setTimeout(t, 1e3 / 60)
        }
}();

var canvas = document.getElementById("particles"),
    ctx = canvas.getContext("2d"),
    particleCount, particles = [],
    minDist = 100,
    speed = 5,
    dist;

if(W <= 700) {
    speed = 10;
}

var dpr = window.devicePixelRatio || 1,
    bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

var ratio = dpr / bsr;

start();

setTimeout(function () {
    animloop();
}, particleCount * 10);

initialize();