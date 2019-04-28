var _serviceRegister;

function serviceRegister(loggerService) 
{
    this.register = {};    
    
    this.registerService = function(service) 
    {
        this.register[service.constructor.name] = service;
        loggerService.log(`${service.constructor.name} registered`);
    };

    this.getService = function(service) 
    {
        let serviceInstance = this.register[service.name];

        if (serviceInstance == undefined)
        {
            let arguments = this.getArguments(service);
            let dependencies = this.getDependencies(arguments);  

            serviceInstance = new service(dependencies);

            this.registerService(serviceInstance);
        }        

        return serviceInstance;
    };

    this.getDependencies = function(arguments)
    {
        let dependencies = new Array();
         
        for (let argument of arguments)
        {
            let constructor = eval(argument);
            let dependency = this.getService(constructor);

            if (dependency)
                dependencies.push(dependency);            
        }        

        return dependencies;
    };    

    this.getArguments = function(fn) 
    {
        loggerService.log('getArguments() called');

        const FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        const FN_ARG_SPLIT = /,/;
        const FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

        let fnText, argDecl;
        let args=[];
        
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        argDecl = fnText.match(FN_ARGS); 

        if (argDecl == null)
            return args;

        let r = argDecl[1].split(FN_ARG_SPLIT);

        for (let a in r)
        {
            let arg = r[a];
            arg.replace(FN_ARG, function(all, underscore, name){
                args.push(name);
            });
        }
        
        return args;
    }
};