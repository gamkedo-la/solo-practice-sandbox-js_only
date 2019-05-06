import * as framework from "helpers/exports";

export interface Irenderable
{
    render(renderService: framework.IrenderService): void;
};