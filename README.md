# Drew Ratliff Portfolio

A highly interactive, creative portfolio website featuring randomized generative art, a cinematic splash screen transition timeline, and a modern side-drawer interface.

## Technologies Used
- **HTML5 & Vanilla CSS3**: Highly optimized responsive design using complex `calc()`, `clip`, and math-based layout variables without leaning on heavy JS libraries.
- **JavaScript (ES6)**: State management, timeline-sequencing, and DOM manipulation.
- **[p5.js](https://p5js.org/)**: Client-side library used to render robust, organically interactive generative canvas art.
- **Google Fonts**: Uses "Ponomar" (with fallbacks) universally across the entire DOM for a striking, retro Church Slavonic/Blackletter branding aesthetic.

## Deep Feature Set

### 1. Generative Visuals Engine
The site dynamically loads a randomly selected `p5.js` art piece on every single page load to ensure the visual aesthetic is always unique. Included sketches:
- `particle_flow.js` (Perlin noise trailing particle swarms)
- `neon_waves.js` (Organic translucent overlapping sine waves)
- `moving_lines.js` (Dynamic constellation/plexus network)
- `orthogonal_crawler.js` (Grid-based trailing pipe crawlers)

### 2. Interactive Splash Morphing
The site operates natively as a full-screen landing splash page. Clicking the title initiates a cinematic, 4-stage javascript-managed CSS layout transition:
1. Draws a `100vw` white divider tracking line exactly across the screen natively bonded to the bottom bound of the typography.
2. Cross-fades the dead-space body to black.
3. Rapidly snaps and shrinks the title to the top-left to permanently serve as a branded site header icon.
4. Seamlessly fades the master website content into view below the fold.

### 3. Dynamic "Camera" Panning
When the `<header>` transitions from `100vh` to a `120px` navigation bar, a CSS manipulation physically translates the massive background p5 canvas `60vh` upward simultaneously. This ensures the geometric "action-center" of whatever randomly selected sketch is running is perfectly framed inside the new navbar without requiring a canvas recalculation!

### 4. Off-Canvas Glass Navigation Drawer
After the morph transition completes, a minimalist hamburger icon resolves in the top right. Clicking it launches a 100vh tall, glassy side-drawer menu cascading in from the right viewport edge. The contained navigation links animate inward with a sequential, staggered `.nth-child` cascade timeline mechanism, complete with brilliant white-glowing hover logic.

### 5. Generative Haiku Content
The Welcome section is dynamically hydrated by a lightweight javascript text randomizer. It chooses a curated, generative-art themed haiku from a string array and injects it onto the page formatted mathematically into structural verse.

## Deployment
This project relies on zero backend processes and is deployed as a static client-side bundle hosted securely via **GitHub Pages**.
