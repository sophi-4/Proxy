/* Websocket to serial proxy. */

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport');

const port = new SerialPort("/dev/cu.usbmodem14641");

//const app = express ();

var five = require("johnny-five");

//code for the board, initializes colour when board is one    
five.Board().on('ready',function(){
    
    var led =new five.led.RGB({
        pins:{
            blue:5
        }
    })
    
    led.on();
    //default led colour when led is on
    led.color('#04C6A4');
    
    //websocket connections on 
    io.on('connection', function(socket){
        console.log('a browser connected'); 
        //front end users connect changes colour of led to #04C6A4 
        socket.on('message', function(data){
            led.color('#' + data); 
        })
    });


port.open(function (err) {
    if (err) {
        return console.log('Error opening port:', err.message);
    }
});

    app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    });

    socket.on('message', function(msg) {
        console.log(new Date());
        //console.log('message: ' + msg);
        port.write(msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    port.on('data', function (data) {
        //console.log('Data:', data);
        socket.emit('arduino', data[0]);
    });
    
    http.listen(3000, function() {
    console.log('listening on *:3000');
    });
    
});