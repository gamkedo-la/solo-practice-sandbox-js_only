import * as framework from "helpers/exports";

export class consoleLogger implements framework.IloggerService
{
    log(message: string): void
    {
        console.log(message);
    };
};