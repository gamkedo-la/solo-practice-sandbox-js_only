//Components are just bits of data.  
export const Components = {

    ComponentAppearance: function(value){
        value = value || "white"
        this.value = value;
        return this;
    },

    ComponentPosition: function(value={x: 0.5, y:0.5}){
        this.value = value;
        return this;
    },

    



}