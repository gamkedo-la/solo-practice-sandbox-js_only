import { JsInject } from "lib/jsInject";

import IconfigService from "services/IconfigService";
import ItimeService from "services/ItimeService";
import IinputService from "services/IinputService";
import IupdateService from "services/IupdateService";
import IrenderService from "services/IrenderService";

import configService from "services/concrete/configService";
import consoleLogger from "services/concrete/loggers/consoleLogger";
import fileLogger from "services/concrete/loggers/fileLogger";
import timeService from "services/concrete/timeService";
import inputService from "services/concrete/inputService";
import updateService from "services/concrete/updateService";
import renderService from "services/concrete/renderService";

export class game
{
    $jsInject: JsInject = new JsInject();

    $consoleLogger: consoleLogger;
    $fileLogger: fileLogger;

    $configService: IconfigService;
    $loggerService: any;
    $timeService: ItimeService;
    $inputService: IinputService;
    $updateService: IupdateService;
    $renderService: IrenderService;

    run(): void
    { 
        this.registerServices();
        this.initialise();
        this.gameLoop();
    };

    registerServices(): void
    {
        this.$configService = this.$jsInject.register("IconfigService", [configService]);

        // todo - minging code, need to get eval() working!!
        if (this.$configService.settings.logger == "consoleLogger")
            this.$loggerService = this.$jsInject.register("IloggerService", [consoleLogger]);
        else if (this.$configService.settings.logger == "fileLogger")
            this.$loggerService = this.$jsInject.register("IloggerService", [fileLogger]);

        this.$timeService = this.$jsInject.register("ItimeService", [timeService]);
        this.$inputService = this.$jsInject.register("IinputService", [inputService]);
        this.$updateService = this.$jsInject.register("IupdateService", [updateService]);
        this.$renderService = this.$jsInject.register("IrenderService", [renderService]);
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

        while (true)
        {
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
        }
    };
}