/* Websocket to serial proxy. */

const express = require('express');
const app = express ();
const path = require('path');
//const port = 3000;

//var app = require('express')();

var five = require("johnny-five");

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SerialPort = require('SerialPort');

//const port = new SerialPort("/dev/cu.usbmodem14341");


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
    led.color('#0000FF');


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
