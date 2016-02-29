var http = require('http');
var dispatcher = require('httpdispatcher');
var request = require('request');
var schedule = require('node-schedule');
var mindfulnessInterval = require('./scripts/mindfulnessInterval').mindfulnessInterval;

const PORT=8080; 

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(process.env.PORT || PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

//Lets use our dispatcher
function handleRequest(request, response){
  response.end('It Works!! Path Hit: ' + request.url);
}

//mindfulness interval: vibrate Pavlok every 15min between 6am-9pm
var mindfulnessRule = {
  hour: [new schedule.Range(5, 20)],
  minute: [0, 15, 30, 45]
};
var interval = mindfulnessInterval(mindfulnessRule);

var caffeineRule = {
  hour: [new schedule.Range(4, 20)],
  minute: [new schedule.Range(0, 59)]
};

var wakeupInterval = schedule.scheduleJob(caffeineRule, function() {
  request('https://vast-dawn-57259.herokuapp.com/', function(res) {
    var date = new Date(Date.now());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    console.log('made request to wake up at ', strTime);
  });
});

//A sample GET request    
// dispatcher.onGet("/", function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Page One');
// });    

