/* splash screen timeout */
const splash= document.querySelector('.splash')

/* event listener to the document */
document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
       splash.classList.add('display-none'); 
    }, 2000); /* Timeout set to 2 seconds */
})


//host all files in public folder
//static = unchanging files
app.use(express.static('public'));


/* Websocket to serial proxy. */
const express = require('express');
const app = express();
const path = require('path');
//const port = 3000;

//var app = require('express')();

var socket = require ('socket.io');

var five = require("johnny-five");
var http = require('http').createServer(app);
//var io = require('socket.io')(http);
var io = socket(server);
var SerialPort = require('SerialPort');

//const port = new SerialPort("/dev/cu.usbmodem14341");

//new connection event
//io being the inpiut output object to sockets - call the function on - to setup a connection event
io.sockets.on ('connection', newConnection)

//socket argument places in that function
function newConnection(socket){
    //new socket connection to the server gets assigned an id number
    console.log('new connection:' + socket.id);   
}

//code for the board, initializes colour when board is one
five.Board().on('ready',function(){

    var led = new five.Led.RGB({
        pins:{
            red:3,
            green:5,
            blue:6
        }
    })

    led.on();
    //default led colour when led is on
    //led.color('#04C6A4');
    led.color('#FF0000');


    //websocket connections on
    io.on('connection', function(socket, req){
        console.log('a browser connected');
        //front end users connect changes colour of led to #FF0000
        socket.on('message', function(data){
            led.color('#' + data);
        })
    });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    http.listen(3000, function() {
    console.log('listening on *:3000');
    });

});
