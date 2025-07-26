import { type BlockShape, type Coords3d, minecraftBlocks} from './counter.ts'

type BlockTopView = {
    values: number[][]; // 2x2 matrix
    name: string;
    id: number;
};

const blocks: BlockTopView[] = [
    {
        values: [[1, 1], [1, 1]],
        name: "Full",
        id: 0,
    },
    {
        values: [[0, 0], [0, 0]],
        name: "Empty",
        id: -1,
    },
    {
        values: [[0.5, 0.5], [0.5, 0.5]],
        name: "Slab",
        id: 1,
    },
    {
        values: [[0.5, 0.5], [1, 1]],
        name: "Stair1",
        id: 6,
    },
    {
        values: [[0.5, 1], [0.5, 1]],
        name: "Stair2",
        id: 5,
    },
    {
        values: [[1, 1], [0.5, 0.5]],
        name: "Stair3",
        id: 4,
    },
    {
        values: [[1, 0.5], [1, 0.5]],
        name: "Stair4",
        id: 3,
    },
    {
        values: [[0.5, 0.5], [0.5, 1]],
        name: "OuterCornerStair1",
        id: 13,
    },
    {
        values: [[0.5, 0.5], [1, 0.5]],
        name: "OuterCornerStair2",
        id: 14,
    },
    {
        values: [[1, 0.5], [0.5, 0.5]],
        name: "OuterCornerStair3",
        id: 11,
    },
    {
        values: [[0.5, 1], [0.5, 0.5]],
        name: "OuterCornerStair4",
        id: 12,
    },
    {
        values: [[0.5, 1], [1, 1]],
        name: "InnerCornerStair1",
        id: 19,
    },
    {
        values: [[1, 1], [0.5, 1]],
        name: "InnerCornerStair2",
        id: 20,
    },
    {
        values: [[1, 1], [1, 0.5]],
        name: "InnerCornerStair3",
        id: 22, //down
    },
    {
        values: [[1, 0.5], [1, 1]],
        name: "InnerCornerStair4",
        id: 21, // left
    },
];
const blocks_no_corner: BlockTopView[] = blocks.slice(0, 7);


function assignBlock(vals: number[][], use_corner: boolean):  {lift: number, selectedId: number}{
    // Flatten the 2x2 input matrix
    const flatVals = vals.flat().map(v => v / 2);

    // Compute lift
    const lift = Math.floor(Math.min(...flatVals));

    if (flatVals.filter(x => x === 0).length >= 2){
        return {
            lift: 0,
            selectedId: -1
        }
    }

    // Adjust values by subtracting lift
    const adjustedVals = flatVals.map(v => v - lift);

    let minError = Infinity;
    let selectedId = -1;
    const blocks_to_use = use_corner ? blocks : blocks_no_corner;
    for (const block of blocks_to_use) {
        const blockVals = block.values.flat(); // Flatten block's 2x2 matrix
        let error = 0;

        for (let i = 0; i < 4; i++) {
            const diff = blockVals[i] - adjustedVals[i];
            error += diff * diff;
        }

        if (error < minError) {
            minError = error;
            selectedId = block.id;
        }
    }

    return {
        lift: lift,
        selectedId: selectedId,
    };
}


function get2x2Submatrix(data: number[][], i: number, j: number): number[][] {
    const rowStart = 2 * i;
    const colStart = 2 * j;

    return [
        [data[rowStart][colStart],     data[rowStart][colStart + 1]],
        [data[rowStart + 1][colStart], data[rowStart + 1][colStart + 1]]
    ];
}


export function get_sphere(radius: number, use_corner: boolean): Array<[BlockShape, Coords3d]>{
    const size = 2 * radius;
    const data: number[][] = [];
    // Generate height data
    for (let i = 0; i < size; i++) {
        const row: number[] = [];
        for (let j = 0; j < size; j++) {
            const x = i + 0.5 - radius;
            const y = j + 0.5 - radius;
            const value = Math.sqrt(Math.max(radius * radius - x * x - y * y, 0));
            row.push(value);
        }
        data.push(row);
    }
    var bloks_output: Array<[BlockShape, Coords3d]> = []
    for (let i = 0; i < radius; i++) {
        for (let j = 0; j < radius; j++) {
            const {lift, selectedId} = assignBlock(get2x2Submatrix(data, i, j), use_corner)
            for (let k = 0; k < lift; k++) {
                bloks_output.push([minecraftBlocks[0], [i, j, k]])
            }
            if (selectedId >= 0){
                bloks_output.push([minecraftBlocks[selectedId], [i, j, lift]])
            }
        }
    }
    return bloks_output
}