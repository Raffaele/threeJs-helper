import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 30, 30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;

const axesHelper = new THREE.AxesHelper(15);
scene.add(axesHelper);

const gridHelperX = new THREE.GridHelper(30, 10, 0xff0000, 0xff0000);
gridHelperX.rotation.z = Math.PI / 2;
gridHelperX.visible = false;
scene.add(gridHelperX);

const gridHelperY = new THREE.GridHelper(30);
gridHelperY.visible = false;
scene.add(gridHelperY);

const gridHelperZ = new THREE.GridHelper(30, 10, 0x0000ff, 0x0000ff);
gridHelperZ.rotation.x = Math.PI / 2;
gridHelperZ.visible = false;
scene.add(gridHelperZ);

const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
cube.add(new THREE.AxesHelper(3));
cube.position.set(0, 5, 0);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

const gui = new dat.GUI();
const params = {
  isAxesHelperVisible: true,
  isGridHelperXVisible: false,
  isGridHelperYVisible: false,
  isGridHelperZVisible: false,
  isCubeAxesHelperVisible: true,
  isCubeVisible: true,
  cubeX: cube.position.x,
  cubeY: cube.position.y,
  cubeZ: cube.position.z,
};

gui.add(params, 'isAxesHelperVisible').name('Axes Helper').onChange((value: boolean) => {
  axesHelper.visible = value;
});

gui.add(params, 'isGridHelperXVisible').name('Grid Helper X').onChange((value: boolean) => {
  gridHelperX.visible = value;
});

gui.add(params, 'isGridHelperYVisible').name('Grid Helper Y').onChange((value: boolean) => {
  gridHelperY.visible = value;
});

gui.add(params, 'isGridHelperZVisible').name('Grid Helper Z').onChange((value: boolean) => {
  gridHelperZ.visible = value;
});

const cubeFolder = gui.addFolder('Cube Controls');

cubeFolder.add(params, 'isCubeAxesHelperVisible').name('Cube Axes Helper').onChange((value: boolean) => {
  cube.children[0].visible = value;
});

cubeFolder.add(params, 'isCubeVisible').name('Cube').onChange((value: boolean) => {
  cube.visible = value;
});

cubeFolder.add(params, 'cubeX', -10, 10).name('Cube X').onChange((value: number) => {
  cube.position.x = value;
});

cubeFolder.add(params, 'cubeY', -10, 10).name('Cube Y').onChange((value: number) => {
  cube.position.y = value;
});

cubeFolder.add(params, 'cubeZ', -10, 10).name('Cube Z').onChange((value: number) => {
  cube.position.z = value;
});

setTimeout(() => alert('Zoom and drag to see the scene from different angles. Use the GUI to toggle helpers and move the cube.'), 1000);

