//Components are just bits of data.  
const Components = {}
//------------------------------------------------------------
Components.Appearance = function ComponentAppearance(value="white")
{
    this.fill = value
    return this;
}
Components.Appearance.prototype.name = 'appearance';

//------------------------------------------------------------
Components.Position = function ComponentPosition(params = 
    {
        x: 0.5,
        y: 0.5
    })
{
    this.x = params.x;
    this.y = params.y;
    return this;
}
Components.Position.prototype.name = 'position';

//------------------------------------------------------------
Components.Health = function ComponentHealth(value=20)
{
    this.value = value;
    return this;
}
Components.Health.prototype.name = 'health';

//------------------------------------------------------------
Components.Radius = function ComponentRadius(value = 0.1)
{
    this.value = value;
    return this;
}
Components.Radius.prototype.name = 'radius';

//------------------------------------------------------------

export default Components;