var http = require('http');
var dispatcher = require('httpdispatcher');
var request = require('request');
var schedule = require('node-schedule');
var mindfulnessInterval = require('./scripts/mindfulnessInterval').mindfulnessInterval;

const PORT=8080; 

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

//Lets use our dispatcher
function handleRequest(request, response){
  response.end('It Works!! Path Hit: ' + request.url);
}

//mindfulness interval: vibrate Pavlok every 15min between 6am-9pm
var rule = {
  hour: [new schedule.Range(5, 20)],
  minute: [0, 15, 30, 45]
};
var interval = mindfulnessInterval(rule);

//A sample GET request    
// dispatcher.onGet("/", function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Page One');
// });    

