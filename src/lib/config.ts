import * as THREE from "three";

import { appState } from "utils/state";

let scene: THREE.Scene | undefined;
let camera: THREE.Camera | undefined;
let renderer: THREE.Renderer | undefined;
let train: THREE.Mesh | undefined;

const setupRenderer = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer.domElement;
};

const setupTrain = () => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  train = new THREE.Mesh(geometry, material);
  scene?.add(train);
};

export const initConfig = () => {
  setupRenderer();
  setupTrain();

  if (!scene || !camera || !renderer || !train) {
    throw new Error("Something went wrong in the config");
  }

  camera.position.z = 5;

  appState.config.val = {
    scene,
    camera,
    renderer,
    train,
  };
};
