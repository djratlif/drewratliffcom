// orthogonal_crawler.js
// Multiple "pens" draw continuous pipes across the screen strictly horizontally or vertically.

let walkers = [];
const numWalkers = 15; // Number of active drawing lines
const gridScale = 8;  // The speed and snapping scale

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(15, 23, 42); // match slate #0f172a

    // Spawn pens
    for (let i = 0; i < numWalkers; i++) {
        walkers.push(new Walker());
    }
}

function draw() {
    // No background fade, leaving lines 100% permanent and crisp.

    for (let w of walkers) {
        w.update();
        w.display();
    }
}

class Walker {
    constructor() {
        // Start randomly but snapped to our grid 
        this.pos = createVector(
            floor(random(width) / gridScale) * gridScale,
            floor(random(height) / gridScale) * gridScale
        );
        this.prevPos = this.pos.copy();

        // Direction map: 0: Up, 1: Right, 2: Down, 3: Left
        this.dir = floor(random(4));
        this.speed = gridScale;

        // Pick a color from our custom neon palette
        let colors = [
            color(236, 72, 153), // Pink
            color(168, 85, 247), // Purple
            color(56, 189, 248), // Blue
            color(52, 211, 153), // Emerald
            color(255, 255, 255, 100) // Dim White
        ];
        this.baseColor = random(colors);
        this.baseColor.setAlpha(150); // Make them slightly transparent to look cool stacked

        this.weight = random(1.5, 4); // Random line thickness

        // How many tiles it draws before changing direction
        this.stepsLeft = floor(random(10, 50));
    }

    update() {
        this.prevPos = this.pos.copy();

        // Move one block 
        if (this.dir === 0) this.pos.y -= this.speed;
        if (this.dir === 1) this.pos.x += this.speed;
        if (this.dir === 2) this.pos.y += this.speed;
        if (this.dir === 3) this.pos.x -= this.speed;

        // Screen wrapping trick: If they walk off the edge, instantly teleport them
        // to the opposite side but reset the prevPos so it doesn't draw a line across the center
        let jumped = false;
        if (this.pos.x < 0) { this.pos.x = width; jumped = true; }
        if (this.pos.x > width) { this.pos.x = 0; jumped = true; }
        if (this.pos.y < 0) { this.pos.y = height; jumped = true; }
        if (this.pos.y > height) { this.pos.y = 0; jumped = true; }
        if (jumped) {
            this.prevPos = this.pos.copy();
        }

        this.stepsLeft--;
        // When it runs out of steps, force a harsh 90-degree turn
        if (this.stepsLeft <= 0) {
            let turnDir = random([1, 3]); // Turn exactly 90 degrees left or right
            this.dir = (this.dir + turnDir) % 4;

            // Randomly restart the steps
            this.stepsLeft = floor(random(10, 50));
        }
    }

    display() {
        stroke(this.baseColor);
        strokeWeight(this.weight);
        line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    }
}

// Ensure the canvas adapts seamlessly
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(15, 23, 42);
}
