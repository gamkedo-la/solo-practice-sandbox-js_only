import * as framework from "helpers/exports";

export class rectangle
{    
    protected x: number;
    protected y: number;
    protected height: number;
    protected width: number;

    setPosition(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    };

    setSize(height: number, width: number): void
    {
        this.height = height;
        this.width = width;
    };

    set(x: number, y: number, height: number, width: number): void
    {
        this.setPosition(x, y);
        this.setSize(height, width);
    };
};