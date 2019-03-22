
var str;//Busstop data string
var IDs;//Busstop ID string
var reA=[];//returned array
var done=false;
var i=0;
var troute;
function daritajs(){
  var bigA=str.split("\n");
  var IDSaf=[];
  reA=[];
  bigA.forEach(
    function(a,i){
      bigA[i]=a.split("\t");
      if(!IDSaf.includes(bigA[i][3])){
        IDSaf.push(bigA[i][3]);
        reA.push(new Stop(bigA[i][0],bigA[i][2],bigA[i][1],bigA[i][3]));
      }
    }
  );
  troute=troute.split("\n");
  troute.forEach(function(a){
    var te=a.split(" ");
    var ti=[];
    te.forEach(function(a,i){
      if(i%2==1){
        ti.push([a,te[i+1]]);
      }
    });
    busses.push(new Bus(ti));
  });
  done=true;
}
function recycle(){
  var fileURL = "Stop_Data";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', fileURL);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      str=xhr.responseText;
      daritajs1();
    }
  }
  xhr.send();
}
function daritajs1(){
  var fileURL = "timetable.txt";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', fileURL);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      troute=xhr.responseText;
      daritajs();
    }
  }
  xhr.send();
}
