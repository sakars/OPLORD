function resize(e){//resize, move canvas - zoom, draw
  if(Math.sign(e.deltaY) == -1 || CanvasD.zoom > 100){
    stx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    mtx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    ttx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    btx.clearRect(CanvasD.x,CanvasD.y,actw*CanvasD.zoom/100,acth*CanvasD.zoom/100);
    prX = e.clientX;
    prY = e.clientY;
    let tem=CanvasD.zoom;
    if(CanvasD.zoom > 100 && Math.sign(e.deltaY)==1){
      CanvasD.zoom/=1.1;
    }else if(CanvasD.zoom<1000 && Math.sign(e.deltaY)==-1){
      CanvasD.zoom*=1.1;
    }
    pr=e.deltaY;
    CanvasD.x=prX*2-((prX*2-CanvasD.x)/(tem/100)*(CanvasD.zoom/100));
    CanvasD.y=prY*2-((prY*2-CanvasD.y)/(tem/100)*(CanvasD.zoom/100));
    redraw();
  }
}
function redraw(){//clear and draw everything
  stx.lineWidth = 1;
  stx.strokeStyle = "rgba(110, 110, 110, 0.05)";
  busses.forEach(TrackUpdate);
  stx.strokeStyle="black";
  temporary_1=actw*(CanvasD.zoom/100)*0.0001;
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
    CanvasD.x+=dex;
    CanvasD.y+=dey;
    redraw();
    //console.log([dex,dey]);
  }else{
    prX = e.clientX;
    prY = e.clientY;
    //console.log(prX,prY);
    //stops.forEach(StopHover);
  }
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
