function recycle(){
  get_stuff();
}
var str;//Busstop data string
var IDs;//Busstop ID string
var reA=[];
var done=false;
var i=0;
function daritajs(){
  i++;
  if(i==2){
    var bigA=str.split("\t");
    var IDA=IDs.split("\t");
    var IDSaf=[];
    reA=[];
    var name;
    var E;
    var N;//name N E
    var Id;
    while(bigA.length !=0){
      E=Number(bigA.pop());
      N=Number(bigA.pop());
      name=bigA.pop();
      Id=Number(IDA.pop());
      if(!IDSaf.includes(Id)){
        reA.push(new Stop(name,E,N,Id));
        IDSaf.push(Id);
      }
    }
    done =true;
  }
}
function get_stuff(){
  var fileURL = "Stop_Data";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', fileURL);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      str=xhr.responseText;
      daritajs();
    }
  }
  xhr.send();
  var fileURL2 = "BusID";
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', fileURL2);
  xhr2.onreadystatechange = function() {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      IDs=xhr2.responseText;
      daritajs();
    }
  }
  xhr2.send();
}
