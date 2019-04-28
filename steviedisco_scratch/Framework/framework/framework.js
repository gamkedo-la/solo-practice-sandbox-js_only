var scriptPaths = [
    "serviceRegister.js",
    "services/testService.js",
    "services/renderService.js"
];

var rootPath = './framework/js/';
for (let scriptPath of scriptPaths)
{
    let script = document.createElement('script');
    script.src = rootPath + scriptPath;
    document.head.appendChild(script);
}

var _serviceRegister;

window.onload = function() {
    _serviceRegister = new serviceRegister();
    _serviceRegister.getService(renderService);
}