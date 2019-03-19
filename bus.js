function Bus(route){
  this.route=route;
  this.place=1;
  this.x=route[0].x;
  this.y=route[0].y;
}
var SpeedC=0.001;
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
    if(Ob.place==Ob.route.length-1){
      Ob.place=0;
    }else{
      Ob.place++;
    }
  }
  ttx.fillRect(Ob.x-2,Ob.y-2,4,4);
}
