var localTime = 300;
var day = 0;
var showDay = false;
var pod = "Nakts";
var dayLength = 1200;

function updateTime(){
  //1200 secs
  if(localTime < dayLength){
    let partOfDay = 24*localTime/dayLength;
    let minutes = Math.floor((partOfDay - Math.floor(partOfDay))*60);
    minutes = String(minutes).length == 2 ? minutes : "0" + minutes;
    let hours = Math.floor(partOfDay);
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
    setTimeout(updateTime, 200);
  }
  else{
    localTime = 0;
    updateTime();
  }
}
