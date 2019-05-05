import * as framework from "helpers/imports.ts";

export interface IrenderService
{
    initialise(document: Document);
    render(): void;
    clear(): void;
    drawAll(): void;
    swapBuffers(): void;
};