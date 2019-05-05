import IloggerService from "src/services/IloggerService";

export default class consoleLogger implements IloggerService
{
    log(message: string): void
    {
        console.log(message);
    };
};