fileLogger.prototype = new loggerService();
function fileLogger() 
{
    this.log = function(message) { console.log(`file log: ${message}`); };
};