import * as framework from "helpers/exports";

export class configService implements framework.IconfigService
{
    private development_settings: framework.Isettings = new framework.development_settings();
    private release_settings: framework.Isettings = new framework.release_settings();

    configuration: framework.enums.configurations = framework.enums.configurations.DEVELOPMENT;    
    settings: framework.Isettings;

    constructor() 
    {
        let settingsName: string = `this.${this.configuration}_settings`;
        this.settings = eval(settingsName);
    }
};    