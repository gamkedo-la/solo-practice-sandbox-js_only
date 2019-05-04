import { JsInject } from "lib/jsInject";
import { renderService } from "./services/renderService";

export class game
{
    $jsInject: JsInject;

    run(): void
    { 
        this.$jsInject = new JsInject();
    };

    registerServices(): void
    {
        this.$jsInject.register("renderService", [document, renderService]);
    };
}