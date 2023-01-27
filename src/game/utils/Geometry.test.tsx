import { Circle, Line, Point2, Quad, Triangle } from './Geometry';

describe('Geometry', () => {
  describe('Point', () => {
    test('rotate', () => {
      const point = new Point2(-2, 2);
      point.rotate(0.785398163);
      expect(point.x).toBeCloseTo(-2.83);
      expect(point.y).toBeCloseTo(0);
    });
  });

  describe('Triangle', () => {
    test('getHalfPerimeter', () => {
      const A = new Point2(0, 0);
      const B = new Point2(5, 4);
      const C = new Point2(7, 2);
      const triangle = new Triangle([A, B, C]);
      const half = triangle.getHalfPerimeter();
      expect(half).toBeCloseTo(8.255831);
    });

    test('getSquare', () => {
      {
        const A = new Point2(0, 0);
        const B = new Point2(5, 4);
        const C = new Point2(7, 2);
        const triangle = new Triangle([A, B, C]);
        const square = triangle.getSquare();
        expect(square).toBeCloseTo(9);
      }

      {
        const A = new Point2(2, 1);
        const B = new Point2(1, 4);
        const C = new Point2(8, -4);
        const triangle = new Triangle([A, B, C]);
        const square = triangle.getSquare();
        expect(square).toBeCloseTo(6.5);
      }

      {
        const A = new Point2(-6.72, 1.64);
        const B = new Point2(1, 4);
        const C = new Point2(-4.58, -5.06);
        const triangle = new Triangle([A, B, C]);
        const square = triangle.getSquare();
        expect(square).toBeCloseTo(28.3872);
      }
    });

    test('isCollidePoint', () => {
      {
        const A = new Point2(-4.98, 5.62);
        const B = new Point2(-4.6, -1.24);
        const C = new Point2(2.4, -3);
        const triangle = new Triangle([A, B, C]);
        {
          const point = new Point2(-6, 3);
          expect(triangle.isCollidePoint(point)).toBe(false);
        }

        {
          const point = new Point2(-4, 3);
          expect(triangle.isCollidePoint(point)).toBe(true);
        }
        {
          const point = new Point2(-2.0710243902, 2.6168780488);
          expect(triangle.isCollidePoint(point)).toBe(false);
        }
        {
          const point = new Point2(-2.0946341463, -1.7037073171);
          expect(triangle.isCollidePoint(point)).toBe(true);
        }
      }
      {
        const A = new Point2(1.7301463415, 3.632097561);
        const B = new Point2(-4.5028292683, -1.8453658537);
        const C = new Point2(-5.7069268293, 4.2223414634);
        const triangle = new Triangle([A, B, C]);
        {
          const point = new Point2(-1.3391219512, 4.4584390244);
          expect(triangle.isCollidePoint(point)).toBe(false);
        }
        {
          const point = new Point2(1.5884878049, 3.5848780488);
          expect(triangle.isCollidePoint(point)).toBe(true);
        }
      }
    });
  });

  describe('Quad', () => {
    test('getSquare', () => {
      {
        const A = new Point2(-4.14, 3.36);
        const B = new Point2(1.3, 4.78);
        const C = new Point2(2, 1.7);
        const D = new Point2(-8, 1);
        const quad = new Quad([A, B, C, D]);
        expect(quad.getSquare()).toBeCloseTo(19.32);
      }
      {
        const A = new Point2(-3.16, 2.26);
        const B = new Point2(-1.58, 3.22);
        const C = new Point2(-4.82, 0.6);
        const D = new Point2(-7.72, 1.72);
        const quad = new Quad([A, B, C, D]);
        expect(quad.getSquare()).toBeCloseTo(3.85);
      }
      {
        const A = new Point2(-5, 5);
        const B = new Point2(-4, 5);
        const C = new Point2(-4, 4);
        const D = new Point2(-5, 4);
        const quad = new Quad([A, B, C, D]);
        expect(quad.getSquare()).toBeCloseTo(1);
      }
    });

    test('isCollidePoint', () => {
      {
        const A = new Point2(-5, 5);
        const B = new Point2(-4, 5);
        const C = new Point2(-4, 4);
        const D = new Point2(-5, 4);
        const quad = new Quad([A, B, C, D]);
        const point = new Point2(-4.54598, 3.21355);
        expect(quad.isCollidePoint(point)).toBe(false);
      }
      {
        const A = new Point2(-5, 5);
        const B = new Point2(-4, 5);
        const C = new Point2(-4, 4);
        const D = new Point2(-5, 4);
        const quad = new Quad([A, B, C, D]);
        const point = new Point2(-4.20982, 4.09979);
        expect(quad.isCollidePoint(point)).toBe(true);
      }
      {
        const A = new Point2(-6.44071, 3.67195);
        const B = new Point2(-4.20982, 4.11507);
        const C = new Point2(-7.87703, 2.75514);
        const D = new Point2(-6.15039, 4.34427);
        const quad = new Quad([A, B, C, D]);
        const point = new Point2(-3.85838, 5.12355);
        expect(quad.isCollidePoint(point)).toBe(false);
      }
      {
        const A = new Point2(-6.44071, 3.67195);
        const B = new Point2(-4.20982, 4.11507);
        const C = new Point2(-7.87703, 2.75514);
        const D = new Point2(-6.15039, 4.34427);
        const quad = new Quad([A, B, C, D]);
        const point = new Point2(-5.2947, 3.80947);
        expect(quad.isCollidePoint(point)).toBe(true);
      }

      {
        const A = new Point2(-6, 6);
        const B = new Point2(-6, 2);
        const C = new Point2(-2, 2);
        const D = new Point2(-2, 6);
        const quad = new Quad([A, B, C, D]);
        const point = new Point2(-4, 4);
        expect(quad.isCollidePoint(point)).toBe(true);
      }
    });

    test('isCollideQuad', () => {
      {
        const A = new Point2(-6.84, 6.1);
        const B = new Point2(-7.16, 2.82);
        const C = new Point2(-3.34, 2.9);
        const D = new Point2(-3.46, 6.5);

        const E = new Point2(-1.18, 6.36);
        const F = new Point2(-1.42, 3.78);
        const G = new Point2(1.96, 3.84);
        const H = new Point2(1.26, 6.56);

        const quad_1 = new Quad([A, B, C, D]);
        const quad_2 = new Quad([E, F, G, H]);
        expect(quad_1.isCollideQuad(quad_2)).toBe(false);
      }
      {
        const A = new Point2(-6.84, 6.1);
        const B = new Point2(-7.16, 2.82);
        const C = new Point2(-3.34, 2.9);
        const D = new Point2(-3.46, 6.5);

        const E = new Point2(-6.42, 5.58);
        const F = new Point2(-5.5, 3.76);
        const G = new Point2(-4.2, 4.1);
        const H = new Point2(-4.54, 5.72);

        const quad_1 = new Quad([A, B, C, D]);
        const quad_2 = new Quad([E, F, G, H]);
        expect(quad_1.isCollideQuad(quad_2)).toBe(true);
        expect(quad_2.isCollideQuad(quad_1)).toBe(true);
      }
      {
        const A = new Point2(-6.84, 6.1);
        const B = new Point2(-7.16, 2.82);
        const C = new Point2(-3.34, 2.9);
        const D = new Point2(-6.3, 3.4);

        const E = new Point2(-6.08, 5.84);
        const F = new Point2(-5.1, 1.2);
        const G = new Point2(-4.2, 4.1);
        const H = new Point2(-4.54, 5.72);

        const quad_1 = new Quad([A, B, C, D]);
        const quad_2 = new Quad([E, F, G, H]);
        expect(quad_1.isCollideQuad(quad_2)).toBe(true);
        expect(quad_2.isCollideQuad(quad_1)).toBe(true);
      }
    });

    test('isCollideCircle', () => {
      {
        const A = new Point2(1, 4);
        const B = new Point2(1, 2);
        const C = new Point2(3, 2);
        const D = new Point2(3, 4);

        const quad = new Quad([A, B, C, D]);

        const center = new Point2(0, 0);
        const circle = new Circle(center, 1);
        expect(quad.isCollideCircle(circle)).toBe(false);
      }
      {
        const A = new Point2(-2.56, 1.94);
        const B = new Point2(2.8, 4.42);
        const C = new Point2(3, 2);
        const D = new Point2(-2.24, 1.4);

        const quad = new Quad([A, B, C, D]);

        const center = new Point2(0, 0);
        const circle = new Circle(center, 1);
        expect(quad.isCollideCircle(circle)).toBe(false);
      }
      {
        const A = new Point2(-2.56, 1.94);
        const B = new Point2(2.8, 4.42);
        const C = new Point2(3, 2);
        const D = new Point2(-2.24, 1.4);

        const quad = new Quad([A, B, C, D]);

        const center = new Point2(0, 1);
        const circle = new Circle(center, 1);
        expect(quad.isCollideCircle(circle)).toBe(true);
      }
      {
        const A = new Point2(-2.56, 1.94);
        const B = new Point2(2.8, 4.42);
        const C = new Point2(3, 2);
        const D = new Point2(-2.24, 1.4);

        const quad = new Quad([A, B, C, D]);

        const center = new Point2(-3.28, 2.3);
        const circle = new Circle(center, 1);
        expect(quad.isCollideCircle(circle)).toBe(true);
      }
      {
        const A = new Point2(-6.16, 4.1);
        const B = new Point2(2.8, 4.42);
        const C = new Point2(3, 2);
        const D = new Point2(-3.92, 0.62);

        const quad = new Quad([A, B, C, D]);

        const center = new Point2(-3.28, 2.3);
        const circle = new Circle(center, 1);
        expect(quad.isCollideCircle(circle)).toBe(true);
      }
      {
        const A = new Point2(0.9155105948448181, 0.7797432541847229);
        const B = new Point2(1.9155105352401733, 0.7797432541847229);
        const C = new Point2(0.9155105948448181, -0.2202567458152771);
        const D = new Point2(1.9155105352401733, -0.2202567458152771);

        const quad = new Quad([A, B, C, D]);

        const center = new Point2(0, 0);
        const circle = new Circle(center, 0.5);
        expect(quad.isCollideCircle(circle)).toBe(false);
      }
    });

    test('isCollideLine', () => {
      {
        const A = new Point2(2, 4);
        const B = new Point2(2, 2);
        const C = new Point2(4, 2);
        const D = new Point2(4, 4);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(1, 3);
        const F = new Point2(1.83, 3);
        const line = new Line(E, F);
        expect(quad.isCollideLine(line)).toBe(false);
        expect(quad.isCollideLine(new Line(F, E))).toBe(false);
      }
      {
        const A = new Point2(2, 4);
        const B = new Point2(2, 2);
        const C = new Point2(4, 2);
        const D = new Point2(4, 4);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(1, 3);
        const F = new Point2(3, 3);
        const line = new Line(E, F);
        expect(quad.isCollideLine(line)).toBe(true);
        expect(quad.isCollideLine(new Line(F, E))).toBe(true);
      }
    });

    test('isQuadInside', () => {
      {
        const A = new Point2(2, 4);
        const B = new Point2(2, 2);
        const C = new Point2(4, 2);
        const D = new Point2(4, 4);

        const quad_1 = new Quad([A, B, C, D]);

        const E = new Point2(6, 4);
        const F = new Point2(8, 4);
        const G = new Point2(8, 2);
        const H = new Point2(6, 2);

        const quad_2 = new Quad([E, F, G, H]);
        expect(quad_1.isQuadInside(quad_2)).toBe(false);
      }

      {
        const A = new Point2(2, 4);
        const B = new Point2(2, 2);
        const C = new Point2(4, 2);
        const D = new Point2(4, 4);

        const quad_1 = new Quad([A, B, C, D]);

        const E = new Point2(3.10903, 3.22153);
        const F = new Point2(8, 4);
        const G = new Point2(8, 2);
        const H = new Point2(6, 2);

        const quad_2 = new Quad([E, F, G, H]);
        expect(quad_1.isQuadInside(quad_2)).toBe(false);
      }
      {
        const A = new Point2(2, 4);
        const B = new Point2(2, 2);
        const C = new Point2(4, 2);
        const D = new Point2(4, 4);

        const quad_1 = new Quad([A, B, C, D]);

        const E = new Point2(3.10903, 3.22153);
        const F = new Point2(3.53976, 3.52558);
        const G = new Point2(3.59044, 2.66411);
        const H = new Point2(2.88099, 2.51208);

        const quad_2 = new Quad([E, F, G, H]);
        expect(quad_1.isQuadInside(quad_2)).toBe(true);
      }
    });

    test('isCircleInside', () => {
      {
        const A = new Point2(2, 4);
        const B = new Point2(2, 2);
        const C = new Point2(4, 2);
        const D = new Point2(4, 4);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(3, 6);
        const r = 1;
        const circle = new Circle(E, r);
        expect(quad.isCircleInside(circle)).toBe(false);
      }

      {
        const A = new Point2(2, 4);
        const B = new Point2(2, 2);
        const C = new Point2(4, 2);
        const D = new Point2(4, 4);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(3, 3);
        const r = 0.5;
        const circle = new Circle(E, r);
        expect(quad.isCircleInside(circle)).toBe(true);
      }
      {
        const A = new Point2(2, 4);
        const B = new Point2(2, 2);
        const C = new Point2(4, 2);
        const D = new Point2(4, 4);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(3.5, 3);
        const r = 0.75;
        const circle = new Circle(E, r);
        expect(quad.isCircleInside(circle)).toBe(false);
      }
      {
        const A = new Point2(2, 4);
        const B = new Point2(2, 2);
        const C = new Point2(4, 2);
        const D = new Point2(4, 4);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(3, 3);
        const r = 2;
        const circle = new Circle(E, r);
        expect(quad.isCircleInside(circle)).toBe(false);
      }
      {
        const A = new Point2(0.5, 2);
        const B = new Point2(1.5, 2);
        const C = new Point2(1.5, 1);
        const D = new Point2(0.5, 1);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(0, 0);
        const r = 1;
        const circle = new Circle(E, r);
        expect(quad.isCircleInside(circle)).toBe(false);
      }
      {
        const A = new Point2(0.5, 2);
        const B = new Point2(1.5, 2);
        const C = new Point2(1.5, 1);
        const D = new Point2(0.5, 1);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(1, 1.5);
        const r = 1;
        const circle = new Circle(E, r);
        expect(quad.isCircleInside(circle)).toBe(false);
      }
    });
  });

  describe('Line', () => {
    test('isCollideLine', () => {
      {
        const A = new Point2(-4.2, 2.82);
        const B = new Point2(-1, 6);
        const C = new Point2(-1.04, 2.74);
        const D = new Point2(-4.78, 6.38);

        const line_1 = new Line(A, B);
        const line_2 = new Line(C, D);

        expect(line_1.isCollideLine(line_2)).toBe(true);
      }
      {
        const A = new Point2(-4.2, 2.82);
        const B = new Point2(-1, 6);
        const C = new Point2(-1.04, 2.74);
        const D = new Point2(-2, 4);

        const line_1 = new Line(A, B);
        const line_2 = new Line(C, D);

        expect(line_1.isCollideLine(line_2)).toBe(false);
      }
      {
        const A = new Point2(-1.46, 2.52);
        const B = new Point2(-1, 6);
        const C = new Point2(-1.04, 2.74);
        const D = new Point2(-4.44, 3.16);

        const line_1 = new Line(A, B);
        const line_2 = new Line(C, D);

        expect(line_1.isCollideLine(line_2)).toBe(true);
      }
    });

    test('isCollideCircle', () => {
      {
        const A = new Point2(0, 0);
        const B = new Point2(1, 1);
        const line = new Line(A, B);
        const center = new Point2(0, 0);
        const circle = new Circle(center, 1);
        expect(line.isCollideCircle(circle)).toBe(true);

        const line_2 = new Line(B, A);
        expect(line_2.isCollideCircle(circle)).toBe(true);
      }
      {
        const A = new Point2(-2, 0);
        const B = new Point2(2, 1);
        const line = new Line(A, B);
        const center = new Point2(0, 0);
        const circle = new Circle(center, 1);
        expect(line.isCollideCircle(circle)).toBe(true);

        const line_2 = new Line(B, A);
        expect(line_2.isCollideCircle(circle)).toBe(true);
      }
      {
        const A = new Point2(-3.14, 2);
        const B = new Point2(2.3, 3.46);
        const line = new Line(A, B);
        const center = new Point2(1.18, 1.68);
        const circle = new Circle(center, 2);
        expect(line.isCollideCircle(circle)).toBe(true);

        const line_2 = new Line(B, A);
        expect(line_2.isCollideCircle(circle)).toBe(true);
      }
      {
        const A = new Point2(-3.14, 2);
        const B = new Point2(-0.94, 3.78);
        const line = new Line(A, B);
        const center = new Point2(1.18, 1.68);
        const circle = new Circle(center, 2);
        expect(line.isCollideCircle(circle)).toBe(false);

        const line_2 = new Line(B, A);
        expect(line_2.isCollideCircle(circle)).toBe(false);
      }
      {
        const A = new Point2(0, 4);
        const B = new Point2(0, 2);

        const line = new Line(A, B);
        const center = new Point2(0, 0);
        const circle = new Circle(center, 1);
        expect(line.isCollideCircle(circle)).toBe(false);

        const line_2 = new Line(B, A);
        expect(line_2.isCollideCircle(circle)).toBe(false);
      }
      {
        const C = new Point2(0.9155105948448181, -0.2202567458152771);
        const D = new Point2(1.9155105352401733, -0.2202567458152771);

        const line = new Line(C, D);
        const center = new Point2(0, 0);
        const circle = new Circle(center, 0.5);
        expect(line.isCollideCircle(circle)).toBe(false);

        const line_2 = new Line(D, C);
        expect(line_2.isCollideCircle(circle)).toBe(false);
      }
      {
        const A = new Point2(1.11321, 0.21805);
        const B = new Point2(0.62388, 0.04263);

        const line = new Line(A, B);
        const center = new Point2(0, 0);
        const circle = new Circle(center, 0.5);
        expect(line.isCollideCircle(circle)).toBe(false);
        const line_2 = new Line(B, A);
        expect(line_2.isCollideCircle(circle)).toBe(false);
      }
      {
        const A = new Point2(1.11321, 0.21805);
        const B = new Point2(0.3469, -0.08662);

        const line = new Line(A, B);
        const center = new Point2(0, 0);
        const circle = new Circle(center, 0.5);
        expect(line.isCollideCircle(circle)).toBe(true);

        const line_2 = new Line(B, A);
        expect(line_2.isCollideCircle(circle)).toBe(true);
      }
      {
        const A = new Point2(0.7993, 0.21805);
        const B = new Point2(-0.5856, -0.43747);

        const line = new Line(A, B);
        const center = new Point2(0, 0);
        const circle = new Circle(center, 0.5);
        expect(line.isCollideCircle(circle)).toBe(true);

        const line_2 = new Line(B, A);
        expect(line_2.isCollideCircle(circle)).toBe(true);
      }
    });
  });

  describe('Circle', () => {
    test('isCollidePoint', () => {
      {
        const center = new Point2(0, 0);
        const circle = new Circle(center, 2);
        const point = new Point2(1, 1);
        expect(circle.isCollidePoint(point)).toBe(true);
      }

      {
        const center = new Point2(0, 0);
        const circle = new Circle(center, 1);
        const point = new Point2(1, 1);
        expect(circle.isCollidePoint(point)).toBe(false);
      }
    });

    test('isCollideCircle', () => {
      {
        const center_1 = new Point2(0, 0);
        const circle_1 = new Circle(center_1, 1);

        const center_2 = new Point2(3, 0);
        const circle_2 = new Circle(center_2, 1);

        expect(circle_1.isCollideCircle(circle_2)).toBe(false);
      }

      {
        const center_1 = new Point2(0, 0);
        const circle_1 = new Circle(center_1, 1);

        const center_2 = new Point2(2, 0);
        const circle_2 = new Circle(center_2, 1);

        expect(circle_1.isCollideCircle(circle_2)).toBe(false);
      }

      {
        const center_1 = new Point2(0, 0);
        const circle_1 = new Circle(center_1, 5);

        const center_2 = new Point2(1, 0);
        const circle_2 = new Circle(center_2, 1);

        expect(circle_1.isCollideCircle(circle_2)).toBe(true);
        expect(circle_2.isCollideCircle(circle_1)).toBe(true);
      }
    });

    test('isQuadInside', () => {
      {
        const A = new Point2(0.5, 2);
        const B = new Point2(1.5, 2);
        const C = new Point2(1.5, 1);
        const D = new Point2(0.5, 1);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(-1, 1.5);
        const r = 1;
        const circle = new Circle(E, r);
        expect(circle.isQuadInside(quad)).toBe(false);
      }

      {
        const A = new Point2(0.5, 2);
        const B = new Point2(1.5, 2);
        const C = new Point2(1.5, 1);
        const D = new Point2(0.5, 1);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(1, 1.5);
        const r = 1;
        const circle = new Circle(E, r);
        expect(circle.isQuadInside(quad)).toBe(true);
      }
      {
        const A = new Point2(0.5, 2);
        const B = new Point2(1.5, 2);
        const C = new Point2(1.5, 1);
        const D = new Point2(1.9, 0.67);

        const quad = new Quad([A, B, C, D]);

        const E = new Point2(1, 1.5);
        const r = 1;
        const circle = new Circle(E, r);
        expect(circle.isQuadInside(quad)).toBe(false);
      }
    });

    test('isCircleInside', () => {
      {
        const A = new Point2(1, 1);
        const rA = 1;
        const B = new Point2(3, 3);
        const rB = 1;
        const circle_a = new Circle(A, rA);
        const circle_b = new Circle(B, rB);
        expect(circle_a.isCircleInside(circle_b)).toBe(false);
      }
      {
        const A = new Point2(1, 1);
        const rA = 1;
        const B = new Point2(1.5, 1.5);
        const rB = 0.1;
        const circle_a = new Circle(A, rA);
        const circle_b = new Circle(B, rB);
        expect(circle_a.isCircleInside(circle_b)).toBe(true);
      }
      {
        const A = new Point2(1, 1);
        const rA = 1;
        const B = new Point2(1, 1);
        const rB = 1;
        const circle_a = new Circle(A, rA);
        const circle_b = new Circle(B, rB);
        expect(circle_a.isCircleInside(circle_b)).toBe(false);
      }
    });
  });
});
