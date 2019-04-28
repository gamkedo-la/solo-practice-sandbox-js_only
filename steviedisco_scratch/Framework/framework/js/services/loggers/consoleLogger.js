consoleLogger.prototype = new loggerService();
function consoleLogger() 
{
    this.log = function(message) { console.log(message); };
};