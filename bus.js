var SpeedC=0.001;
function Bus(route){
  this.route=route;
  this.place=1;
  this.x=route[0].x;
  this.y=route[0].y;
  this.passengerCool=10;
  this.waited=0;
}
function BusUpdate(Ob){
  var destindex=Ob.place;
  var dest=Ob.route[destindex];
  var dx=dest.x-Ob.x;
  var dy=dest.y-Ob.y;
  var distance=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
  if(distance>SpeedC){
    dx=dx/distance*SpeedC;
    dy=dy/distance*SpeedC;
    Ob.x+=dx;
    Ob.y+=dy;
  }else{
    Ob.x=dest.x;
    Ob.y=dest.y;
    if(Ob.waited==Ob.passengerCool){
      Ob.waited=0;
      if(Ob.place==Ob.route.length-1){
        Ob.place=0;
      }else{
        Ob.place++;
      }
    }else{
      Ob.waited++;
    }
  }
  ttx.strokeStyle = "black";
  ttx.lineWidth = actw*0.00015;
  ttx.translate(Ob.x-actw*0.001,Ob.y-actw*0.001);
  ttx.rotate(Math.atan(dy/dx));
  drawBus(0, 0, actw*0.0015, "#f4ee42");
  ttx.rotate(-Math.atan(dy/dx));
  ttx.translate(-(Ob.x-actw*0.001),-(Ob.y-actw*0.001));
}

function drawBus(x, y, scale, color){
    ttx.lineWidth = scale/10;
    ttx.fillStyle = color;
    ttx.strokeRect(x, y - scale/6, scale/2, scale/3);
    ttx.strokeRect(x - scale/2, y - scale/5, scale/1.1, scale*2/5);
    ttx.fillRect(x - scale/2, y - scale/5, scale/1.1, scale*2/5);
    ttx.fillRect(x, y - scale/6, scale/2, scale/3);
    ttx.beginPath();
    for(i = -3; i < 3; i++){
        ttx.moveTo(x + scale*i/7 + scale/20, y - scale/8);
        ttx.lineTo(x + scale*i/7 + scale/20, y + scale/8);
    }
    ttx.lineWidth = scale/80;
    ttx.stroke();
}
