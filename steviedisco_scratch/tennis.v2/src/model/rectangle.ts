import * as framework from "helpers/exports";
import * as global from "helpers/globals";

export class rectangle implements framework.Irenderable
{    
    $renderService: framework.IrenderService;

    x: number;
    y: number;
    height: number;
    width: number;
    colour: string;

    constructor(colour: string) {
        this.$renderService = global.$jsInject.get("IrenderService") as framework.IrenderService;
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

    render(): void
    {
        this.$renderService.drawRectangle(this.x, this.y, this.width, this.height, this.colour);
    };
};