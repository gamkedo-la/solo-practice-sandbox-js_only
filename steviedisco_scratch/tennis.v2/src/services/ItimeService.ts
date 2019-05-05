export default interface ItimeService
{
    registerTimeFunction(timeFunction: Function): void;
    getCurrentTime(): number;
};