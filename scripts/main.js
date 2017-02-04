function setup() {
  var canvas = createCanvas(windowWidth/2, windowHeight, WEBGL);
  canvas.parent('p5');
  var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);
}

var projects = [
  {
    title: "something",
    design: .3,
    code: .4,
    research: .5
  },
  {
    title: "else",
    design: .7,
    code: .8,
    research: .2
  },
  {
    title: "another",
    design: .1,
    code: .5,
    research: .75
  },
]

var _white = "#ffffff";
var _black = "#111111";
var _offwhite = "#f1f1f1";
var _blue = '#0033cc';
var _red = '#FF2D56';
var _green = '#0DFF73';

function draw() {
  var axisLength = 250;
  background(_black);
  orbitControl();
  ambientLight(_white);

  rotateX(frameCount * -0.005 + HALF_PI * 1/2);
  rotateY(frameCount * -0.005 + HALF_PI * 7/4);

  push();
  ambientMaterial(_offwhite);
  translate(0, -axisLength/2, 0)
  cylinder(1, axisLength);

  pop();
  push();
  rotateZ(HALF_PI)
  translate(0, -axisLength/2, 0)
  ambientMaterial(_offwhite);
  cylinder(1, axisLength);

  pop();
  push();
  rotateX(HALF_PI)
  translate(0, axisLength/2, 0)
  ambientMaterial(_offwhite);
  cylinder(1, axisLength);

  for (var p of projects) {
    pop();
    push();
    translate(
      -axisLength * p.design,
      -axisLength * p.code,
      -axisLength * p.research
    )
    ambientMaterial(_offwhite);
    sphere(2)
    fill(_offwhite);
    p5.text("something", 50, 10);
  }
}

function plot(project) {

}
