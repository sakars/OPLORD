function resize(e){
  if(Math.sign(e.deltaY) == -1 || zoom > 100){
    stx.clearRect(0,0,actw,acth);
    mtx.clearRect(0,0,actw,acth);
    ttx.clearRect(0,0,actw,acth);
    btx.clearRect(0,0,actw,acth);
    let tem2=actw/2;
    let tem3=acth/2;
    stx.translate(tem2,tem3);
    mtx.translate(tem2,tem3);
    ttx.translate(tem2,tem3);
    btx.translate(tem2,tem3);
    let tem=zoom/100;
    stx.transform(1/(tem),0,0,1/(tem),0,0);
    mtx.transform(1/(tem),0,0,1/(tem),0,0);
    ttx.transform(1/(tem),0,0,1/(tem),0,0);
    btx.transform(1/(tem),0,0,1/(tem),0,0);
    tem=(e.deltaY**3)/100000;
    if(zoom-tem >= 100){
      zoom-=tem;
    }
    pr=e.deltaY;
    /*
    stx.clearRect(0,0,actw,acth);
    mtx.clearRect(0,0,actw,acth);
    ttx.clearRect(0,0,actw,acth);
    btx.clearRect(0,0,actw,acth);
    */

    tem=zoom/100;
    stx.transform(tem,0,0,tem,0,0);
    mtx.transform(tem,0,0,tem,0,0);
    ttx.transform(tem,0,0,tem,0,0);
    btx.transform(tem,0,0,tem,0,0);
    tem2=-tem2;
    tem3=-tem3;
    stx.translate(tem2,tem3);
    mtx.translate(tem2,tem3);
    ttx.translate(tem2,tem3);
    btx.translate(tem2,tem3);
    redraw();
  }
}
function redraw(){
  stx.lineWidth = 1;
  stx.strokeStyle = "rgba(110, 110, 110, 0.05)";
  busses.forEach(TrackUpdate);
  stx.strokeStyle="black";
  temporary_1=actw/(1000*Math.cbrt(zoom));
  stops.forEach(StopDraw);
  middle.style.filter = lvfilter;
  mtx.clearRect(0,0,actw,acth);
  mtx.drawImage(latv,0,0,middle.width,middle.height);
  //btx.drawImage(orangeLayer,-middle.width,-middle.height,middle.width*2,middle.height*2);
}
function TrackUpdate(Ob){
  stx.beginPath();
  stx.moveTo(Ob.route[0].x, Ob.route[0].y);
  Ob.route.forEach(function(A){
    stx.lineTo(A.x, A.y);
  });
  stx.stroke();
}
function StopDraw(Ob){
  stx.beginPath();
  stx.arc(Ob.x, Ob.y,temporary_1, 0, pi2);
  stx.stroke();
}
function coorToCanvas(E,N){
  var x=(E-left)*mwdw;
  var y=((ttop-N)*mhdh);
  return [x,y];
}
var prX=0;
var prY=0;
function move(e){
  if(down){
    var x = e.clientX;
    var y = e.clientY;
    let tem=zoom/100;
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
    Console.log("Trapi");
    stx.fillRect(Ob.x, Ob.y, 10, 10);
  }
}
var temporary_1;
var pi2=Math.PI*2;
