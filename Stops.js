function Stop(name, E, N,Id){
    this.name=name;
    this.degE=E;
    this.degN=N;
    this.Id=Id;
    IDstop.push([this.Id, this]);
}
Stop.prototype.findById=function(Id){
  for(var i=0;i<IDstop;i++){
    if(IDstop[i][0]==Id){
      return IDstop[i][1];
    }
  }
  throw "this ain't it chief";
}
var IDstop=[];
