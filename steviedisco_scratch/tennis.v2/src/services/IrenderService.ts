export default interface IrenderService
{
    initialise(document: Document);
    render(): void;
    clear(): void;
    drawAll(): void;
    swapBuffers(): void;
};