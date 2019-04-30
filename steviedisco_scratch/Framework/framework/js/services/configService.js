function configService(gameService) 
{
    self = this;
    this.configuration = _enums.configurations.DEVELOPMENT;

    this.settings = {}; 
    this.gameService = {};

    let script = _addScript(`config/settings.${this.configuration}.js`)
    _setScriptLoadedFunction(script, 
        function(service) { 
            self.settings = eval(`_${self.configuration}Settings`);            
            self.gameService = _serviceRegister.postConfigure(gameService);
            self.gameService.run();
        });
};