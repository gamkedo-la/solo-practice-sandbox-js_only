import * as framework from "helpers/exports";
import * as global from "helpers/globals";
import { IrenderService } from "helpers/exports";

export class game
{
    $configService: framework.IconfigService;
    $loggerService: framework.IloggerService;
    $timeService: framework.ItimeService;
    $inputService: framework.IinputService;
    $sceneService: framework.IsceneService;
    $updateService: framework.IupdateService;
    $renderService: framework.IrenderService;

    window: Window;
    document: Document;

    constructor(window: Window, document: Document)
    {
        this.window = window;
        this.document = document;
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
        this.$sceneService = global.$jsInject.register("IsceneService", [framework.sceneService]);
        this.$updateService = global.$jsInject.register("IupdateService", [framework.updateService]);
        this.$renderService = global.$jsInject.register("IrenderService", ["IconfigService", "IsceneService", framework.renderService]);
    };

    initialise(): void
    {
        this.$renderService.initialise([window, document]);

        this.$sceneService.addEntity(new framework.net());
        this.$sceneService.resetEnumerator();

        this.window.addEventListener("resize", () => this.onResize(this.window, this.$renderService));
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

        this.$renderService.renderAll();

        this.window.requestAnimationFrame(() => this.gameLoop());
    };

    onResize(window: Window, renderService: IrenderService): void
    {
        window.requestAnimationFrame(() => renderService.initialiseBuffers());
    };
}