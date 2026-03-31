class AuthKitParticleField {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.options = {
      size: options.size ?? 1,
      countMultiplier: options.countMultiplier ?? 1,
      direction: options.direction ?? "up",
      minVelocity: options.minVelocity ?? 0.005,
      maxVelocity: options.maxVelocity ?? 0.015,
    };
    this.dimensions = { width: 0, height: 0 };
    this.particles = [];
    this.frameId = 0;
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
  }

  start() {
    if (!this.ctx) return;
    this.resizeObserver.observe(this.canvas);
    this.handleResize();
    this.tick();
  }

  stop() {
    cancelAnimationFrame(this.frameId);
    this.resizeObserver.disconnect();
  }

  handleResize() {
    this.dimensions.width = this.canvas.clientWidth;
    this.dimensions.height = this.canvas.clientHeight;
    this.canvas.width = this.dimensions.width;
    this.canvas.height = this.dimensions.height;

    const count = Math.round(
      this.dimensions.width * this.dimensions.height * 0.0006
    ) * this.options.countMultiplier;

    this.particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: this.options.size,
      velocity:
        Math.random() * (this.options.maxVelocity - this.options.minVelocity) +
        this.options.minVelocity,
      opacity: Math.random(),
      opacityVelocity: Math.random() * Math.PI,
      opacityBase: Math.random() * 0.3 + 0.7,
    }));
  }

  tick = () => {
    this.update();
    this.draw();
    this.frameId = requestAnimationFrame(this.tick);
  };

  update() {
    const step = 1 / 60;

    for (const particle of this.particles) {
      particle.opacity += 0.02 * particle.opacityVelocity;

      if (this.options.direction === "up") particle.y -= step * particle.velocity;
      if (this.options.direction === "down") particle.y += step * particle.velocity;
      if (this.options.direction === "left") particle.x -= step * particle.velocity;
      if (this.options.direction === "right") particle.x += step * particle.velocity;

      if (this.options.direction === "up" && particle.y < 0) particle.y = 1;
      if (this.options.direction === "down" && particle.y > 1) particle.y = 0;
      if (this.options.direction === "left" && particle.x < 0) particle.x = 1;
      if (this.options.direction === "right" && particle.x > 1) particle.x = 0;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);

    for (const particle of this.particles) {
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(255, 255, 255, ${
        Math.sin(particle.opacity) * particle.opacityBase
      })`;
      this.ctx.arc(
        particle.x * this.dimensions.width,
        particle.y * this.dimensions.height,
        particle.size / 2,
        0,
        2 * Math.PI
      );
      this.ctx.fill();
    }
  }
}

const canvas = document.querySelector("#particle-canvas");
const particleField = new AuthKitParticleField(canvas, {
  size: 1,
  countMultiplier: 1,
  direction: "up",
  minVelocity: 0.005,
  maxVelocity: 0.015,
});

particleField.start();
