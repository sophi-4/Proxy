//var five = require("johnny-five");
//var board = new five.Board();
//
//board.on("ready", function() {
//    var led = new five.Led(13);
//    led.blink(500);
//});


var five = require('johnny-five');
var temporal = require('temporal');
var colorConvert = require('color-convert');
// Set time delay in milliseconds.
let delay = 20;
// Starting hue for the LED - turquoise.
let initialHue = 160;
// Boolean to control the color transition loop
let loopActive = false;
// Make a new Johnny-Five board instance.
const board = new five.Board();
board.on('ready', function() {
  // Store the RGB LED in a constant.
  // Make sure they're all connected to PWM pins.
  const light = new five.Led.RGB({
    pins: [9, 10, 11],
  // This example uses a Common Anode.
  // Don't set this if you're using Common Cathode LEDs!
    isAnode: true,
  });
  
  let currentHue = initialHue;
  /**
   * 
   * Exit Event
   * When disconnecting, make sure components are off.
   * 
   */
  this.on('exit', () => {
    // When the board disconnects, turn the LED off.
    light.stop().off();
    console.log('[johnny-five] Board closing - bye bye!');
  });
});



////test blink code
//const { Board, Led } = require("johnny-five");
//const board = new Board();
//
//board.on("ready", () => {
//  const led = new Led(13);
//
//  // "blink" the led in 500ms on-off phase periods
//  led.blink(500);
//});