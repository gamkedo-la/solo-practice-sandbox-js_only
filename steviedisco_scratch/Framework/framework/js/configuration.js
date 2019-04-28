var _configuration;

function configuration() 
{
    this.configurations = {
        DEVELOPMENT: 'development',
        RELEASE: 'release'
    };
    
    this.configuration = this.configurations.DEVELOPMENT;
        
    this.settings = eval(`_${this.configuration}Settings`);        
};