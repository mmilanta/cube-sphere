var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");
var sqrt2_3 = 0.866025;

function render_cube(x0, y0, size) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + size * sqrt2_3,y0 - size * .5);
    ctx.lineTo(x0 + size * sqrt2_3,y0 - size * 1.5);
    ctx.lineTo(x0,y0 - size);
    ctx.closePath();   
    ctx.fillStyle = "orange";  // Set fill color
    ctx.fill();          
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 - size * sqrt2_3,y0 - size * .5);
    ctx.lineTo(x0 - size * sqrt2_3,y0 - size * 1.5);
    ctx.lineTo(x0,y0 - size);
    ctx.closePath();   
    ctx.fillStyle = "blue";  // Set fill color
    ctx.fill();     
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x0, y0 - size);
    ctx.lineTo(x0 - size * sqrt2_3,y0 - size * 1.5);
    ctx.lineTo(x0,y0 - 2 * size);
    ctx.lineTo(x0 + size * sqrt2_3,y0 - size * 1.5);
    ctx.closePath();   
    ctx.fillStyle = "red";  // Set fill color
    ctx.fill();         
    ctx.stroke();
}
function render_cube_3d(x,y,z,origin_x0, origin_y0, size){
    x0 = ((x - y) * size * sqrt2_3) + origin_x0
    y0 = (-(2 * z + x + y) * size * 0.5) + origin_y0
    render_cube(x0, y0, size)
}
render_cube_3d(0,1,0, 250, 500, 100)
render_cube_3d(1,0,0, 250, 500, 100)
render_cube_3d(0,0,0, 250, 500, 100)
render_cube_3d(0,0,1, 250, 500, 100)
