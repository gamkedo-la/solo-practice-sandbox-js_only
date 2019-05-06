import * as framework from "helpers/exports";
import { Iinitialisable, Irenderable } from "helpers/exports";

export interface IrenderService extends Iinitialisable, Irenderable
{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    drawRectangle(x: number, y: number, width: number, height: number, colour: string): void;
};