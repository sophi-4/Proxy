let globalColour = {
    h: 0, s: 0, v: 0
};

//kaleidoscope effect code
let symmetry = 6;
let angle = 360/symmetry;
let saveButton;
let clearButton;
let slider;
//offset start at 0
let xoff = 0;

function setup() {
  createCanvas (600, 600);
  angleMode(DEGREES);
  //background(255);
  background(0);

  saveButton = createButton('save');
  saveButton.mousePressed(savePattern);
  clearButton = createButton('clear');
  clearButton.mousePressed(clearCanvas);
  //starts at 1 to 50- position 4 with increments of .1
  slider = createSlider (1,25,4, 0.1);
  colorMode(HSB,255,255,255);
}

function savePattern(){
  save('savePattern.png');
}

function clearCanvas(){
  background (0);
}

function draw() {
  translate(width/2, height/2);

  //fixing the issue of canvas drawing when mouse is pressed outside the canvas
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
  let mx = mouseX - width/2;
  let my = mouseY - height/2;
  let pmx = pmouseX - width/2;
  let pmy = pmouseY - height/2;

    if (mouseIsPressed) {
      //the hue value
      // let hu = noise(xoff) * 255;
      // xoff += 0.01; //x offset change over time

      let hu = map (sin(xoff), -1,1,0,255);
      xoff += 1;
      stroke(hu, 255, 255,100); //saturation + brightness
      let angle = 360/symmetry;
      //rotate 12 times not 6
      for (let i= 0; i<symmetry; i++) {
        rotate(angle);
        //speed of mouse increase line weight by speed of drawing
        //let d = dist(mx, my, pmx,pmy);
        //let sw = map(d, 0, 8, 8, 1);
        let sw = slider.value();
        strokeWeight(sw);
        line(mx, my, pmx,pmy);
        push();
        scale(-1, 1);
        line(mx, my, pmx,pmy);
        pop();
      }
    }
  }
}

////Starter code
//function setup() {
//    createCanvas (500, 500);
//    background(0);
//}
//
//function draw() {
//    stroke(255);
//    ellipse(mouseX, mouseY, 60, 60);
//
//}


//var socket; //socket variable
//
//function setup () {
//    createCanvas (300, 300);
//    background (51);
//
//    socket = io.connect('http://localhost:3000');
//}
//
//function draw () {
//    noStroke ();
//    fill(255);
//    ellipse (mouseX, mouseY, 60, 60);
//}
