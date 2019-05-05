import * as enums from "model/enums";
import Isettings from "src/config/Isettings";

export default interface IconfigService
{
    configuration: enums.configurations;
    settings: Isettings;
};