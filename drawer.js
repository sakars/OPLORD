function resize(e){//resize, move canvas - zoom, draw
  if(Math.sign(e.deltaY) == -1 || CanvasD.zoom > 100){
    let tem2=(actw/2)*CanvasD.zoom/100;
    let tem3=(acth/2)*CanvasD.zoom/100;
    CanvasD.x+=tem2;
    CanvasD.y+=tem3;

    let tem=CanvasD.zoom/100;
    if(CanvasD.zoom > 100 && Math.sign(e.deltaY)==1){
      CanvasD.zoom/=1.1;
    }else if(CanvasD.zoom<1500 && Math.sign(e.deltaY)==-1){
      CanvasD.zoom*=1.1;
    }
    pr=e.deltaY;
    tem2=(actw/2)*CanvasD.zoom/100;
    tem3=(acth/2)*CanvasD.zoom/100;
    CanvasD.x-=tem2;
    CanvasD.y-=tem3;
    redraw();
  }
}
function redraw(){//clear and draw everything
  stx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
  mtx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
  ttx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
  btx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
  otx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
  stx.lineWidth = 1;
  stx.strokeStyle = "rgba(110, 110, 110, 0.05)";
  busses.forEach(TrackUpdate);
  stx.strokeStyle="black";
  temporary_1=actw*(CanvasD.zoom/100)*0.0002;
  stops.forEach(StopDraw);
  middle.style.filter = lvfilter;
  mtx.drawImage(latv,CanvasD.x,CanvasD.y,middle.width*CanvasD.zoom/100,middle.height*CanvasD.zoom/100);
  //btx.drawImage(orangeLayer,-middle.width,-middle.height,middle.width*2,middle.height*2);
}
function TrackUpdate(Ob){//all routes draw
  stx.beginPath();
  stx.moveTo(CanvasD.x+(Ob.route[0].x)*CanvasD.zoom/100,CanvasD.y+(Ob.route[0].y)*CanvasD.zoom/100);
  Ob.route.forEach(function(A){
    stx.lineTo(CanvasD.x+(A.x)*CanvasD.zoom/100,CanvasD.y+(A.y)*CanvasD.zoom/100);
  });
  stx.stroke();
}
function StopDraw(Ob){//bus stop draw
  stx.beginPath();
  stx.arc(CanvasD.x+(Ob.x)*CanvasD.zoom/100,CanvasD.y+(Ob.y)*CanvasD.zoom/100,temporary_1, 0, pi2);
  stx.stroke();
}
function coorToCanvas(E,N){//coordinates to canvas coordinates
  var x=(E-left)*mwdw;
  var y=((ttop-N)*mhdh);
  return [x,y];
}
var prX=0;
var prY=0;
var hoverX=0;
var hoverY=0;
var stopDrawDone = false;
var highDone = false;
function move(e){
  if(down){//map drag
    var x = e.clientX;
    var y = e.clientY;
    var dex=(x-prX);
    var dey=(y-prY);
    prX=x;
    prY=y;
    CanvasD.x+=dex;
    CanvasD.y+=dey;
    redraw();
    //console.log([dex,dey]);
  }else{
    stopDrawDone = false;
    if(!highDone) otx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    prX = e.clientX;
    prY = e.clientY;
    hoverX = ((e.clientX*2 - CanvasD.x)*100)/CanvasD.zoom;
    hoverY = ((e.clientY*2 - CanvasD.y)*100)/CanvasD.zoom;
    if(CanvasD.zoom > 450){
      stops.forEach(StopHover);
    }
  }
}
function click(){
  highDone = false;
  busses.forEach(BusHover);
}
function StopHover(Ob){
  if(stopDrawDone || highDone) return;
  if(hoverX <= Ob.x + CanvasD.zoom/400 && hoverX >= Ob.x - CanvasD.zoom/400 && hoverY >= Ob.y - CanvasD.zoom/400 && hoverY <= Ob.y + CanvasD.zoom/400){
    stopDrawDone = true;
    popup(CanvasD.x+(Ob.x)*CanvasD.zoom/100, CanvasD.y+(Ob.y)*CanvasD.zoom/100);
    otx.fillStyle = "black";
    otx.font = (CanvasD.zoom/(3*Ob.name.length) - 15/Ob.name.length) + "px Space Mono";
    otx.fillText(Ob.name.replace(/\s+$/g, ""), CanvasD.x+(Ob.x)*CanvasD.zoom/100 - CanvasD.zoom/10 + 2, CanvasD.y+(Ob.y)*CanvasD.zoom/100 - CanvasD.zoom/22 - Ob.name.length + 5);
  }
}
function BusHover(Ob){
  if(highDone) return;
  Ob.highlighted = false;
  if(hoverX < Ob.x + 5 && hoverX > Ob.x - 5 && hoverY > Ob.y - 5 && hoverY < Ob.y + 5){
    Ob.highlighted = true;
    highDone = true;
  }
}
function CanvasD(){
  this.x=0;
  this.y=0;
  this.zoom=100;
}
var CanvasD=new CanvasD();
var temporary_1;
var pi2=Math.PI*2;
