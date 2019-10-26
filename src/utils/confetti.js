import { getRandomBetween } from './utils';

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

  this.maximumAnimationDuration = 1000;
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

export { ConfettiParticle, createParticleAtPoint };
