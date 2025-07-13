export type Particle = {
  /** red, green, blue, alpha */
  rgbArray: [number, number, number, number];
  startX: number;
  startY: number;
  startTime: number;
};

export type Particles = Particle[];
