import Isettings from "config/Isettings.ts";
import consoleLogger from "services/concrete/loggers/consoleLogger";

export default class development_settings implements Isettings
{
    targetFPS: number = 60;
    logger: any = consoleLogger;
    bgColour: string = 'black';
};