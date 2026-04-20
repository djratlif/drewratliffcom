// orthogonal_crawler.js
// Multiple "snake" pens draw continuous pipes across the screen with a fixed tail length.

let walkers = [];
const numWalkers = 20;
const gridScale = 8;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Spawn pens
    for (let i = 0; i < numWalkers; i++) {
        walkers.push(new Walker());
    }
}

function draw() {
    // Redraw the perfectly solid background every frame!
    // This perfectly erases all traces, meaning absolutely no "shadow" or ghosting.
    background(15, 23, 42);

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

        // Keep a strict array of past positions
        this.history = [];
        // Define exact maximum length of this specific pipe
        this.maxTailLength = floor(random(10, 80)); // Length in grid segments

        // Direction map: 0: Up, 1: Right, 2: Down, 3: Left
        this.dir = floor(random(4));
        this.speed = gridScale;

        // Match the color scheme of the other sketches exactly (Cyan, Blue, Purple, Pink)
        let colors = [
            color(56, 189, 248), // Cyan
            color(99, 102, 241), // Deep Blue
            color(168, 85, 247), // Purple
            color(236, 72, 153)  // Pink
        ];
        this.baseColor = random(colors);
        this.weight = random(2, 5); // Crisp line thickness

        // How many grid tiles it draws before choosing to change direction
        this.stepsLeft = floor(random(5, 40));
    }

    update() {
        // Log the current point to history before moving
        this.history.push(this.pos.copy());

        // If the tail gets too long, rigidly delete the absolute oldest point. 
        // This makes the back of the line disappear cleanly like a snake.
        if (this.history.length > this.maxTailLength) {
            this.history.shift();
        }

        // Move one block 
        if (this.dir === 0) this.pos.y -= this.speed;
        if (this.dir === 1) this.pos.x += this.speed;
        if (this.dir === 2) this.pos.y += this.speed;
        if (this.dir === 3) this.pos.x -= this.speed;

        // Screen wrapping trick
        let jumped = false;
        if (this.pos.x < 0) { this.pos.x = width; jumped = true; }
        if (this.pos.x > width) { this.pos.x = 0; jumped = true; }
        if (this.pos.y < 0) { this.pos.y = height; jumped = true; }
        if (this.pos.y > height) { this.pos.y = 0; jumped = true; }

        // If it teleports across the screen, wipe the visual history 
        // otherwise it will snap a continuous line all the way across the display
        if (jumped) {
            this.history = [];
        }

        this.stepsLeft--;
        // When it runs out of steps, force a harsh 90-degree turn
        if (this.stepsLeft <= 0) {
            let turnDir = random([1, 3]); // Turn exactly 90 degrees left or right
            this.dir = (this.dir + turnDir) % 4;
            // Randomly restart the steps limit
            this.stepsLeft = floor(random(5, 40));
        }
    }

    display() {
        stroke(this.baseColor);
        strokeWeight(this.weight);
        noFill();
        strokeJoin(MITER); // Give the corners a harsh, retro pipe connection
        strokeCap(PROJECT);

        beginShape();
        for (let p of this.history) {
            vertex(p.x, p.y);
        }
        vertex(this.pos.x, this.pos.y);
        endShape();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(15, 23, 42);
}
