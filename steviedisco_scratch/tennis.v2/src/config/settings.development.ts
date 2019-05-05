import Isettings from "config/Isettings.ts";

export default class development_settings implements Isettings
{
    targetFPS: number = 60;
    logger: string = "consoleLogger";
};