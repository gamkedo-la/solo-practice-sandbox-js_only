function serviceRegister() 
{
    this.register = {};    
    
    this.registerService = function(service) 
    {
        this.register[service.constructor.name] = service;
    };

    this.getService = function(service) 
    {
        let dependencies = this.getDependencies(service);       

        let serviceInstance = this.register[service.name];
        if (serviceInstance == undefined)
        {
            serviceInstance = new service(dependencies);                    
            this.registerService(serviceInstance);
        }        

        return serviceInstance;
    };

    this.getDependencies = function(service)
    {
        let dependencies = new Array();
        let arguments = this.getArguments(service); 

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