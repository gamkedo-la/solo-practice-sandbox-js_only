import * as framework from "helpers/exports";

export class entity
{    
    id: string;
    rectangle: framework.rectangle;

    constructor(x: number = 0, y: number = 0, height: number = 1, width: number = 1, colour: string = 'pink')
    {                
        this.id = framework.helpers.generateId();

        this.rectangle = new framework.rectangle(colour);
        this.rectangle.set(x, y, height, width);
    };    
}