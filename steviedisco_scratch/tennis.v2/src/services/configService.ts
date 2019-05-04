import * as enums from "model/enums";
import development_settings from "config/settings.development.json";

interface IconfigService 
{
    configuration: enums.configurations;
    development_settings: any;
    targetFPS: number;    
};

export default class configService implements IconfigService
{
    configuration: enums.configurations = enums.configurations.DEVELOPMENT;
    development_settings: any = development_settings;
    targetFPS: number;    

    constructor() 
    {
        let settingsName: string = `this.${this.configuration}_settings`;
        let settings = eval(settingsName);

        this.targetFPS = settings.targetFPS;
    }
};    