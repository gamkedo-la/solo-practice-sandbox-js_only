export default class timeService
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