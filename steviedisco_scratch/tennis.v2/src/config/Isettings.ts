import IloggerService from "src/services/IloggerService";

export default interface Isettings
{
    targetFPS: number,
    logger: IloggerService,
    bgColour: string
};