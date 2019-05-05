import IloggerService from "src/services/IloggerService";

export default class fileLogger implements IloggerService
{
    log(message: string): void
    {
        console.log(`file logger: ${message}`);
    };
};