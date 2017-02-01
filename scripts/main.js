function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
  var axisLength = 200
  background('#111')
  ambientLight('#ffffff');
  rotateZ(frameCount * -0.001);
  rotateX(frameCount * -0.001);
  rotateY(frameCount * -0.001);
  cylinder(1, axisLength);
  push();

  ambientMaterial('#0033cc');
  cylinder(1, axisLength);

  pop();
  push();
  rotateZ(HALF_PI)
  translate(-axisLength/2, axisLength/2, 0)
  ambientMaterial(255, 45, 86);
  cylinder(1, axisLength);

  pop();
  rotateX(HALF_PI)
  translate(0, axisLength/2, axisLength/2)
  ambientMaterial(13, 255, 115);
  cylinder(1, axisLength);
  push();
}
