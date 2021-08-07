module.exports = class Rect {
  constructor({ x, y, w, h, pixelRatio }) {
    this.x = x / pixelRatio;
    this.y = y / pixelRatio;
    this.w = w / pixelRatio;
    this.h = h / pixelRatio;
  }

  contains({ x, y }) {
    return (
      x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
    );
  }
};
