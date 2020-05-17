var socket; //socket variable

function setup () {
    createCanvas (300, 300);
    background (51);
    
    socket = io.connect('http://localhost:3000');
}

function draw () {
    noStroke ();
    fill(255);
    ellipse (mouseX, mouseY, 60, 60);
}


