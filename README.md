# Drew Ratliff Portfolio

A personal static portfolio website featuring dynamic, generative art.

## Technologies Used
- **HTML5 & CSS3**: For the layout and typography overlay.
- **JavaScript**: Core logic for the generative visuals.
- **[p5.js](https://p5js.org/)**: A JS client-side library (the web equivalent of Processing) used to create the generative art canvas.
- **Google Fonts**: Utilizing "Ponomar" for an elegant, Old Church Slavonic/Blackletter aesthetic.

## Feature Overview 
Currently, the portfolio serves as a highly visual landing page. It consists of:
- A full-screen p5.js canvas sketch.
- Hundreds of glowing particles directed by **Perlin noise** physics to create an organic, flowing, trailing visual effect over a dark background.
- Crisp HTML text layered cleanly over the canvas using specific `z-index` and `pointer-events` strategies so the art remains dynamic behind the text.

## Deployment
This project is completely static (client-side only) and is configured to be hosted natively and freely via **GitHub Pages**.
