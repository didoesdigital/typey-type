import { getRandomBetween } from './utils';

let animationFrame;

let ConfettiParticle = function() {
  let confettiMinimumSize = 2; // pixels
  let confettiMaximumSize = 10; // pixels
  let confettiMinimumXVelocity = -30; // pixel distance per tick
  let confettiMaximumXVelocity = 30; // pixel distance per tick
  let confettiMinimumYVelocity = -30; // pixel distance per tick
  let confettiMaximumYVelocity = 10; // pixel distance per tick
  let gravity = 0.981;
  let confettiLife = 300; // ticks
  let confettiShrinkSpeed = 0.25; // pixels per tick
  let confettiLifeVariation = 10; // ticks
  let confettiDecaySpeed = 1; // life per tick

  // Bouncier, more upwards version:
  // let confettiMinimumSize = 2; // pixels
  // let confettiMaximumSize = 10; // pixels
  // let confettiMinimumXVelocity = -15; // pixel distance per tick
  // let confettiMaximumXVelocity = 15; // pixel distance per tick
  // let confettiMinimumYVelocity = -25; // pixel distance per tick
  // let confettiMaximumYVelocity = -15; // pixel distance per tick
  // let gravity = .981;
  // let confettiLife = 300; // ticks
  // let confettiLifeVariation = 10; // ticks
  // let confettiDecaySpeed = 1; // life per tick

  // let confettiShrinkSpeed = 0.075; // pixels per tick
  // let confettiShrinkSpeed = 0.025; // pixels per tick
  // let confettiShrinkSpeed = 0.25; // pixels per tick

  this.maximumAnimationDuration = 3000;
  this.velocity = {
    x: getRandomBetween(confettiMinimumXVelocity, confettiMaximumXVelocity),
    y: getRandomBetween(confettiMinimumYVelocity, confettiMaximumYVelocity)
  };
  this.radius = getRandomBetween(confettiMinimumSize, confettiMaximumSize);
  this.life = confettiLife + getRandomBetween(0, confettiLifeVariation);
  this.remainingLife = this.life;


  this.draw = ctx => {
    let p = this;

    if (this.remainingLife > 0 && this.radius > 0) {
      ctx.beginPath();
      ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + "," + this.rgbArray[3] + ")";
      ctx.fill();

      p.remainingLife -= confettiDecaySpeed;
      p.radius -= confettiShrinkSpeed;
      p.startX += p.velocity.x;
      p.startY += p.velocity.y;
      p.velocity.y = p.velocity.y + gravity;
    }
  }
}

function createParticleAtPoint(x, y, colorData, particles) {
  let particle = new ConfettiParticle();
  particle.rgbArray = colorData;
  particle.startX = x;
  particle.startY = y;
  particle.startTime = Date.now();

  particles.push(particle);
}

function setupCanvas(config, confettiSourceID, particles) {
  if (!config['sparsity']) { throw new Error("Bad confetti config"); }
  if (!config['colors']) { throw new Error("Bad confetti config"); }

  let positioningRandomness = 0;
  if (config['positioningRandomness'] && config['positioningRandomness'] > 0) {
    positioningRandomness = config['positioningRandomness'];
  }

  // let confettiSource = this.refs.finishedHeading;
  let confettiSource = document.getElementById(confettiSourceID);
  if (confettiSource) {
    let width = confettiSource.offsetWidth;
    let height = confettiSource.offsetHeight

    let count = 0;
    let bcr = confettiSource.getBoundingClientRect();

    for(let localX = 0; localX < width; localX++) {
      for(let localY = 0; localY < height; localY++) {
        if (count % config['sparsity'] === 0) {
          // $brand-highlight #ffd073 or $brand-primary #402351 confetti
          let colors;

          colors = [
            [255, 208, 115, getRandomBetween(0.7, 1)], // #FFD073
            [130, 66, 168, getRandomBetween(0.7, 1)], // #8242A8
            [255, 191, 64, getRandomBetween(0.7, 1)], // #FFBF40
            [69, 126, 80, getRandomBetween(0.7, 1)], // #457e50
            [149, 49, 89, getRandomBetween(0.7, 1)], // #953159
            [64, 35, 81, getRandomBetween(0.7, 1)], // #402351
            [35, 81, 44, getRandomBetween(0.7, 1)] // #23512C
          ];

          colors.splice(config['colors']);

          let rgbaColor = colors[Math.floor(Math.random() * colors.length)];

          let globalX =  (bcr.x + getRandomBetween(-positioningRandomness, positioningRandomness)) + localX;
          let globalY =  (bcr.y + getRandomBetween(-positioningRandomness, positioningRandomness)) + localY;

          createParticleAtPoint(globalX, globalY, rgbaColor, particles);
        }

        count++;
      }
    }
  }
}

function updateCanvas(localParticles, canvas, canvasWidth, canvasHeight) {
  if (canvas) {
    const ctx = canvas.getContext('2d');

    if (typeof ctx !== "undefined") {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const localParticlesLength = localParticles.length;
      for (let i = 0; i < localParticlesLength; i++) {
        localParticles[i].draw(ctx);
        const lastParticle = i === localParticles.length - 1;

        if (lastParticle) {
          const percentCompleted = ((Date.now() - localParticles[i].startTime) / localParticles[i].maximumAnimationDuration) * 100;

          if (percentCompleted > 100) {
            localParticles = [];
            // If timing is off and we've reached percentCompleted before all particles have died,
            // we need to clear the canvas so confetti does not get stuck:
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          }
        }
      }

      if (localParticles && localParticles.length > 0) {
        animationFrame = window.requestAnimationFrame(function () { updateCanvas(localParticles, canvas, canvasWidth, canvasHeight) });
      }
    }
  }
}

function cancelAnimation() {
  window.cancelAnimationFrame(animationFrame);
}

function restartAnimation(particles, canvas, canvasWidth, canvasHeight) {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animationFrame = window.requestAnimationFrame(function () { updateCanvas(particles, canvas, canvasWidth, canvasHeight) });
  }
}

export { ConfettiParticle, createParticleAtPoint, setupCanvas, updateCanvas, cancelAnimation, restartAnimation };
