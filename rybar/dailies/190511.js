function init() {
    c = document.getElementById('canvas');
    ctx = c.getContext('2d');
    t = 0;
    elapsed = 0;
    S = Math.sin;
    C = Math.cos;
    T = Math.tan;
    c.height = 512;
    c.width = 512;
    dotCount = 900;
    dots = [];
    for(i = 0; i < dotCount; i++){
        dots[i] = {
          o: 0,
          size: 0,
          ym:  0,
          x:  0,
          y:   0,
          tr:  0,
          tg:  0,
          tb:  0,
        }
    }
    last = 0;

    panel.addRange("min box size", 0, 50, 5, 1);
    panel.addRange("max box size", 5, 150, 15, 1);
    panel.addRange("red mod", 0, 20, 5, .001);
    panel.addRange("green mod", 0, 20, 6, .001);
    panel.addRange("blue mod", 0, 20, 7, .001);
    panel.addRange("speed", 0, .03, .007, .000001); 

    loop();
}

function loop(dt){
    let speed = panel.getValue("speed");
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    elapsed += dt;
    t = elapsed * speed;

    step(dt);
    draw(dt);

  requestAnimationFrame(loop);
}

function step(dt){
        let boxMin = panel.getValue("min box size");
        let boxMax = panel.getValue("max box size");
        let redMod = panel.getValue("red mod");
        let greenMod = panel.getValue("green mod");
        let blueMod = panel.getValue("blue mod");


      dots.forEach((dot, i, arr)=>{
        dot.o = 0.0125541 * (360/dotCount) * i * 7;
        dot.size = boxMin + boxMax * C( (t-dot.o)/2.1 ),
        dot.ym = 100 + S(t)*100;
        dot.x = 250 + S(t-dot.o)*200*C(i/10.3);
        dot.y =  400*C(i/dot.ym) + C(t-dot.o)*100;
        dot.tr = S(t+i/redMod)*255;
        dot.tg = C(t+i/greenMod)*255;
        dot.tb = 10+S(t+i/blueMod)*240;
      })
}

function draw(dt){
    ctx.fillStyle = '#101';
    ctx.fillRect(0,0,c.height,c.width);

    dots.forEach(d=>{
        ctx.fillStyle = "rgb("+d.tr+","+d.tg+","+d.tb+")";
        ctx.fillRect(d.x-d.size/2, d.y-d.size/2, d.size,d.size )
    })

}

init();
