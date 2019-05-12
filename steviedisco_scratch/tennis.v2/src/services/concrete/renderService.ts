import * as framework from "helpers/exports";
import { Irenderable } from "helpers/exports";

export class renderService implements framework.IrenderService, framework.Iinitialisable
{
    $configService: framework.IconfigService;
    $sceneService: framework.IsceneService;

    window: Window;
    document: Document;
    bufferIndex: number = 0;    
    buffers: HTMLCanvasElement[]; 

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(
        IconfigService: framework.IconfigService,
        IsceneService: framework.IsceneService
    )
    {
        this.$configService = IconfigService;
        this.$sceneService = IsceneService;
    };

    initialise(params: any[]) // Document
    {    
        this.window = params[0] as Window;
        this.document = params[1] as Document;

        this.buffers = [
            this.document.createElement('canvas'),
            this.document.createElement('canvas')
        ];    

        this.buffers.forEach((buffer) => {                       
            this.document.body.appendChild(buffer);
        });

        this.initialiseBuffers();
    };

    renderAll(): void
    {
        this.clear();
        this.renderEntities();
        this.swapBuffers();
    };

    drawRectangle(x: number, y: number, width: number, height: number, colour: string): void
    {
        this.context.fillStyle = colour;
        this.context.fillRect(x, y, width, height);
    };

    private clear(): void
    {
        this.drawRectangle(0, 0, this.canvas.width, this.canvas.height, this.$configService.settings.bgColour);
    };

    private renderEntities(): void
    {
        let entity: framework.entity = null;
        while((entity = this.$sceneService.getNextEntity()))
        {
            if (this.isRenderable(entity))       
                (entity as Irenderable).render();     
        }
    };

    private swapBuffers(): void
    {
        this.buffers[1 - this.bufferIndex].style.visibility = "hidden";
        this.buffers[this.bufferIndex].style.visibility = "visible";
        this.bufferIndex = 1 - this.bufferIndex;

        this.getCanvasContext();
    };

    initialiseBuffers(): void
    {
        let zindex: number = 0;

        this.buffers.forEach((buffer) => 
        {            
            buffer.style["z-index"] = zindex++;
            buffer.height = this.window.innerHeight - 1;
            buffer.width = this.window.innerWidth - 1;            
        });      
        
        this.getCanvasContext();
    };

    private getCanvasContext(): void
    {
        this.canvas = this.buffers[this.bufferIndex];
        this.context = this.canvas.getContext('2d');
    };    

    private isRenderable(arg: any): arg is Irenderable 
    {
        return arg.render !== undefined;
    };
};