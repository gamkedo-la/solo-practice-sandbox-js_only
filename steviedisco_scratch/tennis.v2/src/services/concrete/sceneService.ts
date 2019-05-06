import * as framework from "helpers/exports";

export class sceneService implements framework.IsceneService
{    
    protected entities: { [id: string] : framework.entity; } = {};

    private currentIndex: number;

    constructor()
    {
        this.resetEnumerator();
    };

    addEntity(entity: framework.entity)
    {
        this.entities[entity.id] = entity;        
    };

    removeEntity(entity: framework.entity)
    {
        delete this.entities[entity.id]
    };    

    getNextEntity(): framework.entity
    {
        let entity: framework.entity = null;

        if (Object.keys(this.entities).length > 0 && this.currentIndex >= 0)  
        {          
            let key = Object.keys(this.entities)[this.currentIndex--];
            entity = this.entities[key];            
        }

        if (entity == null)
        {
            this.resetEnumerator();
            return null;
        }

        return entity;
    };

    resetEnumerator(): void
    {
        this.currentIndex = Object.keys(this.entities).length - 1;
    };
};