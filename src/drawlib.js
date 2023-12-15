import * as Color from "./color.js";

/**
 * @typedef { Color.Color} Color
 * 
 * The following type definition is meant to be "opaque".
 * That mean that users of `drawlib` will be able to use the `Shape` type
 * but are discouraged to build shapes directly as this representation
 * in terms of `Square/Circle/Group` might change in the future 
 * (and actually, it will! See the part 2 of the homework!)
 * 
 * Users of the lib should build the shapes with helper functions such as
 * `square`, `circle` or `group`.
 * @typedef {
   | {kind: "Circle";radius: number;color: Color; xCenter: number; yCenter: number}
   | {kind: "Group"; shapes : Array<Shape>}
   | {kind: "Polygon";color: Color; points: Array<{x: number; y:number}>}
   } Shape
*/

/**
 * @param {Color} color
 * @param {number} side
 * @returns {Shape}
 */
export function square(color, side) {
  const halfSide = side/2;
  const nHalfSide = halfSide * -1;
  const points = [
    {x: nHalfSide, y: nHalfSide},
    {x: halfSide, y: nHalfSide},
    {x: halfSide, y: halfSide},
    {x: nHalfSide, y: halfSide}
  ];
  return { kind: "Polygon", color, points};
}

/**
 * @param {Color} color
 * @param {number} width
 * @param {number} height
 * @returns {Shape}
 */
export function rectangle(color, width, height) {
  const halfWidth = width/2;
  const nHalfWidth = halfWidth * -1;
  const halfHeight = height/2;
  const nHalfHeight = halfHeight * -1;
  const points = [
    {x: nHalfWidth, y: nHalfHeight},
    {x: halfWidth, y: nHalfHeight},
    {x: halfWidth, y: halfHeight},
    {x: nHalfWidth, y: halfHeight}
  ];
  return { kind: "Polygon", color, points};
}

/**
 * @param {Color} color
 * @param {number} radius
 * @returns {Shape}
 */
export function circle(color, radius) {
  return { kind: "Circle", radius, color, xCenter: 0, yCenter: 0 };
}

/**
 * @param {Array<Shape>} shapes
 * @returns {Shape}
 */
export function group(shapes) {
  return { kind: "Group", shapes };
}

/**
 * @param {Color} color
 * @param {Array<{x:number; y:number}>} points
 * @returns {Shape}
 */
export function polygon(color, points) {
  return { kind: "Polygon", color, points};
}

/**
 * Add `dx` and `dy` respectively to the `x` and `y` of
 * the shape. Apply this to all the sub shapes if the given one
 * is a "Group"
 * @param {number} dx
 * @param {number} dy
 * @param {Shape} shape
 * @returns {Shape}
 */
export function move(dx, dy, shape) {
  switch (shape.kind) {
    // TODO 1
    case "Group":
      shape.shapes.map((s) => move(dx,dy,s));
      break;
    case "Circle":
      shape.xCenter += dx;
      shape.yCenter += dy;
      break;
    case "Polygon":
      shape.points.map(point => {
        point.x += dx;
        point.y += dy;
      });
      break;
    default:
      throw "Unexpected! Some case is missing";
  }
  return shape;
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 * @returns {void}
 */
export function renderCentered(shape, context) {
  const width = context.canvas.width;
  const height = context.canvas.height;
  render(move(width / 2, height / 2, shape), context);
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 * @returns {void}
 */
function render(shape, context) {
  switch (shape.kind) {
    case "Circle":
      renderCircle(
        shape.color,
        shape.xCenter,
        shape.yCenter,
        shape.radius,
        context
      );
      break;
    case "Polygon":
      context.fillStyle = Color.render(shape.color);
      context.fill(polygonToPath(shape.points));
      break;
    case "Group":
      shape.shapes.forEach((shape) => render(shape, context));
      break;
    default:
      throw "Unexpected! Some case is missing";
  }
}

/**
 * @param {Color} color
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {CanvasRenderingContext2D} context
 */
function renderCircle(color, xCenter, yCenter, radius, context) {
  // TODO 2
  // (search for how to draw an "ellipse" in canvas)
  context.beginPath();
  context.ellipse(xCenter, yCenter, radius, radius, 0, 0, 360);
  context.fillStyle = Color.render(color);
  context.fill();
}

/**
* @returns {Path2D}
* @param {Array<{x:number;y:number}>} points
*/
function polygonToPath(points) {
  const path = new Path2D;
  path.moveTo(points[0].x, points[0].y);
  points.map((point) => {
    path.lineTo(point.x, point.y);
  })
  path.closePath();
  return path;
}
