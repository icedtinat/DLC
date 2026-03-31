# AuthKit Hero Canvas Extract

This is a standalone extraction of the AuthKit landing-page hero background from `https://www.authkit.com/`.

What was extracted:

- The hero background is not a WebGL shader.
- It is a plain `2d` canvas effect rendered from AuthKit's main app chunk.
- The extracted runtime behavior came from the minified function around `0gx.zp70gkar0.js` byte offsets `172222-173500`.

Recovered behavior:

- Canvas fills the container with `opacity: 0.5`
- Particle density: `Math.round(width * height * 0.0006) * countMultiplier`
- Default options:
  - `size = 1`
  - `countMultiplier = 1`
  - `direction = "up"`
  - `minVelocity = 0.005`
  - `maxVelocity = 0.015`
- Each particle stores:
  - normalized `x` and `y`
  - `velocity`
  - `opacity`
  - `opacityVelocity = Math.random() * Math.PI`
  - `opacityBase = 0.7 -> 1.0`
- Per frame:
  - updates opacity by `0.02 * opacityVelocity`
  - moves in the chosen direction by `velocity / 60`
  - wraps around the viewport edges
  - clears the canvas
  - draws a white dot with alpha `Math.sin(opacity) * opacityBase`

Files:

- `index.html`: demo shell
- `style.css`: backdrop, grid, and spotlight layers
- `script.js`: extracted particle-field implementation

To preview locally, open `index.html` in a browser.
