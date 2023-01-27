interface IPosition2 {
  x: number;
  y: number;
}
const NUM_PREC = 4;

export function roundNum(num: number, precision = NUM_PREC): number {
  return Math.round(num * 10 ** precision) / 10 ** precision;
}

export class Point2 {
  public x: number;
  public y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  getDistanceTo(x?: Point3 | Point2 | number, y?: number): number {
    if (x instanceof Point2 || x instanceof Point3) {
      return roundNum(Math.sqrt((this.x - x.x) ** 2 + (this.y - x.y) ** 2));
    }
    if (!x && !y) {
      return this.getDistanceTo(new Point2(0, 0));
    }
    if (typeof x === 'number' && typeof y === 'number') {
      return this.getDistanceTo(new Point2(x, y));
    }
    return 0;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getCirclePoint(angle: number, radius = 1) {
    return new Point2(this.x + Math.cos(angle) * radius, this.y + Math.sin(angle) * radius);
  }

  getCordsArr(): [number, number] {
    return [this.x, this.y];
  }

  getPositionObject(): IPosition2 {
    return {
      x: this.x,
      y: this.y,
    };
  }

  clone() {
    return new Point2(this.x, this.y);
  }

  rotate(angle: number) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const x = this.x * cos - this.y * sin;
    const y = this.x * sin + this.y * cos;

    this.x = x;
    this.y = y;
  }

  translate(x: number, y: number) {
    this.x += x;
    this.y += y;
  }
}

export class Point3 {
  public x: number;
  public y: number;
  public z: number;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getDistanceTo(x?: Point3 | Point2 | number, y?: number, z?: number): number {
    if (x instanceof Point3) {
      return roundNum(Math.sqrt((this.x - x.x) ** 2 + (this.y - x.y) ** 2 + (this.z - x.z) ** 2));
    }

    if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
      return this.getDistanceTo(new Point3(x, y, z));
    } else if (typeof x === 'number' && typeof y === 'number' && !z) {
      return this.getDistanceTo(new Point3(x, y, this.z));
    } else if (typeof x === 'number' && !y && !z) {
      return this.getDistanceTo(new Point3(x, this.y, this.z));
    } else if (x instanceof Point2) {
      return this.getDistanceTo(new Point3(x.x, x.y, this.z));
    } else if (!x && !y && !z) {
      return this.getDistanceTo(new Point3(0, 0, 0));
    }
    return 0;
  }

  getCordsArr(): [number, number, number] {
    return [this.x, this.y, this.z];
  }
}

export class Vector2 {
  public x: number;
  public y: number;
  public length: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.length = this.getLength();
  }

  public getLength(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  public normalize(): Vector2 {
    if (this.x === 0 && this.y === 0) return this;
    const length = this.getLength();
    this.x /= length;
    this.y /= length;
    this.length = this.getLength();
    return this;
  }

  public scale(scalar: number): Vector2 {
    this.x *= scalar;
    this.y *= scalar;
    this.length = this.getLength();
    return this;
  }

  public movePoint(point: Point2) {
    point.x += this.x;
    point.y += this.y;
    return point;
  }

  public getPerpendicularVector(): Vector2 {
    if (this.x === 0) {
      return new Vector2(this.y, 0);
    }
    if (this.y === 0) {
      return new Vector2(0, this.x);
    }
    return new Vector2(-this.y, this.x);
  }

  public addVector(vec: Vector2): Vector2 {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  public dot(vec: Vector2) {
    const length = this.getLength();
    const x = this.x / length;
    const y = this.y / length;
    return x * vec.x + y * vec.y;
  }
}

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;
  public length: number;

  constructor(x: number | Point3, y: number, z: number) {
    if (x instanceof Point3) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    this.length = this.getLength();
  }

  public getLength(): number {
    return roundNum(Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2));
  }

  public normalize(): Vector3 {
    if (this.x === 0 && this.y === 0 && this.z === 0) return this;
    const length = this.getLength();
    this.x = roundNum(this.x / length);
    this.y = roundNum(this.y / length);
    this.z = roundNum(this.z / length);
    this.length = this.getLength();
    return this;
  }

  public scale(scalar: number): Vector3 {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.length = this.getLength();
    return this;
  }
}

export class Line {
  start: Point2;
  end: Point2;
  constructor(start: Point2, end: Point2) {
    this.start = start;
    this.end = end;
  }

  getLength() {
    const x = this.start.x - this.end.x;
    const y = this.start.y - this.end.y;
    return Math.sqrt(x ** 2 + y ** 2);
  }

  isCollideLine(line: Line) {
    const x1 = this.start.x;
    const y1 = this.start.y;

    const x2 = this.end.x;
    const y2 = this.end.y;

    const x3 = line.start.x;
    const y3 = line.start.y;

    const x4 = line.end.x;
    const y4 = line.end.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (den === 0) {
      return false;
    }

    const tNum = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    const uNum = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2);

    const t = tNum / den;
    const u = uNum / den;

    return 0 < t && t < 1 && 0 < u && u < 1;
  }

  isCollideCircle(circle: Circle) {
    if (circle.isCollidePoint(this.start) || circle.isCollidePoint(this.end)) {
      return true;
    }

    const lineVector = new Vector2(this.end.x - this.start.x, this.end.y - this.start.y);

    const O = this.start;
    const C = circle.center;
    const OC = new Vector2(C.x - O.x, C.y - O.y);

    const OT_length = lineVector.normalize().dot(OC);
    if (OT_length <= 0 || OT_length > this.getLength()) {
      return false;
    }

    const CT_length = Math.sqrt(OC.getLength() ** 2 - OT_length ** 2);
    return CT_length <= circle.radius;
  }
}

export class Triangle {
  A: Point2;
  B: Point2;
  C: Point2;

  a: Line;
  b: Line;
  c: Line;

  constructor(points: [Point2, Point2, Point2]) {
    this.A = points[0].clone();
    this.B = points[1].clone();
    this.C = points[2].clone();

    this.a = new Line(this.A, this.B);
    this.b = new Line(this.B, this.C);
    this.c = new Line(this.C, this.A);
  }

  getHalfPerimeter() {
    const a = this.a.getLength();
    const b = this.b.getLength();
    const c = this.c.getLength();

    return (a + b + c) / 2;
  }

  getHeight() {
    const p = this.getHalfPerimeter();
    const a = this.a.getLength();
    const b = this.b.getLength();
    const c = this.c.getLength();
    const h = (2 * Math.sqrt(p * (p - a) * (p - b) * (p - c))) / a;
    return h;
  }

  getSquare() {
    const a = this.a.getLength();
    const h = this.getHeight();
    return 0.5 * a * h;
  }

  isCollidePoint(point: Point2) {
    const origSquare = this.getSquare();

    const triangle_1 = new Triangle([point, this.A, this.B]);
    const triangle_2 = new Triangle([point, this.B, this.C]);
    const triangle_3 = new Triangle([point, this.C, this.A]);

    const sumSquare = triangle_1.getSquare() + triangle_2.getSquare() + triangle_3.getSquare();
    return Math.abs(origSquare - sumSquare) < 0.00000001;
  }
}

export class Quad {
  A: Point2;
  B: Point2;
  C: Point2;
  D: Point2;

  a: Line;
  b: Line;
  c: Line;
  d: Line;

  triangle_1: Triangle;
  triangle_2: Triangle;

  constructor(points: [Point2, Point2, Point2, Point2]) {
    this.A = points[0].clone();
    this.B = points[1].clone();
    this.C = points[2].clone();
    this.D = points[3].clone();

    this.a = new Line(this.A, this.B);
    this.b = new Line(this.B, this.C);
    this.c = new Line(this.C, this.D);
    this.d = new Line(this.D, this.A);

    this.triangle_1 = new Triangle([this.A, this.B, this.C]);
    this.triangle_2 = new Triangle([this.A, this.D, this.C]);
  }

  getCorners(): [Point2, Point2, Point2, Point2] {
    return [this.A, this.B, this.C, this.D];
  }

  getEdges(): [Line, Line, Line, Line] {
    return [this.a, this.b, this.c, this.d];
  }

  getSquare() {
    const square_1 = this.triangle_1.getSquare();
    const square_2 = this.triangle_2.getSquare();
    return square_1 + square_2;
  }

  isCollidePoint(point: Point2) {
    return this.triangle_1.isCollidePoint(point) || this.triangle_2.isCollidePoint(point);
  }

  isCollideLine(line: Line) {
    const thisLines = [this.a, this.b, this.c, this.d];
    for (let i = 0; i < thisLines.length; i++) {
      const thisLine = thisLines[i];
      if (thisLine.isCollideLine(line)) {
        return true;
      }
    }
    return false;
  }
  isCollideQuad(quad: Quad) {
    // first check intersection lines;
    const quadLines = [quad.a, quad.b, quad.c, quad.d];

    for (let j = 0; j < quadLines.length; j++) {
      const quadLine = quadLines[j];
      if (this.isCollideLine(quadLine)) {
        return true;
      }
    }

    // if lines didn't intersect check one point
    // situation when one quad fully inside secondQuad;
    if (this.isCollidePoint(quad.A)) {
      return true;
    }
    if (quad.isCollidePoint(this.A)) {
      return true;
    }

    return false;
  }

  isCollideCircle(circle: Circle) {
    // first check quad corners inside circle
    const thisPoints = [this.A, this.B, this.C, this.D];
    for (let i = 0; i < thisPoints.length; i++) {
      const point = thisPoints[i];
      if (circle.isCollidePoint(point)) {
        return true;
      }
    }

    // then check edges intersect with circle
    const thisLines = [this.a, this.b, this.c, this.d];
    for (let i = 0; i < thisPoints.length; i++) {
      const line = thisLines[i];
      if (line.isCollideCircle(circle)) {
        return true;
      }
    }

    // then check center circle inside Quad;
    if (this.isCollidePoint(circle.center)) {
      return true;
    }

    return false;
  }

  isQuadInside(quad: Quad) {
    const corners = quad.getCorners();

    for (let i = 0; i < corners.length; i++) {
      const corner = corners[i];
      if (!this.isCollidePoint(corner)) {
        return false;
      }
    }

    const edges = quad.getEdges();

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (this.isCollideLine(edge)) {
        return false;
      }
    }
    return true;
  }

  isCircleInside(circle: Circle) {
    if (!this.isCollidePoint(circle.center)) {
      return false;
    }

    const lines = this.getEdges();
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.isCollideCircle(circle)) {
        return false;
      }
    }

    const corners = this.getCorners();
    for (let i = 0; i < corners.length; i++) {
      const corner = corners[i];
      if (circle.isCollidePoint(corner)) {
        return false;
      }
    }

    return true;
  }
}

export class Circle {
  center: Point2;
  radius: number;
  constructor(center: Point2, radius: number) {
    this.center = center;
    this.radius = radius;
  }

  isCollidePoint(point: Point2) {
    const distance = this.center.getDistanceTo(point);
    return distance < this.radius;
  }

  isCollideCircle(circle: Circle) {
    const distance = this.center.getDistanceTo(circle.center);
    const radSum = this.radius + circle.radius;
    return distance < radSum;
  }

  isCollideQuad(quad: Quad) {
    return quad.isCollideCircle(this);
  }

  isCollideLine(line: Line) {
    return line.isCollideCircle(this);
  }

  isQuadInside(quad: Quad) {
    const corners = quad.getCorners();
    for (let i = 0; i < corners.length; i++) {
      const corner = corners[i];
      if (!this.isCollidePoint(corner)) {
        return false;
      }
    }
    return true;
  }

  isCircleInside(circle: Circle) {
    const distance = this.center.getDistanceTo(circle.center);
    if (distance > this.radius) {
      return false;
    }
    if (distance + circle.radius >= this.radius) {
      return false;
    }
    return true;
  }
}
