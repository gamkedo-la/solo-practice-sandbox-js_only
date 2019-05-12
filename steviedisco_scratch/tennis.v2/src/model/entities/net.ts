import * as framework from "helpers/exports";
import * as global from "helpers/globals";

export class net extends framework.entity implements framework.Irenderable
{
    private readonly NET_LENGTH: number = 35;
    private readonly NET_COLOUR: string = '#7b89a0';

    $renderService: framework.IrenderService;

    canvas: HTMLCanvasElement;

    constructor()
    {
        super();

        this.$renderService = global.$jsInject.get("IrenderService") as framework.IrenderService;

        this.canvas = this.$renderService.canvas;        
    };

    render(): void
    {        
        this.rectangle.set(this.canvas.width / 2 - 1, 0, 2, 25);
        this.rectangle.colour = this.NET_COLOUR;

        for (let i = 0; i < this.canvas.height; i += this.NET_LENGTH) 
        {
            this.rectangle.y = i;
            this.rectangle.render();
        }
    };
};