//var five = require("johnny-five");
//var board = new five.Board();
//
//board.on("ready", function() {
//    var led = new five.Led(13);
//    led.blink(500);
//});


//test blink code
const { Board, Led } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
  const led = new Led(13);

  // "blink" the led in 500ms on-off phase periods
  led.blink(500);
});