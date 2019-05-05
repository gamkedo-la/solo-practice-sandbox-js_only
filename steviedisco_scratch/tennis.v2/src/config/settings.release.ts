import Isettings from "config/Isettings.ts";
import fileLogger from "services/concrete/loggers/fileLogger";

export default class release_settings implements Isettings
{
    targetFPS: number = 60;
    logger: any = fileLogger;
    bgColour: string = 'red';
};