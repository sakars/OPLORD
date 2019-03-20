var localTime = 0;
var day = 0;
var showDay = false;

function updateTime(){
  //1200 secs
  let partOfDay = 24*localTime/1200;
  let minutes = Math.floor((partOfDay - Math.floor(partOfDay))*60);
  minutes = String(minutes).length == 2 ? minutes : "0" + minutes;
  let hours = Math.floor(partOfDay)
  hours = String(hours).length == 2 ? hours : "0" + hours;
  timeDisplay.innerHTML = hours + ":" + minutes;
  dayDisplay.innerHTML = "  Day: " + day;
  localTime += 0.1;
  setTimeout(updateTime, 100);
}
