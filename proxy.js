/* Websocket to serial proxy. */

const express = require('express');
const app = express ();

//var app = require('express')();

var five = require("johnny-five");

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport');

const port = new SerialPort("/dev/cu.usbmodem14641");


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


    http.listen(3000, function() {
    console.log('listening on *:3000');
    });
    
});