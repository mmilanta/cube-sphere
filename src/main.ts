import './style.css'
import { renderSurface, minecraftBlocks , RenderIsometricBlock} from './counter.ts'
const delay = ms => new Promise(res => setTimeout(res, ms));

var canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) {
    throw new Error("Canvas element not found");
}
const ctx = canvas.getContext("2d");

function drawPath(path: Array<[number, number]>, size: number, offset: [number, number] = [0, 0], color: string = 'blue') {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo((path[0][0] * size) + offset[0], (path[0][1] * size) + offset[1]);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo((path[i][0] * size) + offset[0], (path[i][1] * size) + offset[1]);
    }

    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}
/*
var paths0 = RenderIsometricBlock([[[true, false], [false, false]], [[false, false], [false, false]]]);
var paths1 = RenderIsometricBlock([[[false, true], [false, false]], [[false, false], [false, false]]]);
var paths2 = RenderIsometricBlock([[[false, false], [true, false]], [[false, false], [false, false]]]);
var paths3 = RenderIsometricBlock([[[false, false], [false, true]], [[false, false], [false, false]]]);
var paths4 = RenderIsometricBlock([[[false, false], [false, false]], [[true, false], [false, false]]]);
var paths5 = RenderIsometricBlock([[[false, false], [false, false]], [[false, true], [false, false]]]);
var paths6 = RenderIsometricBlock([[[false, false], [false, false]], [[false, false], [true, false]]]);
var paths7 = RenderIsometricBlock([[[false, false], [false, false]], [[false, false], [false, true]]]);


for (const paths of [paths0, paths1, paths2, paths3, paths4, paths5, paths6, paths7]) {
    console.log(paths);
    for (const path of paths) {
        drawPath(path, 100, [100, 100], 'blue');
        await delay(100);
    }
}
*/
function* generateAllBoolMatrices2x2x2(): Generator<[[[boolean, boolean], [boolean, boolean]], [[boolean, boolean], [boolean, boolean]]]> {
  for (let i = 0; i < 256; i++) {
    // Convert i to 8-bit binary representation
    const bits = i.toString(2).padStart(8, '0').split('').map(b => b === '1');

    // Map bits into 3D structure
    const matrix: [[[boolean, boolean], [boolean, boolean]], [[boolean, boolean], [boolean, boolean]]] = [
      [
        [bits[0], bits[1]],
        [bits[2], bits[3]]
      ],
      [
        [bits[4], bits[5]],
        [bits[6], bits[7]]
      ]
    ];

    yield matrix;
  }
}
var i: number = 0;
for (const shape of minecraftBlocks) {
    console.log("Shape", i++, shape);
    var paths = RenderIsometricBlock(shape);
    for (const path of paths) {
        drawPath(path, 100, [100, 200 * (i)], 'blue');
        await delay(10);
    }
}