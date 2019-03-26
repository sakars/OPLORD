function resize(e){//resize, move canvas - zoom, draw
  if(Math.sign(e.deltaY) == -1 || CanvasD.zoom > 100){
    stx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    mtx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    ttx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    btx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    otx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    let tem2=(actw/2)*CanvasD.zoom/100;
    let tem3=(acth/2)*CanvasD.zoom/100;
    CanvasD.x+=tem2;
    CanvasD.y+=tem3;

    let tem=CanvasD.zoom/100;
    if(CanvasD.zoom > 100 && Math.sign(e.deltaY)==1){
      CanvasD.zoom/=1.1;
    }else if(CanvasD.zoom<1000 && Math.sign(e.deltaY)==-1){
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
  stx.lineWidth = 1;
  stx.strokeStyle = "rgba(110, 110, 110, 0.05)";
  busses.forEach(TrackUpdate);
  stx.strokeStyle="black";
  temporary_1=actw*(CanvasD.zoom/100)*0.0002;
  stops.forEach(StopDraw);
  middle.style.filter = lvfilter;
  mtx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
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
function move(e){
  if(down){//map drag
    var x = e.clientX;
    var y = e.clientY;
    var dex=(x-prX);
    var dey=(y-prY);
    prX=x;
    prY=y;
    stx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    mtx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    ttx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    btx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    otx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    CanvasD.x+=dex;
    CanvasD.y+=dey;
    redraw();
    //console.log([dex,dey]);
  }else{
    stopDrawDone = false;
    otx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    prX = e.clientX;
    prY = e.clientY;
    hoverX = ((e.clientX*2 - CanvasD.x)*100)/CanvasD.zoom;
    hoverY = ((e.clientY*2 - CanvasD.y)*100)/CanvasD.zoom;
    stops.forEach(StopHover);
    //busses.forEach(BusHover);
    }
}
function StopHover(Ob){
  if(stopDrawDone) return;
  if(hoverX <= Ob.x + CanvasD.zoom/400 && hoverX >= Ob.x - CanvasD.zoom/400 && hoverY >= Ob.y - CanvasD.zoom/400 && hoverY <= Ob.y + CanvasD.zoom/400){
    stopDrawDone = true;
    let tx = CanvasD.x+(Ob.x)*CanvasD.zoom/100;
    let ty = CanvasD.y+(Ob.y)*CanvasD.zoom/100;
    otx.fillRect(tx - CanvasD.zoom/10 - 2, ty - CanvasD.zoom/8 - 2, CanvasD.zoom/5 + 4, CanvasD.zoom/11 + 4);
    otx.beginPath();
    otx.moveTo(tx, ty);
    otx.lineTo(tx - CanvasD.zoom/40, ty - CanvasD.zoom/22);
    otx.lineTo(tx + CanvasD.zoom/40, ty - CanvasD.zoom/22);
    otx.closePath();
    otx.stroke();
    otx.fillStyle = "white";
    otx.fillRect(tx - CanvasD.zoom/10, ty - CanvasD.zoom/8, CanvasD.zoom/5, CanvasD.zoom/11);
    otx.beginPath();
    otx.moveTo(tx, ty);
    otx.lineTo(tx - CanvasD.zoom/40, ty - CanvasD.zoom/22);
    otx.lineTo(tx + CanvasD.zoom/40, ty - CanvasD.zoom/22);
    otx.closePath();
    otx.fill();
    otx.fillStyle = "black";
    otx.font = (CanvasD.zoom/(3*Ob.name.length) - 15/Ob.name.length) + "px Space Mono";
    otx.fillText(Ob.name.replace(/\s+$/g, ""), tx - CanvasD.zoom/10 + 2, ty - CanvasD.zoom/22 - Ob.name.length + 5);
  }
}
function BusHover(Ob){
  if(hoverX < Ob.x + 10 && hoverX > Ob.x - 10 && hoverY > Ob.y - 10 && hoverY < Ob.y + 10){
    otx.fillRect(CanvasD.x+Ob.x*CanvasD.zoom/100, CanvasD.y+Ob.y*CanvasD.zoom/100, 10, 10);
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
