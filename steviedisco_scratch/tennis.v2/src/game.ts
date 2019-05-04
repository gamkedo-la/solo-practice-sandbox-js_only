import { JsInject } from "lib/jsInject";
import { enums } from "./enums";
import { configService } from "services/configService";
import { timeService } from "services/timeService";
import { inputService } from "services/inputService";
import { updateService } from "services/updateService";
import { renderService } from "services/renderService";

export class game
{
    $jsInject: JsInject;

    $configService: configService;
    $timeService: timeService;
    $inputService: inputService;
    $updateService: updateService;
    $renderService: renderService;

    run(): void
    { 
        this.$jsInject = new JsInject();
        this.registerServices();
        this.getServices();
        this.gameLoop();
    };

    registerServices(): void
    {
        this.$jsInject.register("configService", [enums.configurations.DEVELOPMENT, configService]);
        this.$jsInject.register("timeService", [Date.now, timeService]);
        this.$jsInject.register("inputService", [inputService]);
        this.$jsInject.register("updateService", [updateService]);
        this.$jsInject.register("renderService", [document, renderService]);
    };

    getServices(): void
    {
        this.$configService = this.$jsInject.get("configService");
        this.$timeService = this.$jsInject.get("timeService");
        this.$inputService = this.$jsInject.get("inputService");
        this.$updateService = this.$jsInject.get("updateService");        
        this.$renderService = this.$jsInject.get("renderService");
    };

    gameLoop(): void
    {
        let previous: number = this.$timeService.getCurrentTime();  
        let lag: number = 0.0; 
        let msPerUpdate = 1000 / this.$configService.targetFPS;

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