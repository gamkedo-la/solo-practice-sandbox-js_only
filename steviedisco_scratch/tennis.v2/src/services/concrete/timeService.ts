import * as framework from "helpers/imports.ts";

export class timeService implements framework.ItimeService
{
    timeFunction: Function;

    constructor() 
    {
        this.timeFunction = Date.now;
    };  
    
    registerTimeFunction(timeFunction: Function): void
    {
        this.timeFunction = timeFunction;
    };

    getCurrentTime(): number
    {        
        return this.timeFunction();
    };
};