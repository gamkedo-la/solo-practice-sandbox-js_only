function renderService() 
{
    this.bufferIndex = 0;    
    
    this.buffers = [
        document.createElement('renderBuffer0'),
        document.createElement('renderBuffer1')
    ];    

    this.render = function()
    {
        this.clear();
        this.drawAll();
        this.swapBuffers();
    };

    this.clear = function()
    {
    };

    this.drawAll = function()
    {
    };

    this.swapBuffers = function() 
    {
        this.buffers[1 - this.bufferIndex].style.visibility = "hidden";
        this.buffers[this.bufferIndex].style.visibility = "visible";

        this.bufferIndex = 1 - this.bufferIndex;
    };
};