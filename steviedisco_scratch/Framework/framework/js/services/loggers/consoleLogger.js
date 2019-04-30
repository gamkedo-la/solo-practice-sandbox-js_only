consoleLogger = function(loggerService) 
{
    this.prototype = loggerService;
    this.log = function(message) { console.log(message); };
};