function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);
}

function draw() {
  var axisLength = 200
  background('#111')
  orbitControl()
  ambientLight('#ffffff');
  rotateX(frameCount * -0.005 + HALF_PI * 1/2);
  rotateY(frameCount * -0.005 + HALF_PI * 7/4);

  push();

  ambientMaterial('#0033cc');
  translate(0, -axisLength/2, 0)
  cylinder(1, axisLength);

  pop();
  push();
  rotateZ(HALF_PI)
  translate(0, -axisLength/2, 0)
  ambientMaterial(255, 45, 86);
  cylinder(1, axisLength);

  pop();
  rotateX(HALF_PI)
  translate(0, axisLength/2, 0)
  ambientMaterial(13, 255, 115);
  cylinder(1, axisLength);
  push();
}
