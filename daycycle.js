var localTime = 0;
var day = 0;
var showDay = false;
var pod = "";
var dayLength = 1200;

function updateTime(){
  //1200 secs
  if(localTime < dayLength){
    let partOfDay = 24*localTime/dayLength;
    let minutes = Math.floor((partOfDay - Math.floor(partOfDay))*60);
    minutes = String(minutes).length == 2 ? minutes : "0" + minutes;
    let hours = Math.floor(partOfDay)
    hours = String(hours).length == 2 ? hours : "0" + hours;
    timeDisplay.innerHTML = hours + ":" + minutes;
    dayDisplay.innerHTML = "  Day: " + day;
    if(localTime > dayLength*3/4){
      pod = "Evening";
    }
    else if(localTime > dayLength/2){
      pod = "Day";
    }
    else if(localTime > dayLength/4){
      pod = "Morning";
    }
    else{
      pod = "Night";
    }
    podDisplay.innerHTML = "POD: " + pod;
    localTime += 0.2;
    setTimeout(updateTime, 200);
  }
  else{
    localTime = 0;
    updateTime();
  }
}
