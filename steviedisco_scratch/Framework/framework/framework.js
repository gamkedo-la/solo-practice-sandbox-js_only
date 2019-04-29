var _loadScripts = function(scriptRoot) 
{
    var paths = [
        'serviceRegister.js',
        'services/loggerService.js',
        'services/loggers/consoleLogger.js',
        'services/loggers/fileLogger.js',
        'services/timeService.js',
        'services/inputService.js',
        'services/updateService.js',
        'services/renderService.js',
        'services/gameService.js'
    ];    
    
    for (let path of paths)
    {
        let script = _addScript(scriptRoot + path);

        if (path == paths[paths.length - 1])
            _setScriptLoadedFunction(script, _runGame);    
    }
}

var _addScript = function(src)
{
    let script = document.createElement('script');
    script.src = src;
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

var _runGame = function() {
    _serviceRegister = new serviceRegister();
    _serviceRegister.getService(gameService).run();
};

window.onload = function()  
{
    let scriptRoot = './framework/js/';

    let configScript = _addScript(`${scriptRoot}configuration.js`);
    _setScriptLoadedFunction(configScript, function() 
    { 
        _configuration = new configuration();

        var settingsScript = _addScript(`${scriptRoot}config/settings.${_configuration.configuration}.js`);
        _setScriptLoadedFunction(settingsScript, function() 
        { 
            _configuration.settings = eval(`_${_configuration.configuration}Settings`); 
            _loadScripts(scriptRoot);
        });    
    });  
};