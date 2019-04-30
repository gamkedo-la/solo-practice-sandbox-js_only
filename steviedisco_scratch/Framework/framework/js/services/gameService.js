function gameService(configService, timeService, inputService, updateService, renderService) 
{
    this.configService = configService;
    this.timeService = timeService;
    this.inputService = inputService;
    this.updateService = updateService;
    this.renderService = renderService;

    this.targetFPS = this.configService.settings.targetFPS;
    this.msPerUpdate = 1000 / this.targetFPS;    

    this.run = function() 
    {
        let previous = this.timeService.getCurrentTime();  
        let lag = 0.0;    

        while (true)
        {
            let current = this.timeService.getCurrentTime();
            let elapsed = current - previous;

            previous = current;
            lag += elapsed;

            this.inputService.process();

            while (lag >= this.msPerUpdate)
            {
                this.updateService.update();
                lag -= this.msPerUpdate;
            }

            this.renderService.render();
        }
    };
};