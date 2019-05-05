import * as framework from "helpers/exports";

export interface ItimeService
{
    registerTimeFunction(timeFunction: Function): void;
    getCurrentTime(): number;
};