var paths = [
    { 
        root: './framework/config/', 
        scripts: [
            "settings.development.js",
            "settings.release.js"
        ]
    }, { 
        root: './framework/js/', 
        scripts: [
            "configuration.js",
            "serviceRegister.js",
            "services/loggerService.js",
            "services/loggers/consoleLogger.js",
            "services/loggers/fileLogger.js",
            "services/testService.js",
            "services/renderService.js"
        ]
    }
];

for (let path of paths)
{
    let rootPath = path.root;
    for (let scriptPath of path.scripts)
    {
        let script = document.createElement('script');
        script.src = rootPath + scriptPath;
        document.head.appendChild(script);
    }
}


window.onload = function() {
    _configuration = new configuration();

    let logger = eval(_configuration.settings.logger);
    _loggerService = new logger();

    _serviceRegister = new serviceRegister(_loggerService);
    _serviceRegister.getService(exampleServiceTwo);
}