export type BlockShape = [
    [
        [boolean, boolean],
        [boolean, boolean]
    ],
    [
        [boolean, boolean],
        [boolean, boolean]
    ]
];

export const minecraftBlocks: BlockShape[] = [
    [[[true, true], [true, true]], [[true, true], [true, true]]], // Full cube
    [[[true, false], [true, false]], [[true, false], [true, false]]], // Low slab
    [[[false, true], [false, true]], [[false, true], [false, true]]], // Up slab
    [[[true, true], [true, false]], [[true, true], [true, false]]], // Stair1
    [[[true, true], [true, true]], [[true, false], [true, false]]], // Stair2
    [[[true, false], [true, true]], [[true, false], [true, true]]], // Stair3
    [[[true, false], [true, false]], [[true, true], [true, true]]], // Stair4
    [[[true, true], [false, true]], [[true, true], [false, true]]], // Stair1 - upside down
    [[[true, true], [true, true]], [[false, true], [false, true]]], // Stair2 - upside down
    [[[false, true], [true, true]], [[false, true], [true, true]]], // Stair3 - upside down
    [[[true, true], [false, true]], [[true, true], [true, true]]], // Stair4 - upside down
    [[[true, true], [true, false]], [[true, false], [true, false]]], // OuterCornerStair1
    [[[true, false], [true, true]], [[true, false], [true, false]]], // OuterCornerStair2
    [[[true, false], [true, false]], [[true, false], [true, true]]], // OuterCornerStair3
    [[[true, false], [true, false]], [[true, true], [true, false]]], // OuterCornerStair4
    [[[true, true], [false, true]], [[false, true], [false, true]]], // OuterCornerStair1 -` upside down
    [[[false, true], [false, true]], [[true, true], [false, true]]], // OuterCornerStair2 - upside down
    [[[false, true], [true, true]], [[false, true], [false, true]]], // OuterCornerStair3 - upside down
    [[[false, true], [false, true]], [[false, true], [true, true]]], // OuterCornerStair4 - upside down
    [[[true, false], [true, true]], [[true, true], [true, true]]], // InnerCornerStair1
    [[[true, true], [true, true]], [[true, false], [true, true]]], // InnerCornerStair2
    [[[true, true], [true, false]], [[true, true], [true, true]]], // InnerCornerStair3
    [[[true, true], [true, true]], [[true, true], [true, false]]], // InnerCornerStair4
    [[[false, true], [true, true]], [[true, true], [true, true]]], // InnerCornerStair1 - upside down
    [[[true, true], [true, true]], [[false, true], [true, true]]], // InnerCornerStair2 - upside down
    [[[true, true], [false, true]], [[true, true], [true, true]]], // InnerCornerStair3 - upside down
    [[[true, true], [true, true]], [[true, true], [false, true]]]  // InnerCornerStair4 - upside down
]

export function slice(shape: BlockShape, axis: number, idx: number): [[boolean, boolean], [boolean, boolean]] {
    if (axis === 0) {
        return shape[idx];
    } else if (axis === 1) {
        return shape.map(layer => layer[idx]) as [[boolean, boolean], [boolean, boolean]];
    } else if (axis === 2) {
        return shape.map(layer =>
            layer.map(row => row[idx])
        ) as [[boolean, boolean], [boolean, boolean]];
    }
    else {
        throw new Error("Invalid axis: " + axis + ". Axis must be 0, 1, or 2.");
    }
}


export type Coords2d = [number, number]
export type Coords3d = [number, number, number]

type Surface2d = {
    contour: Array<Coords2d>,
    axis: number  // axis 0,1,2 indicating axis
}
type Surface3d = {
    contour: Array<Coords3d>,
    axis: number  // axis 0,1,2 indicating axis
}

export const sqrt3_2 = Math.sqrt(3) / 2;

export function renderSurface(data: [[boolean, boolean], [boolean, boolean]]): Array<Coords2d> {
    const [x00, x10] = data[0];
    const [x01, x11] = data[1];

    var circuit: Array<Coords2d> = [
        [0, 0],
        [0.5, 0],
        [1, 0],
        [1, 0.5],
        [1, 1],
        [0.5, 1],
        [0, 1],
        [0, 0.5],
    ]
    if (! x00) {circuit[0] = [.5, .5]}
    if (! x01) {circuit[2] = [.5, .5]}
    if (! x10) {circuit[6] = [.5, .5]}
    if (! x11) {circuit[4] = [.5, .5]}
    if ((! x01) && (! x00)) {circuit[1] = [.5, .5]}
    if ((! x11) && (! x01)) {circuit[3] = [.5, .5]}
    if ((! x10) && (! x11)) {circuit[5] = [.5, .5]}
    if ((! x00) && (! x10)) {circuit[7] = [.5, .5]}
    var result: Array<Coords2d> = [circuit[0]]
    for (let i = 1; i < circuit.length; i++) {
        if (circuit[i] !== circuit[i - 1]) {
            result.push(circuit[i]);
        }
    }
    return circuit;
}


export function RenderIsometricBlock(shape: BlockShape): Array<Surface2d> {

    var subSurfaces: Array<Surface3d> = []
    for (let axis = 2; axis >= 0; axis--) {
        var surface = slice(shape, axis, 0);
        var surface_2 = slice(shape, axis, 1);
        surface = [
            [surface[0][0] && !surface_2[0][0], surface[0][1] && !surface_2[0][1]],
            [surface[1][0] && !surface_2[1][0], surface[1][1] && !surface_2[1][1]],
        ]
        var render = renderSurface(surface);
        var subSurface: Array<Coords3d> = [];
        for (let i = 0; i < render.length; i++) {
            const [x, y] = render[i];
            if (axis === 0) {
                subSurface.push([0.5, x, y]);
            } else if (axis === 1) {
                subSurface.push([x, 0.5, y]);
            } else if (axis === 2) {
                subSurface.push([x, y, 0.5]);
            }
        }
        subSurfaces.push({contour: subSurface, axis: axis});
    }
    for (let axis = 0; axis < 3; axis++) {
        var surface = slice(shape, axis, 1);
        var render = renderSurface(surface);
        var subSurface: Array<Coords3d> = [];
        for (let i = 0; i < render.length; i++) {
            const [x, y] = render[i];
            if (axis === 0) {
                subSurface.push([1, x, y]);
            } else if (axis === 1) {
                subSurface.push([x, 1, y]);
            } else if (axis === 2) {
                subSurface.push([x, y, 1]);
            }
        }
        subSurfaces.push({contour: subSurface, axis: axis});
    }
    return subSurfaces.map(surface => {return {contour: transformIsometricPath(surface.contour), axis: surface.axis}});
}

export function transformIsometricPoint(
    coord3d: [number, number, number],
): [number, number] {
    const [x, y, z] = coord3d;
    const xOffset = (x - y) * sqrt3_2;
    const yOffset = (x + y - 2 * z) * 0.5;
    return [xOffset, yOffset];
}


export function transformIsometricPath(
    path: Array<[number, number, number]>
): Array<[number, number]> {
    return path.map(coord => transformIsometricPoint(coord));
}



export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
