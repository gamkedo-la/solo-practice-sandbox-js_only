var _scripts = { 
    root: './framework/js/', 
    paths: [
        "configuration.js",
        "config/settings.development.js",
        "config/settings.release.js",
        "serviceRegister.js",
        "services/loggerService.js",
        "services/loggers/consoleLogger.js",
        "services/loggers/fileLogger.js",
        "services/testService.js",
        "services/renderService.js"
    ]
};

for (let path of _scripts.paths)
{
    let script = document.createElement('script');
    script.src = _scripts.root + path;
    document.head.appendChild(script);
}

window.onload = function() {
    _configuration = new configuration();

    _serviceRegister = new serviceRegister();
    _serviceRegister.getService(loggerService);
}