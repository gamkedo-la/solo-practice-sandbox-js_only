import IconfigService from "src/services/IconfigService";
import * as enums from "model/enums";
import { development_settings } from "src/config/settings.development.ts";

export default class configService implements IconfigService
{
    configuration: enums.configurations = enums.configurations.DEVELOPMENT;
    targetFPS: number;    

    constructor() 
    {
        let settingsName: string = `this.${this.configuration}_settings`;
        let settings = eval(settingsName);

        this.targetFPS = settings.targetFPS;
    }
};    