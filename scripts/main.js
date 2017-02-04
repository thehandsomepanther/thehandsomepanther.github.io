var scatterPlot = new THREE.Object3D();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);

var renderer = new THREE.WebGLRenderer({antialias: true});
var w = document.body.clientWidth;
var h = document.body.clientHeight;
renderer.setSize(w, h);
document.getElementById("three").appendChild(renderer.domElement);

renderer.setClearColor(0xf1f1f1, 1.0);

var camera = new THREE.PerspectiveCamera( 45, w/h, 1, 1000 );
camera.position.z = 250;
camera.position.x = 0;
camera.position.y = 150;

var scatterPlot = new THREE.Object3D();
scatterPlot.position.z = 30
scatterPlot.rotation.y = -0.5;

var axisLength = 100
var axes = [
  {
    axis: 'x',
    name: 'design'
  },{
    axis: 'y',
    name: 'code'
  },{
    axis: 'z',
    name: 'research'
  },
];

var lineGeo = new THREE.Geometry();
var lineMat = new THREE.LineBasicMaterial({color: 0x999999, linewidth: 1});

for (var i in axes) {
  lineGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  lineGeo.vertices.push(new THREE.Vector3(
    i == 0 ? axisLength : 0,
    i == 1 ? axisLength : 0,
    i == 2 ? axisLength : 0
  ))
  var line = new THREE.Line(lineGeo, lineMat);
  line.type = THREE.Lines;
  scatterPlot.add(line);
}

var axisLabel;
for (var i in axes) {
  axisLabel = createText2D(axes[i].name);
  axisLabel.position[axes[i].axis] = axisLength;
  axisLabel.position.y += 3;
  scatterPlot.add(axisLabel);

  axisLabel = createText2D(axes[i].name);
  axisLabel.position[axes[i].axis] = axisLength;
  axisLabel.rotation.y = Math.PI;
  axisLabel.position.y += 3;
  scatterPlot.add(axisLabel);
}

var pointGeo = new THREE.Geometry();
var pointMat = new THREE.PointsMaterial({color: 0x111111, size: 2});
for (var p of projects) {
  pointGeo.vertices.push(new THREE.Vector3(
    p.design * axisLength,
    p.code * axisLength,
    p.research * axisLength
  ));
  pointGeo.colors.push(new THREE.Color(0x111111))

  var title = createText2D(p.title);
  title.position.x = p.design * axisLength;
  title.position.y = p.code * axisLength + 3;
  title.position.z = p.research * axisLength;
  scatterPlot.add(title);

  title = createText2D(p.title);
  title.position.x = p.design * axisLength;
  title.position.y = p.code * axisLength + 3;
  title.position.z = p.research * axisLength;
  title.rotation.y = Math.PI;
  scatterPlot.add(title);
}

var points = new THREE.Points(pointGeo, pointMat);
scatterPlot.add(points);
scene.add(scatterPlot);
renderer.render(scene, camera);

function createText2D(text, color, font, size, segW, segH) {
  var canvas = createTextCanvas(text, color, font, size);
  var plane = new THREE.PlaneGeometry(canvas.width, canvas.height, segW, segH);
  var tex = new THREE.Texture(canvas);
  tex.needsUpdate = true;
  var planeMat = new THREE.MeshBasicMaterial({
    map: tex, color: 0xffffff, transparent: true
  });
  var mesh = new THREE.Mesh(plane, planeMat);
  mesh.scale.set(0.25, 0.25, 0.25);
  mesh.doubleSided = true;
  return mesh;
}

function createTextCanvas(text, color, font, size) {
  size = size || 12;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var fontStr = (size + 'px ') + (font || 'Menlo');
  ctx.font = fontStr;
  var w = ctx.measureText(text).width;
  var h = Math.ceil(size);
  canvas.width = w;
  canvas.height = h+3;
  ctx.font = fontStr;
  // ctx.fillStyle = color || 0xf1f1f1;
  ctx.fillStyle = 0xf1f1f1
  ctx.fillText(text, 0, size);
  return canvas;
}

var paused = false;
var last = new Date().getTime();
var down = false;
var sx = 0, sy = 0;
window.onmousedown = function (ev) {
  down = true; sx = ev.clientX; sy = ev.clientY;
};
window.onmouseup = function(){ down = false; };
window.onmousemove = function(ev) {
  if (down) {
    var dx = ev.clientX - sx;
    var dy = ev.clientY - sy;
    scatterPlot.rotation.y += dx*0.01;
    camera.position.y += dy;
    sx += dx;
    sy += dy;
  }
}
var animating = false;
window.ondblclick = function() { animating = !animating; };
function animate(t) {
  if (!paused) {
    last = t;
    if (animating) {
      var v = pointGeo.vertices;
      for (var i=0; i<v.length; i++) {
        var u = v[i];
        u.angle += u.speed * 0.01;
        u.position.x = Math.cos(u.angle)*u.radius;
        u.position.z = Math.sin(u.angle)*u.radius;
      }
      pointGeo.__dirtyVertices = true;
    }
    renderer.clear();
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  window.requestAnimationFrame(animate, renderer.domElement);
};
animate(new Date().getTime());
onmessage = function(ev) {
  paused = (ev.data == 'pause');
};
