import * as framework from "helpers/exports";
import * as global from "helpers/globals";
import { IrenderService } from "helpers/exports";

export class net extends framework.entity implements framework.Irenderable
{
    private readonly NET_LENGTH: number = 30;
    private readonly NET_COLOUR: string = '#7b89a0';

    $renderService: IrenderService;

    canvas: HTMLCanvasElement;

    constructor()
    {
        super();

        this.$renderService = global.$jsInject.get("IrenderService") as IrenderService;
        this.canvas = this.$renderService.canvas;

        this.rectangle.set(this.canvas.width / 2 - 1, 0, 2, 20);
        this.rectangle.colour = this.NET_COLOUR;
    };

    render(renderService: framework.IrenderService): void
    {        
        for (let i = 0; i < this.canvas.height; i += this.NET_LENGTH) 
        {
            this.rectangle.y = i;
            this.rectangle.render(renderService);
        }
    };
};