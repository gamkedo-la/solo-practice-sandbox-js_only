export class helpers
{
    static generateId(length: number = 10): string
    {
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = "";
        
        for (let i = 0; i < length; i++) {
            text += possible.charAt(this.randomNumber(possible.length));
        }
        
        return text;
    };

    static randomNumber(length: number): number
    {
        return Math.floor(Math.random() * length)
    };
};