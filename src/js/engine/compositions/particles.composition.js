import {default as Composition} from "./../composition";

class ParticlesComposition extends Composition {
    constructor(Particles, View) {
        const components = {
            "window": window
        };

        const events = {
            "window": {
                "resize": "updateParticleDimensions"
            }
        };
        super(components, events);
        this.Particles = Particles;
        this.View = View;
        this.resizeId = null;
    }
    updateParticleDimensions() {
        clearTimeout(this.resizeId);
        this.resizeId = setTimeout(function() {
            this.rebuildParticles();
        }.bind(this), 400);
    }
    rebuildParticles() {
        this.Particles.destroy();
        this.Particles.width = this.View.width;
        this.Particles.height = this.View.height;
        this.Particles.initialize();
    }
}

export {ParticlesComposition as default}
