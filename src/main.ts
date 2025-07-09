import './style.css'
import { renderSurface, transformIsometricPath , RenderIsometricBlock} from './counter.ts'
const delay = ms => new Promise(res => setTimeout(res, ms));

var canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) {
    throw new Error("Canvas element not found");
}
const ctx = canvas.getContext("2d");
var paths = RenderIsometricBlock([[[true, true], [true, false]], [[false, false], [false, false]]]);

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
console.log(paths);
for (const path of paths) {
    drawPath(path, 100, [100, 100], 'blue');
    await delay(100);
}