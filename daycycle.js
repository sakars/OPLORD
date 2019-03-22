var localTime = 0;
var day = 0;
var showDay = false;
var pod = "Vakars";
var calhours;
var calminutes;
var dayLength = 1200;
var updateCount = 50;
var day4=dayLength/4;
var day34=day4*3;
var day2=dayLength/2;
var temporary_2;
var temporary_3;
function updateTime(){
  //1200 secs
  if(localTime < dayLength){
    let partOfDay = 24*localTime/dayLength;//hours
    let minutes = Math.floor((partOfDay%1)*60);
    calminutes=minutes;
    minutes = String(minutes).length == 2 ? minutes : "0" + minutes;
    let hours = Math.floor(partOfDay);
    calhours=hours;
    hours = String(hours).length == 2 ? hours : "0" + hours;
    timeDisplay.innerHTML = hours + ":" + minutes;
    dayDisplay.innerHTML = "  Diena: " + day;
    if(localTime >= day34 && pod == "Diena"){
      lvfilter = "brightness(30%)";
      body.style.backgroundColor = "#510a5e";
      pod = "Vakars";
      cBusColor = "#7aacff";
      redraw();
    }
    else if(localTime >= day2 && pod == "Rīts"){
      lvfilter = "brightness(90%)";
      body.style.backgroundColor = "#901FBA";
      pod = "Diena";
      cBusColor = "#0e4877";
      redraw();
    }
    else if(localTime >= day4 && pod == "Nakts"){
      lvfilter = "brightness(85%)";
      body.style.backgroundColor = "#a11faf";
      pod = "Rīts";
      cBusColor = "#0e4877";
      redraw();
    }
    else if(localTime >= 0 && localTime < day4 && pod == "Vakars"){
      lvfilter = "brightness(10%)";
      body.style.backgroundColor = "#220430";
      pod = "Nakts";
      cBusColor = "#7aacff";
      redraw();
    }
    podDisplay.innerHTML = "DD: " + pod;
    localTime += 0.05;
    setTimeout(updateTime, updateCount);
  }
  else{
    localTime = 0;
    updateTime();
  }
  busses.forEach(function(a,index){
    temporary_2=a.times;
    temporary_3=a.route;
    if(!a.going){
      if(temporary_2[0][0]==calhours && temporary_2[0][1]==calminutes){
        a.going=true;
        Console.log("Autobuss no " + temporary_3[0].name + " ir izbraucis, galapunktā " + temporary_3[temporary_3.length-1].name + " būs " + String(temporary_2[temporary_2.length-1]).replace(",",":"));
      }
    }else{//6 updates in one in-game minute
      var sw=false;
      if(a.x==temporary_3[a.place].x && a.y==temporary_3[a.place].y){
        if(a.waited==a.passengerCool){
          a.waited=0;
          a.place++;
          if(((temporary_2[a.place][0]*60+temporary_2[a.place][1])-(temporary_2[a.place-1][0]*60+temporary_2[a.place-1][1]))<0){
            temporary_2[a.place][0]+=24;
          }
          var framec=16*((temporary_2[a.place][0]*60+temporary_2[a.place][1])-(temporary_2[a.place-1][0]*60+temporary_2[a.place-1][1]));
          if(framec==0)framec=1;
          a.frame=framec;
          a.delta[0]=(temporary_3[a.place].x-temporary_3[a.place-1].x)/framec;
          a.delta[1]=(temporary_3[a.place].y-temporary_3[a.place-1].y)/framec;
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
          a.x=temporary_3[a.place].x;
          a.y=temporary_3[a.place].y;
        }
      }
      if(a.place==temporary_3.length-1){
        a.going=false;
        a.place=0;
        a.x=temporary_3[a.place].x;
        a.y=temporary_3[a.place].y;
      }
    }
  });
}
timeSlider.addEventListener("input",
function(){
  updateCount = timeSlider.value;
});
