import IrenderService from "src/services/IrenderService";

export default class renderService implements IrenderService
{
    bufferIndex: number = 0;
    document: Document;
    buffers: HTMLElement[]; 

    initialise(document: Document)
    {    
        this.document = document;

        this.buffers = [
            this.document.createElement('renderBuffer0'),
            this.document.createElement('renderBuffer1')
        ];    
    };

    render(): void
    {
        this.clear();
        this.drawAll();
        this.swapBuffers();
    };

    clear(): void
    {
    };

    drawAll(): void
    {
    };

    swapBuffers(): void
    {
        this.buffers[1 - this.bufferIndex].style.visibility = "hidden";
        this.buffers[this.bufferIndex].style.visibility = "visible";

        this.bufferIndex = 1 - this.bufferIndex;
    };
};