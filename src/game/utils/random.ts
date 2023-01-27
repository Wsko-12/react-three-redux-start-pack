const m = 4294967296,
a = 1664525,
c = 1013904223;

export default class Random {
  x: number;
  constructor(seed: number) {
    this.x = seed;
  }

  get() {
    const { x } = this;
    this.x = (a * x + c) % m;
    return this.x / m;
  }
}
