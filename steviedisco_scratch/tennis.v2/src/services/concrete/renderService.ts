import * as framework from "helpers/imports.ts";

export class renderService implements framework.IrenderService
{
    $configService: framework.IconfigService;

    bufferIndex: number = 0;
    document: Document;
    buffers: HTMLCanvasElement[]; 

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(IconfigService: framework.IconfigService)
    {
        this.$configService = IconfigService;
    };

    initialise(document: Document)
    {    
        this.document = document;

        this.buffers = [
            this.document.createElement('canvas'),
            this.document.createElement('canvas')
        ];    

        this.initialiseBuffers();
    };

    render(): void
    {
        this.clear();
        this.drawAll();
        this.swapBuffers();
    };

    clear(): void
    {
        this.drawRectangle(0, 0, this.canvas.width, this.canvas.height, this.$configService.settings.bgColour);
    };

    drawAll(): void
    {
    };

    swapBuffers(): void
    {
        this.buffers[1 - this.bufferIndex].style.visibility = "hidden";
        this.buffers[this.bufferIndex].style.visibility = "visible";
        this.bufferIndex = 1 - this.bufferIndex;

        this.getCanvasContext();
    };

    private initialiseBuffers(): void
    {
        for (let i: number = 0; i < 2; i++)
        {
            this.buffers[i].style["z-index"] = i;
        }        

        this.buffers.forEach((buffer) => {this.document.body.appendChild(buffer);});
                
        this.getCanvasContext();
    };

    private getCanvasContext(): void
    {
        this.canvas = this.buffers[this.bufferIndex];
        this.context = this.canvas.getContext('2d');
    };

    private drawRectangle(x: number, y: number, width: number, height: number, colour: string): void
    {
        this.context.fillStyle = colour;
        this.context.fillRect(x, y, width, height);
    };
};