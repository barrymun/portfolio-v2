import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

import { appState } from "utils/state";

let scene: THREE.Scene | undefined;
let ambientLight: THREE.AmbientLight | undefined;
let camera: THREE.PerspectiveCamera | undefined;
let pointLight: THREE.PointLight | undefined;
let renderer: THREE.WebGLRenderer | undefined;
let background: THREE.Mesh | undefined;
// let train: THREE.Mesh | undefined;
let train: THREE.Group | undefined;
let isLoaded: boolean = false;

const gltfLoader: GLTFLoader = new GLTFLoader();
gltfLoader.load("/train.glb", (gltf: GLTF) => {
  const object = gltf.scene;
  object.traverse((c) => {
    c.castShadow = true;
  });

  object.scale.multiplyScalar(0.3);
  // object.position.y = -4;
  // object.position.z = -1;

  train = object;
  // train.rotation.y = Math.PI / 2; // facing forward
  train.rotation.y = (Math.PI * 3) / 2 - 0.5; // facing right
  train.rotation.x = 0.4;
  scene?.add(object);
  isLoaded = true;
});

const setupRenderer = () => {
  scene = new THREE.Scene();
  // ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  ambientLight = new THREE.AmbientLight(new THREE.Color("hsl(0, 0%, 100%)"), 1.0);
  scene.add(ambientLight);

  const directionalLightBack = new THREE.DirectionalLight(new THREE.Color("hsl(0, 0%, 100%)"), 1.0);
  directionalLightBack.position.set(10, 10, 10);
  scene.add(directionalLightBack);

  const directionalLightFront = new THREE.DirectionalLight(new THREE.Color("hsl(0, 0%, 100%)"), 1.0);
  directionalLightFront.position.set(-10, 10, -10);
  scene.add(directionalLightFront);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  scene.add(camera);
  pointLight = new THREE.PointLight(0xffffff, 0.8);
  camera.add(pointLight);
  camera.updateProjectionMatrix();
  renderer = new THREE.WebGLRenderer({ alpha: true });
  // renderer.setClearColor(0xff0000, 1); // red
  renderer.setClearColor(0xffffff, 1); // white
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const setupBackground = () => {
  const geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
  const texture = new THREE.TextureLoader().load("background.jpeg"); // Replace with the path to your texture
  const material = new THREE.MeshBasicMaterial({ map: texture });
  background = new THREE.Mesh(geometry, material);
  scene?.add(background);
};

// const setupTrain = () => {
//   const geometry = new THREE.BoxGeometry();
//   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//   train = new THREE.Mesh(geometry, material);
//   scene?.add(train);
// };

export const initConfig = async () => {
  setupRenderer();
  setupBackground();
  // setupTrain();

  while (!isLoaded) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (!scene || !camera || !renderer || !background || !train) {
    throw new Error("Something went wrong in the config");
  }

  camera.position.z = 5;
  background.position.z = -10; // Ensure the background is behind the train
  train.position.z = 0;

  // background.position.set(0, 0, 0);  // Set initial position of background
  // train.position.set(0, 0, 1);  // Set initial position of train slightly in front of the background

  appState.config.val = {
    scene,
    camera,
    renderer,
    background,
    train,
  };
};
