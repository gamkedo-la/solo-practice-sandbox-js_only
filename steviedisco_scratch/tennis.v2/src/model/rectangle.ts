import * as framework from "helpers/exports";
import { IrenderService } from "helpers/exports";

export class rectangle implements framework.Irenderable
{    
    x: number;
    y: number;
    height: number;
    width: number;
    colour: string;

    constructor(colour: string) {
        this.colour = colour;
    };

    setPosition(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    };

    setSize(width: number, height: number): void
    {
        this.width = width;
        this.height = height;        
    };

    set(x: number, y: number, width: number, height: number): void
    {
        this.setPosition(x, y);
        this.setSize(width, height);
    };

    render(renderService: IrenderService): void
    {
        renderService.drawRectangle(this.x, this.y, this.width, this.height, this.colour);
    };
};