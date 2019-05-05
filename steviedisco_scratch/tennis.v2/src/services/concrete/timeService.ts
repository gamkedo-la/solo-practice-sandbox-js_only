import ItimeService from "src/services/ItimeService";

export default class timeService implements ItimeService
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