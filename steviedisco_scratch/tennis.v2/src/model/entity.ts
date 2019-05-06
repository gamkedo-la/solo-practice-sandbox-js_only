import * as framework from "helpers/exports";
import { point, rectangle } from "helpers/exports";

export class entity
{    
    dimensions: rectangle;

    constructor(x: number = 0, y: number = 0, height: number = 1, width: number = 1)
    {        
        this.dimensions.set(x, y, height, width);
    };
};