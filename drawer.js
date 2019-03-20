function resize(e){
  stx.restore();
  stx.save();

  mtx.restore();
  mtx.save();

  ttx.restore();
  ttx.save();

  btx.restore();
  btx.save();
  zoom-=Math.sign(e.deltaY)*10;
  console.log(e.deltaY);
  pr=e.deltaY;
  stx.clearRect(0,0,actw,acth);
  mtx.clearRect(0,0,actw,acth);
  ttx.clearRect(0,0,actw,acth);
  btx.clearRect(0,0,actw,acth);

  stx.translate(actw/2,acth/2);
  mtx.translate(actw/2,acth/2);
  ttx.translate(actw/2,acth/2);
  btx.translate(actw/2,acth/2);

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
