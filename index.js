var server = require("./modules/server");
var router = require("./modules/router");
var requestHandlers = require("./modules/requestHandlers");

var handle = {}
for( a in requestHandlers){
  // console.log(a)
  handle[a] = requestHandlers[a]
}
// handle[""] = requestHandlers.index
// handle['index']  = requestHandlers.index 
// handle['start']  = requestHandlers.start 
// handle['upload']  = requestHandlers.upload
// handle["getJingduList"] = requestHandlers.getJingduList
// handle["themesList"] = requestHandlers.themesList


// console.log('TCL: router.route', router.route)
server.start(router.route,handle)