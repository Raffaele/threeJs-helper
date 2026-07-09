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

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();


