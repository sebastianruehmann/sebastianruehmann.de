class Particle {
    constructor(W, H, speed, ctx) {
        this.x = Math.random.apply(window) * W;
        this.y = Math.random() * H;
        this.vx = (-1 + 2 * Math.random()) / speed;
        this.vy = (-1 + 2 * Math.random()) / speed;
        this.radius = 2 * Math.random() + 1;
        this.ctx = ctx;
    }
    draw() {
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !1);
        this.ctx.fill()
    }
}