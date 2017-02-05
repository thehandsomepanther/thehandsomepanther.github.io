var scatterPlot = new THREE.Object3D();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
var mouse = new THREE.Vector2();
var INTERSECTED;
var raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 3;

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

for (var i in axes) {
  var lineGeo = new THREE.Geometry();
  var lineMat = new THREE.LineBasicMaterial({color: 0x999999, linewidth: 1});

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

for (var p of projects) {
  var cubeGeo = new THREE.BoxGeometry(1, 1, 1);

  cubeGeo.translate(
    p.design * axisLength,
    p.code * axisLength,
    p.research * axisLength
  );
  cubeGeo.computeBoundingBox();
  cubeGeo.name = p.title;

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

  var cubeMat = new THREE.MeshBasicMaterial({color: 0x111111});
  var cube = new THREE.Mesh(cubeGeo, cubeMat);
  cube.name = p.title
  scatterPlot.add(cube);
}

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
  ctx.fillStyle = color || 0xf1f1f1;
  ctx.fillStyle = 0xf1f1f1
  ctx.fillText(text, 0, size);
  return canvas;
}

var paused = false;
var last = new Date().getTime();
var down = false;
var sx = 0, sy = 0;
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.onmousedown = function (ev) {
  down = true;
  sx = ev.clientX;
  sy = ev.clientY;
  animating = false;
};
window.onmouseup = function(){
  down = false;
  animating = true;
};
window.onmousemove = function(ev) {
  ev.preventDefault();
  if (down) {
    var dx = ev.clientX - sx;
    var dy = ev.clientY - sy;
    scatterPlot.rotation.y += dx*0.01;
    camera.position.y += dy;
    sx += dx;
    sy += dy;
  }

  mouse.x = ( ev.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -( ev.clientY / window.innerHeight ) * 2 + 1;
}
var animating = true;
window.ondblclick = function() {
  animating = !animating;
};
function animate(t) {
  if (!paused) {
    last = t;
    if (animating) {
      camera.position.x += 0.1;
    }
  }

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length) {
    console.log(intersects);
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED) {
        INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
      }
      INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			INTERSECTED.material.color.setHex( 0xff0000 );
    }
  } else {
		if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
		INTERSECTED = null;
	}

  renderer.clear();
  camera.lookAt(scene.position);
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate, renderer.domElement);
};
animate(new Date().getTime());
