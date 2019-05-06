import * as framework from "helpers/exports";

export interface IsceneService
{  
    addEntity(entity: framework.entity);
    removeEntity(entity: framework.entity);
    getNextEntity(): framework.entity;
    resetEnumerator(): void;
};