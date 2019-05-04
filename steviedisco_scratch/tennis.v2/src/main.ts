import { JsInject } from "lib/jsInject";

export class Program 
{
    fn(): void
    {
    }

    execute(): void
    {
        let $jsInject = new JsInject();                
         $jsInject.register("1", ["echoFn", this.fn]);

        console.log('Hello World!');
    }
}