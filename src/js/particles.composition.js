if(!myApp.view.mobile) {
    let ParticlesComposition = new myApp.Composition();

    ParticlesComposition.components = {
        "window": new myApp.Component(window)
    };
    ParticlesComposition.events = {
        "window": {
            "resize": "updateParticleDimensions"
        }
    };

    ParticlesComposition.animations = {
        "updateParticleDimensions": function () {
            myApp.particles.destroy();
            myApp.particles.width = this.components["window"].element.innerWidth;
            myApp.particles.height = this.components["window"].element.innerHeight;
            myApp.particles.initialize();
        }
    };

    ParticlesComposition.attachEvents();
}