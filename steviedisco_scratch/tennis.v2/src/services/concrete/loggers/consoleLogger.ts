import * as framework from "helpers/imports.ts";

export class consoleLogger implements framework.IloggerService
{
    log(message: string): void
    {
        console.log(message);
    };
};