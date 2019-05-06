import * as framework from "helpers/exports";
import * as global from "helpers/globals";

export class game
{
    $configService: framework.IconfigService;
    $loggerService: framework.IloggerService;
    $timeService: framework.ItimeService;
    $inputService: framework.IinputService;
    $updateService: framework.IupdateService;
    $renderService: framework.IrenderService;

    window: Window;

    constructor(window: Window)
    {
        this.window = window;
    };

    run(): void
    { 
        this.registerServices();
        this.initialise();
        
        this.window.requestAnimationFrame(() => this.gameLoop());
    };

    registerServices(): void
    {
        this.$configService = global.$jsInject.register("IconfigService", [framework.configService]);
        this.$loggerService = global.$jsInject.register("IloggerService", [this.$configService.settings.logger]);
        this.$timeService = global.$jsInject.register("ItimeService", [framework.timeService]);
        this.$inputService = global.$jsInject.register("IinputService", [framework.inputService]);
        this.$updateService = global.$jsInject.register("IupdateService", [framework.updateService]);
        this.$renderService = global.$jsInject.register("IrenderService", ["IconfigService", framework.renderService]);
    };

    initialise(): void
    {
        this.$renderService.initialise([document]);
    };

    gameLoop(): void
    {
        let previous: number = this.$timeService.getCurrentTime();  
        let lag: number = 0.0; 
        let msPerUpdate = 1000 / this.$configService.settings.targetFPS;

        let current = this.$timeService.getCurrentTime();
        let elapsed = current - previous;

        previous = current;
        lag += elapsed;

        this.$inputService.process();

        while (lag >= msPerUpdate)
        {
            this.$updateService.update();
            lag -= msPerUpdate;
        }

        this.$renderService.render();

        window.requestAnimationFrame(() => this.gameLoop());
    };
}