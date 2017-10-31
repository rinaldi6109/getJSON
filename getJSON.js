function getJSON(aUrl) {
  var response = UrlFetchApp.fetch(aUrl); // get feed
  var dataAll = JSON.parse(response.getContentText()); //
  return writeJSONtoSheet1(dataAll,[]);
}

function writeJSONtoSheet1(json,level) {
var jsonArray=[];  
var row=[];
var flag=true;
  var keys = Object.keys(json); //.sort();
  for (var k = 0; k < keys.length; k++) {
//    Logger.log(keys[k]+";"+typeof(json[keys[k]])+":"+Array.isArray(json[keys[k]]));
    if (typeof(json[keys[k]])=="object") {
      flag=false;
          if (Array.isArray(json[keys[k]])) {
            jsonArray=jsonArray.concat(writeJSONtoSheet1(json[keys[k]],level.concat("array",keys[k]+"-")));
          } else {
            jsonArray=jsonArray.concat(writeJSONtoSheet1(json[keys[k]],level.concat("object",((typeof(1*keys[k]+0)=="number") ? keys[k] : keys[k]))));
          }
      } else {
        level=level.concat(keys[k],json[keys[k]]);
//        Logger.log(level);
      }  
  }
  if (flag) jsonArray.push(level);
//  Logger.log(jsonArray);
  return jsonArray;
} 
