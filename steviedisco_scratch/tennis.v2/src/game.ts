import { JsInject } from "lib/jsInject";
import configService from "services/configService";
import timeService from "services/timeService";
import inputService from "services/inputService";
import updateService from "services/updateService";
import renderService from "services/renderService";

export class game
{
    $jsInject: JsInject = new JsInject();

    $configService: configService;
    $timeService: timeService;
    $inputService: inputService;
    $updateService: updateService;
    $renderService: renderService;

    run(): void
    { 
        this.registerServices();
        this.initialise();
        this.gameLoop();
    };

    registerServices(): void
    {
        this.$configService = this.$jsInject.register("configService", [configService]);
        this.$timeService = this.$jsInject.register("timeService", [timeService]);
        this.$inputService = this.$jsInject.register("inputService", [inputService]);
        this.$updateService = this.$jsInject.register("updateService", [updateService]);
        this.$renderService = this.$jsInject.register("renderService", [renderService]);
    };

    initialise(): void
    {
        this.$renderService.initialise(document);
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