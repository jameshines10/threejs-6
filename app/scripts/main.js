/*global THREE:false */
/*global requestAnimationFrame:false*/
'use strict';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);

document.body.appendChild(renderer.domElement);

var pyramid = new THREE.CylinderGeometry(0, 20, 30, 4, 1, false);

for(var face in pyramid.faces){
  if(pyramid.faces[face] instanceof THREE.Face4){
    pyramid.faces[face].vertexColors[0] = new THREE.Color(0xff0000);
    pyramid.faces[face].vertexColors[1] = new THREE.Color(0x00ff00);
    pyramid.faces[face].vertexColors[2] = new THREE.Color(0x0000ff);
    pyramid.faces[face].vertexColors[3] = new THREE.Color(0xff0000);
  }  
}

var pyramidMaterial = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
})

var cube = new THREE.CubeGeometry(20, 20, 20);

var cubeMaterials = [
    new THREE.MeshBasicMaterial({color: 0xff0000}),
    new THREE.MeshBasicMaterial({color: 0x00ff00}),
    new THREE.MeshBasicMaterial({color: 0x0000ff}),
    new THREE.MeshBasicMaterial({color: 0xffff00}),
    new THREE.MeshBasicMaterial({color: 0x00ffff}),
    new THREE.MeshBasicMaterial({color: 0xffffff})
];

cube.faces[0].materialIndex = 0;
cube.faces[1].materialIndex = 1;
cube.faces[2].materialIndex = 2;
cube.faces[3].materialIndex = 3;
cube.faces[4].materialIndex = 4;
cube.faces[5].materialIndex = 5;

var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

var pyramidMesh = new THREE.Mesh(pyramid, pyramidMaterial);
var cubeMesh = new THREE.Mesh(cube, cubeMaterial);

pyramidMesh.position.x = -25;
cubeMesh.position.x = 25;
cubeMesh.rotation.z = 0.5;

scene.add(pyramidMesh);
scene.add(cubeMesh);

camera.position.z = 70;

var render = function () {
    requestAnimationFrame(render);

    pyramidMesh.rotation.y += 0.008;
    cubeMesh.rotation.y -= 0.008;

    renderer.render(scene, camera);
};

requestAnimationFrame(render);

render();