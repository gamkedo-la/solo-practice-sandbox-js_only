import * as framework from "helpers/imports.ts";

export class release_settings implements framework.Isettings
{
    targetFPS: number = 60;
    logger: any = framework.fileLogger;
    bgColour: string = 'red';
};