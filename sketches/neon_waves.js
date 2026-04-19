// neon_waves.js
// A classic generative landscape using organic moving sine/noise waves
let yoff = 0.0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(15, 23, 42); // slate background to match CSS
}

function draw() {
    background(15, 23, 42, 20); // faint trailing effect for waves
    noStroke();

    let numWaves = 4;
    for (let i = 0; i < numWaves; i++) {
        beginShape();

        let xoff = 0;
        for (let x = 0; x <= width + 50; x += 30) {
            // Complex noise for cool organic movement along the bottom chunk of the screen
            let y = map(noise(xoff, yoff + (i * 0.5), frameCount * 0.002), 0, 1, height * 0.3, height * 0.9);

            // Assign gradient styles to different waves
            if (i == 0) fill(236, 72, 153, 50); // Pink
            if (i == 1) fill(168, 85, 247, 50); // Purple
            if (i == 2) fill(56, 189, 248, 50); // Blue
            if (i == 3) fill(52, 211, 153, 50); // Emerald

            vertex(x, y + (i * 40));
            xoff += 0.03;
        }

        // Connect shape to bottom to create a block of color
        vertex(width, height);
        vertex(0, height);
        endShape(CLOSE);
    }
    yoff += 0.005; // slowly progress the noise along the Y axis
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(15, 23, 42);
}
