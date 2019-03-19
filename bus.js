function Bus(route){
  this.route=route;
  this.place=1;
  this.x=route[0].x;
  this.y=route[0].y;
  this.passengerCool=10;
  this.waited=0;
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
  ttx.fillRect(Ob.x-actw*0.001,Ob.y-actw*0.001,actw*0.002,actw*0.002);
}
