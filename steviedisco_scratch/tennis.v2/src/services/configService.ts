import { enums } from "enums"; 
import development_settings from "config/settings.development.json";

export class configService
{
    configuration: enums.configurations;
    targetFPS: number;

    constructor(configuration: enums.configurations)
    {
        this.configuration = configuration;

        let settingsName: string = `${this.configuration}_settings`;
        let settings = eval(settingsName);

        this.targetFPS = settings.targetFPS;
    };
};