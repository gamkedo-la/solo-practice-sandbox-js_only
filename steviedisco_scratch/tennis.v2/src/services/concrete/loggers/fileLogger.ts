import * as framework from "helpers/imports.ts";

export class fileLogger implements framework.IloggerService
{
    log(message: string): void
    {
        console.log(`file logger: ${message}`);
    };
};