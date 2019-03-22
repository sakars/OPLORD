var localTime = 0;
var day = 0;
var showDay = false;
var pod = "Vakars";
var calhours;
var calminutes;
var dayLength = 1200;
function updateTime(){
  //1200 secs
  if(localTime < dayLength){
    let partOfDay = 24*localTime/dayLength;
    let minutes = Math.floor((partOfDay - Math.floor(partOfDay))*60);
    calminutes=minutes;
    minutes = String(minutes).length == 2 ? minutes : "0" + minutes;
    let hours = Math.floor(partOfDay);
    calhours=hours;
    hours = String(hours).length == 2 ? hours : "0" + hours;
    timeDisplay.innerHTML = hours + ":" + minutes;
    dayDisplay.innerHTML = "  Diena: " + day;
    if(localTime >= dayLength*3/4 && pod == "Diena"){
      lvfilter = "brightness(30%)";
      body.style.backgroundColor = "#510a5e";
      pod = "Vakars";
      redraw();
    }
    else if(localTime >= dayLength/2 && pod == "Rīts"){
      lvfilter = "brightness(100%)";
      body.style.backgroundColor = "#901FBA";
      pod = "Diena";
      redraw();
    }
    else if(localTime >= dayLength/4 && pod == "Nakts"){
      lvfilter = "brightness(90%)";
      body.style.backgroundColor = "#a11faf";
      pod = "Rīts";
      redraw();
    }
    else if(localTime >= 0 && localTime < dayLength/4 && pod == "Vakars"){
      lvfilter = "brightness(10%)";
      body.style.backgroundColor = "#220430";
      pod = "Nakts";
      redraw();
    }
    podDisplay.innerHTML = "DD: " + pod;
    localTime += 0.2;
    setTimeout(updateTime, 200);//200
  }
  else{
    localTime = 0;
    updateTime();
  }
  busses.forEach(function(a,index){
    if(!a.going){
      if(a.times[0][0]==calhours && a.times[0][1]==calminutes){
        a.going=true;
        var k=true;
        for(var i=0;i<a.times.length;i++){
          if(a.times[i][0]!=0 || a.times[i][1]!=0)k=false;
        }
        if(k){
          errs.push(index);
        }
      }
    }else{//6 updates in one in-game minute
      var sw=false;
      if(a.x==a.route[a.place].x && a.y==a.route[a.place].y){
        if(a.waited==a.passengerCool){
          a.waited=0;
          a.place++;
          if(((a.times[a.place][0]*60+a.times[a.place][1])-(a.times[a.place-1][0]*60+a.times[a.place-1][1]))<0){
            a.times[a.place][0]+=24;
          }
          var framec=6*((a.times[a.place][0]*60+a.times[a.place][1])-(a.times[a.place-1][0]*60+a.times[a.place-1][1]));
          if(framec==0)framec=1;
          a.frame=framec;
          a.delta[0]=(a.route[a.place].x-a.route[a.place-1].x)/framec;
          a.delta[1]=(a.route[a.place].y-a.route[a.place-1].y)/framec;
          sw=true;
        }else{
          a.waited++;
        }
      }
      if(a.waited==0){
        a.x+=a.delta[0];
        a.y+=a.delta[1];
        a.count++;
        if(a.count==a.frame && !sw){
          a.count=0;
          a.x=a.route[a.place].x;
          a.y=a.route[a.place].y;
        }
      }
      if(a.place==a.route.length-1){
        a.going=false;
        a.place=0;
        a.x=a.route[a.place].x;
        a.y=a.route[a.place].y;
      }
    }
  });
  if(!rem){
    for(var i=errs.length-1;i>=0;i--){
      busses.splice(errs[i],1);
    }
    rem=true;
  }
}
var errs=[];
var rem=false;
