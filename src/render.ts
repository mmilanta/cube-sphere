import { sqrt3_2,RenderIsometricBlock,  type BlockShape, type Coords3d} from './counter.ts'



export class IsometricCanvas{
    context: CanvasRenderingContext2D;
    size: [number, number, number];
    ratio: number;
    origin: [number, number];
    blocks: [BlockShape, Coords3d][];
    color: string;
    constructor(
        context: CanvasRenderingContext2D,
        size: [number, number, number],
        blocks: [BlockShape, Coords3d][],
        color: string = "red",
    )
    {
        this.context = context;
        this.size = size;
        let hight: number = size[2] + (size[0] + size[1]) * 0.5;
        let width: number = (size[0] + size[1]) * sqrt3_2;
        this.ratio = Math.min(
            this.context.canvas.clientHeight / hight,
            this.context.canvas.clientWidth / width
        )
        this.origin = [this.ratio * size[2] / hight, this.ratio * (size[0] * sqrt3_2) / width];
        this.blocks = blocks;
        this.color = color;
        blocks.sort((a, b) => (a[1][0] + a[1][1] + a[1][2] - b[1][0] - b[1][1] - b[1][2]))
    }
    _render_block(block_shape: BlockShape, block_position: Coords3d){
        const paths = RenderIsometricBlock(block_shape)
        for (const path of paths){
            this.context.beginPath();
            const offset = [
                this.origin[0] + (block_position[0] - block_position[1]) * sqrt3_2 * this.ratio,
                this.origin[1] + (-2 * block_position[2] + block_position[0] + block_position[1]) * 0.5 * this.ratio
            ]
            this.context.moveTo((path[0][0] * this.ratio) + offset[0], (path[0][1] * this.ratio) + offset[1]);
            for (let i = 1; i < path.length; i++) {
                this.context.lineTo((path[i][0] * this.ratio) + offset[0], (path[i][1] * this.ratio) + offset[1]);
            }
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.closePath();
            this.context.stroke();
        }
    }
    render(){
        for (const block of this.blocks){
            this._render_block(block[0], block[1])
        }
    }
}
