import * as framework from "helpers/imports.ts";

export interface ItimeService
{
    registerTimeFunction(timeFunction: Function): void;
    getCurrentTime(): number;
};