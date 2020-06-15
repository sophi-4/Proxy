#include <Adafruit_NeoPixel.h>

#define BUTTON_PIN   2
#define PIXEL_PIN    6

#define PIXEL_COUNT 12
//#define PIXEL_COUNT 48

//int buttonState = LOW;         // variable for reading the pushbutton status
//int oldButtonState = LOW;

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, NEO_GRB + NEO_KHZ800);

bool oldState = HIGH;
int newState = HIGH;
int showType = 0;

void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'

  pinMode(BUTTON_PIN, INPUT_PULLUP);
  //  strip.begin();
  //  strip.show(); // Initialize all pixels to 'off'

  Serial.begin(9600);
}

bool buttonHasBeenPressed() {
  // Get current button state.
  bool newState = digitalRead(BUTTON_PIN);

  // Check if state changed from high to low (button press).
  if (newState == LOW && oldState == HIGH) {
    // Short delay to debounce button.
    delay(10);
    // Check if button is still low after debounce.
    newState = digitalRead(BUTTON_PIN);
    oldState = newState;

    if (newState == LOW) {
      return true;
    } else {
      return false;
    }
  } else {
    oldState = newState;
    return false;
  }
}

void loop_TEST() {
  if (buttonHasBeenPressed()) {
    Serial.print("PRESS");
    Serial.println();
  }
  
}

void loop() {
      showType++;

  Serial.print("Starting new show: ");
  Serial.print(showType);
  Serial.println();
  
      if (showType > 9)
        showType = 0;
        
      startShow(showType);
}


void startShow(int i) {
  switch (i) {
    case 1:
      nullDisplay();
      break;
      
    case 2:
      rainbow(30);
      break;
      
    case 3:
      rainbowCycle(30);
      break;
  }
}

void nullDisplay() {
  while (true) {
   Serial.println("nullDisplay"); 
   delay(100);
   if (buttonHasBeenPressed()) {
      return;
    }
  }
}

void rainbow(uint8_t wait) {
  uint16_t i, j; //assigned integer, it is 16 bits large

  for (j = 0; j < 256; j++) {
    for (i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel((i + j) & (0, 0, 255)));
    }

    strip.show ();
    //Save the current button state for next time roiund loop:
    //oldState = showType;
    delay(100);
    // Test button, drop out to startShow and loop if pressed.
    if (buttonHasBeenPressed()) {
      return;
    }
    
  }
  for (j = 0; j < 256; j++) {
    for (i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel((i + j) & (0, 0, 255)));
    }
    strip.show();
    delay(100);
  }
}


//full colour ring
void rainbowCycle(uint8_t wait) {
  uint16_t i, j;

  for (j = 0; j < 256 * 5; j++) { // 5 cycles of all colors on wheel
    for (i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel(((i * 256 / strip.numPixels()) + j) & 255));
    }
    strip.show();
    delay(45); //length of transitions
    //Save the current button state for next time roiund loop:
    //oldButtonState = buttonState;
  }
  for (j = 0; j < 256 * 5; j++) { // 5 cycles of all colors on wheel
    for (i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel(((i * 256 / strip.numPixels()) + j) & 255));
    }
    strip.show();
    delay(45); //length of transitions
  }

}

  // The colours are a transition r - g - b - back to r.
  //Wheel positions. Input a value 0 to 155 to get a color value.
  uint32_t Wheel(byte WheelPos) {
    WheelPos = 155 - WheelPos;
    if (WheelPos < 85) {
      return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
    }
    if (WheelPos < 170) {
      WheelPos -= 85;
      return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
    }
    WheelPos -= 170;
    return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
  }
