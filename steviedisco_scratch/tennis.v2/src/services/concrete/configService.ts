import IconfigService from "src/services/IconfigService";
import * as enums from "model/enums";
import Isettings from "config/Isettings.ts";
import development_settings from "config/settings.development.ts";

export default class configService implements IconfigService
{
    configuration: enums.configurations = enums.configurations.DEVELOPMENT;
    development_settings: Isettings = development_settings;

    settings: Isettings;

    constructor() 
    {
        let settingsName: string = `this.${this.configuration}_settings`;
        this.settings = eval(settingsName);
    }
};    