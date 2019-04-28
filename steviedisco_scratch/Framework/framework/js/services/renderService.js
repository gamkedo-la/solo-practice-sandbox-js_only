function renderService() 
{
    this.bufferIndex = 0;    
    
    this.buffers = [
        document.createElement('renderBuffer0'),
        document.createElement('renderBuffer1')
    ];

    this.swapBuffers = function() 
    {
        this.buffers[1-this.bufferIndex].style.visibility = "hidden";
        this.buffers[this.bufferIndex].style.visibility = "visible";

        this.bufferIndex = 1 - this.bufferIndex;
    };
};