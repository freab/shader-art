import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });

// Colors

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneBufferGeometry(10, 10, 32, 32);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    u_resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    u_time: { value: 0.0 },
    u_freq: { value: 1.5 },
    u_speed: { value: 0.4 },
    u_clearity: { value: 8.0 },
    u_patern: { value: 5.0 },
    u_position: { value: 2.0 },
    u_miror: { value: 0.5 },
  },
});
gui
  .add(material.uniforms.u_freq, "value")
  .min(1.0)
  .max(4)
  .step(0.01)
  .name("frequency");
gui
  .add(material.uniforms.u_speed, "value")
  .min(0)
  .max(4)
  .step(0.01)
  .name("speed");
gui
  .add(material.uniforms.u_miror, "value")
  .min(0)
  .max(4)
  .step(0.01)
  .name("mirors");
gui
  .add(material.uniforms.u_clearity, "value")
  .min(0)
  .max(50)
  .step(1)
  .name("sharpness");
gui
  .add(material.uniforms.u_patern, "value")
  .min(1)
  .max(10)
  .step(0.1)
  .name("repitition");
gui
  .add(material.uniforms.u_position, "value")
  .min(-2)
  .max(4)
  .step(0.01)
  .name("position");
// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enableRotate = false;
controls.enablePan = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const Clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = Clock.getElapsedTime();
  // Update controls
  controls.update();
  //   update materials
  material.uniforms.u_time.value = elapsedTime;
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
