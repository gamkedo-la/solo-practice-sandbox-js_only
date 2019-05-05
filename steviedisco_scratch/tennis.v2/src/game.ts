import { JsInject } from "lib/jsInject";
import * as framework from "helpers/imports.ts";

export class game
{
    $jsInject: JsInject = new JsInject();

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
        this.$configService = this.$jsInject.register("IconfigService", [framework.configService]);
        this.$loggerService = this.$jsInject.register("IloggerService", [this.$configService.settings.logger]);
        this.$timeService = this.$jsInject.register("ItimeService", [framework.timeService]);
        this.$inputService = this.$jsInject.register("IinputService", [framework.inputService]);
        this.$updateService = this.$jsInject.register("IupdateService", [framework.updateService]);
        this.$renderService = this.$jsInject.register("IrenderService", ["IconfigService", framework.renderService]);
    };

    initialise(): void
    {
        this.$renderService.initialise(document);
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