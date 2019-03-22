var SpeedC=0.00002;
function Bus(route){
  this.route=[];
  this.times=[];
  for(var i=0;i<route.length;i++){
    this.route.push(findById(route[i][0]));
    this.times.push([Number(route[i][1].substring(0,2)),Number(route[i][1].substring(3,5))]);
  }
  this.place=0;
  this.x=route[0].x;
  this.y=route[0].y;
  this.passengerCool=5;
  this.waited=0;
  this.going=false;
  this.delta=[];
  this.count=0;
  this.frame=0;
}
function BusUpdate(Ob){if(Ob.going){
  var destindex=Ob.place;
  var dest=Ob.route[destindex];
  var dx=dest.x-Ob.x;
  var dy=dest.y-Ob.y;
  var distance=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
  ttx.strokeStyle = "black";
  ttx.lineWidth = actw*0.00015;
  ttx.translate(Ob.x,Ob.y);
  ttx.rotate(Math.atan2(dy,dx));
  drawBus(0, 0, actw*0.0015, "#f4ee42");
  ttx.rotate(-Math.atan2(dy,dx));
  ttx.translate(-(Ob.x),-(Ob.y));
}}
function coorInit(Ob){
  Ob.x=Ob.route[0].x;
  Ob.y=Ob.route[0].y;
}
function drawBus(x, y, scale, color){
    try{
      throw "k";
    }catch(e){}
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
