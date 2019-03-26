function resize(e){//resize, move canvas - zoom, drag
  if(Math.sign(e.deltaY) == -1 || CanvasD.zoom > 100){
    stx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom,acth*CanvasD.zoom);
    mtx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom,acth*CanvasD.zoom);
    ttx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom,acth*CanvasD.zoom);
    btx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom,acth*CanvasD.zoom);
    let tem2=(actw/2)*CanvasD.zoom;
    let tem3=(acth/2)*CanvasD.zoom;
    CanvasD.x+=tem2;
    CanvasD.y+=tem3;
    let tem=CanvasD.zoom/100;
    if(CanvasD.zoom > 100 && Math.sign(e.deltaY)==1){
      CanvasD.zoom/=1.1;
    }else if(CanvasD.zoom<1000 && Math.sign(e.deltaY)==-1){
      CanvasD.zoom*=1.1;
    }
    pr=e.deltaY;
    let tem2=-(actw/2)*CanvasD.zoom;
    let tem3=-(acth/2)*CanvasD.zoom;
    CanvasD.x+=tem2;
    CanvasD.y+=tem3;
    redraw();
  }
}
function redraw(){//clear and draw everything
  stx.lineWidth = 1;
  stx.strokeStyle = "rgba(110, 110, 110, 0.05)";
  busses.forEach(TrackUpdate);
  stx.strokeStyle="black";
  temporary_1=actw/(CanvasD.zoom*100);
  stops.forEach(StopDraw);
  middle.style.filter = lvfilter;
  mtx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom,acth*CanvasD.zoom);
  mtx.drawImage(latv,CanvasD.x,CanvasD.y,middle.width*CanvasD.zoom,CanvasD.zoom);
  //btx.drawImage(orangeLayer,-middle.width,-middle.height,middle.width*2,middle.height*2);
}
function TrackUpdate(Ob){//all routes draw
  stx.beginPath();
  stx.moveTo(CanvasD.x+Ob.route[0].x,CanvasD.y+Ob.route[0].y);
  Ob.route.forEach(function(A){
    stx.lineTo(canvasD.x+A.x,CanvasD.y+A.y);
  });
  stx.stroke();
}
function StopDraw(Ob){//bus stop draw
  stx.beginPath();
  stx.arc(CanvasD.x+Ob.x,CanvasD.y+Ob.y,temporary_1, 0, pi2);
  stx.stroke();
}
function coorToCanvas(E,N){//coordinates to canvas coordinates
  var x=(E-left)*mwdw;
  var y=((ttop-N)*mhdh);
  return [x,y];
}
var prX=0;
var prY=0;
function move(e){
  if(down){//map drag
    var x = e.clientX;
    var y = e.clientY;
    let tem=CanvasD.zoom/100;
    var dex=(x-prX)/(tem);
    var dey=(y-prY)/(tem);
    prX=x;
    prY=y;
    stx.clearRect(0,0,actw,acth);
    mtx.clearRect(0,0,actw,acth);
    ttx.clearRect(0,0,actw,acth);
    btx.clearRect(0,0,actw,acth);

    stx.translate(dex,dey);
    mtx.translate(dex,dey);
    ttx.translate(dex,dey);
    btx.translate(dex,dey);
    redraw();
    //console.log([dex,dey]);
  }/*
  else{
    prX = e.clientX;
    prY = e.clientY;
    stops.forEach(StopHover);
  }*/
}
function StopHover(Ob){
  if(prX < Ob.x + 3 && prX > Ob.x - 3 && prY > Ob.y - 3 && prY < Ob.y + 3){
    stx.fillRect(Ob.x, Ob.y, 10, 10);
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
