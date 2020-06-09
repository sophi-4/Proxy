/* Websocket to serial proxy. */
const express = require('express');
const app = express();
const path = require('path');
//const port = 3000;

//var app = require('express')();

var five = require("johnny-five");
var socket = require ('socket.io');

var http = require('http').createServer(app);
//var io = require('socket.io')(http);
            //var io = socket(server);
var SerialPort = require('SerialPort');

//const port = new SerialPort("/dev/cu.usbmodem14341");

//new connection event
//io being the input output object to sockets - call the function on - to setup a connection event
            //io.sockets.on ('connection', newConnection)

//host all files in public directory, static = unchanging files
app.use(express.static('public'));

//socket argument places in that function
function newConnection(socket){
    //new socket connection to the server gets assigned an id number
    console.log('new connection:' + socket.id);   
}

//code for the board, initializes colour when board is one
five.Board().on('ready',function(){

    var led = new five.Led.RGB({
        pins:{
            white:7,
            green:6,
            blue:5
        }
    })

    led.on();
    //default led colour when led is on
    //led.color('#04C6A4');
    led.color('#FF0000');

    //websocket connections on
    io.on('connection', function(socket, req){
        console.log('connected');
        //front end users connect, changes colour of led to #FF0000
        socket.on('message', function(data){
            led.color('#' + data);
        })
    });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    http.listen(8000, function() {
    console.log('listening on *:8000');
    });

});
