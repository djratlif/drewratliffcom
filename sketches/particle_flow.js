// particle_flow.js
// This is the original visualization using glowing particles and noise physics.
let particles = [];
const numParticles = 300;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);
    background(222, 47, 16);

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(222, 47, 16, 5); // Tailing effect

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
        particles[i].checkEdges();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(222, 47, 16);
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(0.5, 2));
        this.acc = createVector(0, 0);
        this.r = random(1.5, 4);

        this.h = random([180, 220, 260, 300, 340]); // Neon color palette
        this.s = random(70, 100);
        this.b = random(80, 100);
    }

    update() {
        let noiseAngle = noise(this.pos.x * 0.003, this.pos.y * 0.003, frameCount * 0.005) * TWO_PI * 4;
        let noiseForce = p5.Vector.fromAngle(noiseAngle);
        noiseForce.mult(0.1);

        this.acc.add(noiseForce);
        this.vel.add(this.acc);
        this.vel.limit(3);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    display() {
        noStroke();
        fill(this.h, this.s, this.b, 80);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    checkEdges() {
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.x < -this.r) this.pos.x = width + this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
        if (this.pos.y < -this.r) this.pos.y = height + this.r;
    }
}
