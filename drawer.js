
function resize(e){
    stx.clearRect(0,0,actw,acth);
    mtx.clearRect(0,0,actw,acth);
    ttx.clearRect(0,0,actw,acth);
    btx.clearRect(0,0,actw,acth);

    stx.translate(actw/2,acth/2);
    mtx.translate(actw/2,acth/2);
    ttx.translate(actw/2,acth/2);
    btx.translate(actw/2,acth/2);

    stx.transform(1/(zoom/100),0,0,1/(zoom/100),0,0);
    mtx.transform(1/(zoom/100),0,0,1/(zoom/100),0,0);
    ttx.transform(1/(zoom/100),0,0,1/(zoom/100),0,0);
    btx.transform(1/(zoom/100),0,0,1/(zoom/100),0,0);


    zoom-=(e.deltaY**3)/100000;
    if(zoom < 100){
      zoom+=(e.deltaY**3)/100000;
    }
    pr=e.deltaY;
    /*
    stx.clearRect(0,0,actw,acth);
    mtx.clearRect(0,0,actw,acth);
    ttx.clearRect(0,0,actw,acth);
    btx.clearRect(0,0,actw,acth);
    */


    stx.transform(zoom/100,0,0,zoom/100,0,0);
    mtx.transform(zoom/100,0,0,zoom/100,0,0);
    ttx.transform(zoom/100,0,0,zoom/100,0,0);
    btx.transform(zoom/100,0,0,zoom/100,0,0);

    stx.translate(-actw/2,-acth/2);
    mtx.translate(-actw/2,-acth/2);
    ttx.translate(-actw/2,-acth/2);
    btx.translate(-actw/2,-acth/2);
    redraw();
}
function redraw(){
  stops.forEach(StopDraw);
  mtx.drawImage(latv,0,0,middle.width,middle.height);
  //btx.drawImage(orangeLayer,-middle.width,-middle.height,middle.width*2,middle.height*2);
  mtx.strokeStyle="black";
  mtx.fillStyle="white";
  mtx.lineWidth = 2;
}
function StopDraw(Ob){
  stx.beginPath();
  stx.arc(Ob.x, Ob.y, 2.5/3000*actw, 0, Math.PI*2);
  stx.fill();
}
function coorToCanvas(E,N){
  var x=(E-left)*middle.width/width;
  var y=((ttop-N)*middle.height/height);
  return [x,y];
}
var prX=0;
var prY=0;
function move(e){
  if(down){
    var x = e.clientX;
    var y = e.clientY;
    var dex=(x-prX)/(zoom/100);
    var dey=(y-prY)/(zoom/100);
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
    console.log([dex,dey]);
  }else{
    prX=e.clientX;
    prY=e.clientY;
  }
}
