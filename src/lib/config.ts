import * as THREE from "three";

import { appState } from "utils/state";

let scene: THREE.Scene | undefined;
let camera: THREE.Camera | undefined;
let renderer: THREE.Renderer | undefined;
let background: THREE.Mesh | undefined;
let train: THREE.Mesh | undefined;

const setupRenderer = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const setupBackground = () => {
  const geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
  const texture = new THREE.TextureLoader().load("background.jpeg"); // Replace with the path to your texture
  const material = new THREE.MeshBasicMaterial({ map: texture });
  background = new THREE.Mesh(geometry, material);
  scene?.add(background);
};

const setupTrain = () => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  train = new THREE.Mesh(geometry, material);
  scene?.add(train);
};

export const initConfig = () => {
  setupRenderer();
  setupBackground();
  setupTrain();

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
