
//an Entity is just a unique ID...

const Entity = function Entity(){
    this.id = (+new Date()).toString(16) + 
    (Math.random() * 100000000 | 0).toString(16) + 
    Entity.prototype._count;
    Entity.prototype._count++;
    
//...with a container for components.
    this.components = {};
    return this;
}

Entity.prototype._count = 0;

Entity.prototype.addComponent = function addComponent( component ){
    this.components[component.name] = component;
    return this;
}

Entity.prototype.addComponents = function addComponents( arr ){
    arr.forEach(e=>{this.components[e.name] = e})
    return this;
}

Entity.prototype.removeComponent = function removeComponent( componentName ){
    //can accept a string or function
    let name = componentName; //assume string
    if(typeof componentName === 'function'){
        name = componentName.prototype.name; //get name from function
    }
    delete this.components[name];
    return this;
}

Entity.prototype.print = function print () {
    console.log(JSON.stringify(this, null, 4));
    return this;
};


export default Entity;
