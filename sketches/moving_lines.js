// moving_lines.js
// A Constellation / Plexus effect where lines dynamically connect moving nodes based on proximity.
let nodes = [];
const numNodes = 120; // Number of floating points
const maxConnectDistance = 150; // How close they have to be to form a line

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(15, 23, 42); // match the slate #0f172a theme

    // Define the matching neon palette
    let palette = [
        color(56, 189, 248), // Cyan
        color(99, 102, 241), // Deep Blue
        color(168, 85, 247), // Purple
        color(236, 72, 153)  // Pink
    ];

    // Seed the nodes randomly across the screen
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            pos: createVector(random(width), random(height)),
            vel: p5.Vector.random2D().mult(random(0.2, 1.2)), // Random direction and speed
            baseColor: random(palette) // Assign a random neon color to each node
        });
    }
}

function draw() {
    // Redraw the solid background every frame to keep the lines crisp (no trailing here)
    background(15, 23, 42);

    // Step 1: Move all nodes
    for (let i = 0; i < nodes.length; i++) {
        let n = nodes[i];
        n.pos.add(n.vel);

        // Soft bounce off the edges of the screen
        if (n.pos.x < 0 || n.pos.x > width) n.vel.x *= -1;
        if (n.pos.y < 0 || n.pos.y > height) n.vel.y *= -1;
    }

    // Step 2: Draw the lines between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let d = dist(nodes[i].pos.x, nodes[i].pos.y, nodes[j].pos.x, nodes[j].pos.y);

            // If they are close enough, draw a line!
            if (d < maxConnectDistance) {
                // The closer they are, the more opaque/bright the line is
                let alpha = map(d, 0, maxConnectDistance, 255, 0);

                // Draw connecting line using the color of the first node
                let c = nodes[i].baseColor;
                stroke(red(c), green(c), blue(c), alpha);
                strokeWeight(1.5);
                line(nodes[i].pos.x, nodes[i].pos.y, nodes[j].pos.x, nodes[j].pos.y);
            }
        }

        // Step 3: Draw a tiny glowing dot at the actual node positions
        noStroke();
        let nc = nodes[i].baseColor;
        fill(red(nc), green(nc), blue(nc), 150);
        ellipse(nodes[i].pos.x, nodes[i].pos.y, 4);
    }
}

// Handle window resizing seamlessly
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(15, 23, 42);
}
