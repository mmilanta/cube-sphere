import './style.css'
import { IsometricCanvas } from './render.ts';
import { get_sphere } from './sphere.ts';

let canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) {
    throw new Error("Canvas element not found");
}
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Cannot build context");
}

const slider = document.getElementById('slider') as HTMLInputElement;
const label = document.getElementById('value-label') as HTMLLabelElement;
slider.addEventListener('input', () => {
  read_slider_and_render()
});

function read_slider_and_render(){
    if (!canvas) {
        throw new Error("Canvas element not found");
    }
    if (!ctx) {
        throw new Error("Cannot build context");
    }

    const rect = canvas.getBoundingClientRect();

    // Set internal drawing size to match CSS size
    canvas.width = rect.width;
    canvas.height = rect.height - 100;
    const val = parseInt(slider.value);
    label.textContent = val.toString();
    const blocks = get_sphere(val)
    const isometric_canvas: IsometricCanvas = new IsometricCanvas(
        ctx,
        [val, val, val],
        blocks,
        ["#933DF0", "#5F0EB5", "#C392F7"]
    )
    isometric_canvas.render();
}
window.addEventListener('load', read_slider_and_render);
window.addEventListener('resize', read_slider_and_render);
read_slider_and_render()