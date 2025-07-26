import './style.css'
import { IsometricCanvas } from './render.ts';
import { get_sphere } from './sphere.ts';
import { type BlockShape, type Coords3d} from './counter.ts'
let canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) {
    throw new Error("Canvas element not found");
}
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Cannot build context");
}

const slider_radius = document.getElementById('slider-radius') as HTMLInputElement;
const label_radius = document.getElementById('label-radius') as HTMLLabelElement;

const slider_cut = document.getElementById('slider-cut') as HTMLInputElement;
const label_cut = document.getElementById('label-cut') as HTMLLabelElement;
var blocks: Array<[BlockShape, Coords3d]> = []
var radius: number = 13
var cut: number = 7
var isometric_canvas: IsometricCanvas = new IsometricCanvas(
    ctx, [0,0,0],[],["#933DF0", "#5F0EB5", "#C392F7"]
)

function read_slider_and_render(){
    if (!canvas) {
        throw new Error("Canvas element not found");
    }
    if (!ctx) {
        throw new Error("Cannot build context");
    }
    isometric_canvas = new IsometricCanvas(
        ctx,
        [radius * 2, radius * 2, radius],
        blocks,
        ["#933DF0", "#5F0EB5", "#C392F7"]
    )
    isometric_canvas.render(cut=cut);
}

slider_radius.addEventListener('input', () => {
    radius = parseInt(slider_radius.value);
    cut = Math.floor(radius / 2)
    label_cut.textContent = "Cut: " + cut.toString();
    slider_cut.max = cut.toString();
    slider_cut.value = cut.toString();
    label_radius.textContent = "Radius: " + radius.toString();
    blocks = get_sphere(radius)
    isometric_canvas.render(cut=cut);
    read_slider_and_render()
});

slider_cut.addEventListener('input', () => {
    cut = parseInt(slider_cut.value);
    console.log(cut)
    label_cut.textContent = "Cut: " + cut.toString();
    isometric_canvas.render(cut=cut);
})

window.addEventListener('load', () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height - 100;
    read_slider_and_render()
});
window.addEventListener('resize', () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height - 100;
    read_slider_and_render()
});