import IconfigService from "src/services/IconfigService";
import * as enums from "model/enums";
import Isettings from "config/Isettings.ts";
import development_settings from "config/settings.development.ts";
import release_settings from "config/settings.release.ts";

export default class configService implements IconfigService
{
    private development_settings: Isettings = new development_settings();
    private release_settings: Isettings = new release_settings();

    configuration: enums.configurations = enums.configurations.DEVELOPMENT;    
    settings: Isettings;

    constructor() 
    {
        let settingsName: string = `this.${this.configuration}_settings`;
        this.settings = eval(settingsName);
    }
};    