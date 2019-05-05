import * as enums from "model/enums";

export default interface IconfigService
{
    configuration: enums.configurations;
    targetFPS: number; 
};