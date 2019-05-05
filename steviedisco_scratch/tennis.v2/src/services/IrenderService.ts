import * as framework from "helpers/exports";

export interface IrenderService
{
    initialise(document: Document);
    render(): void;
    clear(): void;
    drawAll(): void;
    swapBuffers(): void;
};