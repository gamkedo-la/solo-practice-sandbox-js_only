import * as framework from "helpers/exports";

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