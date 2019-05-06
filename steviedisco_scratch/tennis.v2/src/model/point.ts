import * as framework from "helpers/exports";

export class point
{    
    protected x: number;
    protected y: number;

    set(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    };
};