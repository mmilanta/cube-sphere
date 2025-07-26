import './style.css'
import { IsometricCanvas } from './render.ts';
import { get_sphere } from './sphere.ts';

var canvas = document.querySelector<HTMLCanvasElement>('#canvas');
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
    const val = parseInt(slider.value);
    label.textContent = val.toString();
    console.log("start")
    const blocks = get_sphere(val)
    console.log("generated")
    if (!ctx) {
        throw new Error("Cannot build context");
    }
    const isometric_canvas: IsometricCanvas = new IsometricCanvas(
        ctx,
        [val, val, val],
        blocks,
        ["#933DF0", "#5F0EB5", "#C392F7"]
    )
    isometric_canvas.render();
    console.log("drawn")
}
read_slider_and_render()