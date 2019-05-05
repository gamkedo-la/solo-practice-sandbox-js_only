import { JsInject } from "lib/jsInject";

import IconfigService from "services/IconfigService";
import ItimeService from "services/ItimeService";
import IinputService from "services/IinputService";
import IupdateService from "services/IupdateService";
import IrenderService from "services/IrenderService";

import configService from "services/concrete/configService";
import timeService from "services/concrete/timeService";
import inputService from "services/concrete/inputService";
import updateService from "services/concrete/updateService";
import renderService from "services/concrete/renderService";
import IloggerService from "./services/IloggerService";

export class game
{
    $jsInject: JsInject = new JsInject();

    $configService: IconfigService;
    $loggerService: IloggerService;
    $timeService: ItimeService;
    $inputService: IinputService;
    $updateService: IupdateService;
    $renderService: IrenderService;

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
        this.$configService = this.$jsInject.register("IconfigService", [configService]);
        this.$loggerService = this.$jsInject.register("IloggerService", [this.$configService.settings.logger]);
        this.$timeService = this.$jsInject.register("ItimeService", [timeService]);
        this.$inputService = this.$jsInject.register("IinputService", [inputService]);
        this.$updateService = this.$jsInject.register("IupdateService", [updateService]);
        this.$renderService = this.$jsInject.register("IrenderService", ["IconfigService", renderService]);
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