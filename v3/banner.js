// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;

let h = 400;
let w = document.body.offsetWidth;

/*function setup() {
  createCanvas(720, 400);
  current = createVector(0,0);
  previous = createVector(0,0);
};*/

function draw() {
  background(200);
  
  // If it's time for a new point
  if (millis() > next && painting) {

    // Grab mouse position      
    current.x = mouseX;
    current.y = mouseY;

    // New particle's force is based on mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);
    
    // Schedule next circle
    next = millis() + random(100);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for( var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

/*// Start it up
function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

// Stop
function mouseReleased() {
  painting = false;
}*/

// A Path is a list of particles
function Path() {
  this.particles = [];
  this.hue = random(100);
}

Path.prototype.add = function(position, force) {
  // Add a new particle with a position, force, and hue
  this.particles.push(new Particle(position, force, this.hue));
}

// Display plath
Path.prototype.update = function() {  
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}  

// Display plath
Path.prototype.display = function() {
  
  // Loop through backwards
  for (var i = this.particles.length - 1; i >= 0; i--) {
    // If we shold remove it
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    // Otherwise, display it
    } else {
      this.particles[i].display(this.particles[i+1]);
    }
  }

}  

// Particles along the path
function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;
}

Particle.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan--;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
  stroke(0, this.lifespan);
  fill(0, this.lifespan/2);    
  ellipse(this.position.x,this.position.y, 8, 8);    
  // If we need to draw a line
  if (other) {
    line(this.position.x, this.position.y, other.position.x, other.position.y);
  }
}


let num_points = document.body.offsetWidth / 10;
let margin = 100;

let dot_size = 5;

let d = 150;
let fallout = 8;

var random_x;
var random_y;

var lines_x;
var lines_y;

let teal1;
let teal2;

function setup() {

  //alert(document.getElementById("main_parallax").offsetHeight - 100);
  //document.getElementById("main_parallax").style.height = document.getElementById("main_parallax").offsetHeight - 50 + "px";

  w = document.body.offsetWidth;
  num_points = w / 10;

  createCanvas(w, h);
  
  teal1 = color(4, 95, 98);
  teal2 = color(3, 121, 113);

  
  random_x = [];
  random_y = [];
  
  for (var i = 0; i < num_points; i++) {
    random_x.push(random(w + margin) - margin/2);
    random_y.push(random(h + margin) - margin/2);
  }
  
  lines_x = [];
  lines_y = [];
  
  var index = 0;
  
  for (var i = 0; i < num_points; i++) {
    
    p1x = random_x[i];
    p1y = random_y[i];
    
    for (var j = 0; j < num_points; j++) {
      p2x = random_x[j];
      p2y = random_y[j];
      
      var kept = round(random(1) * fallout);
      
      if (distance(p1x, p1y, p2x, p2y) < d && (kept == 0)) {
          lines_x[index] = p1x;
          lines_x[index+1] = p2x;
          lines_y[index] = p1y;
          lines_y[index+1] = p2y;
        
          index += 2
      }
    }
  }
}

function draw() {
  background(teal1);
  
  var cx = mouseX;
  var cy = mouseY;
  
  stroke(255);
  
  for (var i = 0; i < num_points; i++) {
    
    
    var dist = distance(random_x[i], random_y[i], cx, cy)
    ellipse(random_x[i], random_y[i],  dot_size);
  }
  
  for (var i = 0; i < lines_x.length; i += 2) {
    line(lines_x[i], lines_y[i], lines_x[i+1], lines_y[i+1]);
  }
}

function distance(x1, y1, x2, y2) {
  return sqrt((x1 - x2)**2 + (y1 - y2)**2)
}

function resized() {
  setup();
}

window.onresize = resized;