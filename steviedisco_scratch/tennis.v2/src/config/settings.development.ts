import * as framework from "helpers/exports";

export class development_settings implements framework.Isettings
{
    targetFPS: number = 60;
    logger: any = framework.consoleLogger;
    bgColour: string = 'black';
};