var _loadScripts = function(scriptRoot) 
{
    var paths = [           
        'enums.js',     
        'serviceRegister.js',  
        'services/configService.js',
        'services/loggerService.js',
        'services/loggers/consoleLogger.js',
        'services/loggers/fileLogger.js',
        'services/timeService.js',
        'services/inputService.js',
        'services/updateService.js',
        'services/renderService.js',
        'services/gameService.js'
    ];    
    
    let count = paths.length;
    for (let path of paths)
    {
        let script = _addScript(path);

        _setScriptLoadedFunction(script, function() {                        
            count--;
            if (count == 0) 
                _runGame();    
        });        
    }
};

var _addScript = function(src)
{
    let root = './framework/js/';
    let script = document.createElement('script');
    script.src = `${root}${src}`;
    document.head.appendChild(script);

    return script;
};

var _setScriptLoadedFunction = function(script, func) 
{
    script.onreadystatechange= function () {
        if (this.readyState == 'complete') 
            func();
    }    
    script.onload = func;   
};

window.onload = function()  
{    
    _loadScripts(); 
};

var _runGame = function() 
{
    _serviceRegister.configure(gameService);    
};