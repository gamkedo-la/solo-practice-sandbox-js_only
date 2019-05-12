import * as framework from "helpers/exports";

export interface IrenderService extends framework.Iinitialisable
{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    drawRectangle(x: number, y: number, width: number, height: number, colour: string): void;

    renderAll(): void;
    initialiseBuffers(): void;
};