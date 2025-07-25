import './style.css'
import { renderSurface, minecraftBlocks , RenderIsometricBlock} from './counter.ts'
import { IsometricCanvas } from './render.ts';

var canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) {
    throw new Error("Canvas element not found");
}
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Cannot build context");
}
const isometric_canvas: IsometricCanvas = new IsometricCanvas(
    ctx,
    [10, 10, 10],
    [
      [minecraftBlocks[0], [0, 0, 0]],
      [minecraftBlocks[1], [0, 0, 1]],
      [minecraftBlocks[2], [0, 1, 0]],
      [minecraftBlocks[3], [0, 0, 2]],
      [minecraftBlocks[5], [0, 0, 4]],
      [minecraftBlocks[4], [0, 2, 0]],
      [minecraftBlocks[5], [0, 3, 0]],
      [minecraftBlocks[6], [0, 4, 0]],
      [minecraftBlocks[7], [0, 5, 0]],
      [minecraftBlocks[8], [0, 6, 0]],
    ],
    ["red", "blue", "green"]
)
isometric_canvas.render();
