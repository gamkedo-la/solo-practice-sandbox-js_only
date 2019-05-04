export class timeService
{
    timeFunction: Function;

    constructor(timeFunction: Function) 
    {
        this.timeFunction = timeFunction;
    };  

    getCurrentTime(): number
    {        
        return this.timeFunction();
    };
};