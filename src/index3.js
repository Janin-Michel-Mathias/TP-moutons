import * as drawlib from "./drawlib.js";
import * as color from "./color.js";

/**
 * @throws {string}
 * @returns {CanvasRenderingContext2D}
 * @param {string} id
 */
function get2DContextById(id) {
  const canvas = document.getElementById(id);
  if (canvas === null) {
    throw "No html element with id `canvas` found";
  }
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw "The selected element is not a canvas";
  }
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      return ctx;
    } else {
      throw "Error when getting the context";
    }
  } else {
    throw "`getContext` is not a property of the element. Please use a modern browser.";
  }
}

const BODY_COLOR = color.grey;

/**
 * @returns {drawlib.Shape}
 * @param {number} x
 * @param {number} y
 */

function getTreeAt(x, y) {
    return drawlib.group([
        drawlib.move(x+25, y+140, drawlib.rectangle(color.brown, 40, 150)),
        drawlib.move(x, y-50, drawlib.circle(color.green, 100)),
        drawlib.move(x+50, y-50, drawlib.circle(color.green, 100)),
        drawlib.move(x,y, drawlib.circle(color.green, 100)),
        drawlib.move(x+50,y, drawlib.circle(color.green, 100)),
        drawlib.move(x+40, y+40, drawlib.circle(color.red, 10)),
        drawlib.move(x-20, y-90, drawlib.circle(color.red, 10)),
        drawlib.move(x+60, y-10, drawlib.circle(color.red, 10))
    ])
}

function getSheepAt(x, y) {
  return drawlib.group([
    drawlib.move(x-30, y+45, drawlib.rectangle(color.black, 10, 20)),
    drawlib.move(x+30, y+45, drawlib.rectangle(color.black, 10, 20)),
    drawlib.move(x,y, drawlib.circle(color.grey, 40)),
    drawlib.move(x-30, y, drawlib.circle(color.grey, 40)),
    drawlib.move(x+30, y, drawlib.circle(color.grey, 40)),
    drawlib.move(x+70, y-20, drawlib.circle(color.grey, 30)),
    drawlib.move(x+60, y-30, drawlib.circle(color.black, 2)),
    drawlib.move(x+80, y-30, drawlib.circle(color.black, 2)),
    drawlib.move(x+70, y-20, drawlib.circle(color.black, 3)),
    drawlib.move(x+70, y-10, drawlib.rectangle(color.black, 20,3))
  ])
}

const scene = drawlib.group([
    getTreeAt(300,-200),
    getTreeAt(0,-200),
    getTreeAt(-300, -200),
    getSheepAt(0,0),
    getSheepAt(-200, 20),
    getSheepAt(400, 40),
]
)



function main() {
    const context = get2DContextById("canvas");
    drawlib.renderCentered(scene, context);
  }

main();