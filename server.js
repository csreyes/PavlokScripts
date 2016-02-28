var http = require('http');
var dispatcher = require('httpdispatcher');
var request = require('request');
var schedule = require('node-schedule');
var stimulate = require('./scripts/helpers').stimulate;

const PORT=8080; 

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

//Lets use our dispatcher
function handleRequest(request, response){
    try {
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//mindfuless interval: vibrate Pavlok every 15
var rule = {
  hour: [new schedule.Range(5, 20)],
  minute: [0, 15, 30, 45]
};
var every5Seconds = schedule.scheduleJob(rule, function() {
  stimulate('vibrate', 'med');
})

// //A sample GET request    
// dispatcher.onGet("/page1", function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Page One');
// });    

// //A sample POST request
// dispatcher.onPost("/post1", function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Got Post Data');
// });

