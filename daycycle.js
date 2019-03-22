var localTime = 0;
var day = 0;
var showDay = false;
var pod = "";
var calhours;
var calminutes;
function updateTime(){
  //1200 secs
  if(localTime < 1200){
    let partOfDay = 24*localTime/1200;
    let minutes = Math.floor((partOfDay - Math.floor(partOfDay))*60);
    calminutes=minutes;
    minutes = String(minutes).length == 2 ? minutes : "0" + minutes;
    let hours = Math.floor(partOfDay);
    calhours=hours;
    hours = String(hours).length == 2 ? hours : "0" + hours;
    timeDisplay.innerHTML = hours + ":" + minutes;
    dayDisplay.innerHTML = "  Day: " + day;
    if(localTime > 900){
      pod = "Evening";
    }
    else if(localTime > 600){
      pod = "Day";
    }
    else if(localTime > 300){
      pod = "Morning";
    }
    else{
      pod = "Night";
    }
    podDisplay.innerHTML = "POD: " + pod;
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
