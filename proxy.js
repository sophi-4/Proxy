/* Websocket to serial proxy. */

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport');

const port = new SerialPort("/dev/cu.usbmodem14641");

port.open(function (err) {
    if (err) {
        return console.log('Error opening port:', err.message);
    }
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a browser connected');

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
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

