import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

import { getCheckpoint } from "utils/helpers";
import { appState } from "utils/state";
import { CraftManoeuvre } from "utils/types";

import jetGLB from "assets/img/jet.glb";
import dockGLB from "assets/img/dock.glb";

let scene: THREE.Scene | undefined;
let ambientLight: THREE.AmbientLight | undefined;
let camera: THREE.PerspectiveCamera | undefined;
let pointLight: THREE.PointLight | undefined;
let renderer: THREE.WebGLRenderer | undefined;
let craft: THREE.Group | undefined;
let dock: THREE.Group | undefined;

// load
// TODO: might need to consider object.renderOrder when loading
const gltfLoader: GLTFLoader = new GLTFLoader();
gltfLoader.load(jetGLB, (gltf: GLTF) => {
  const object = gltf.scene;
  object.traverse((c) => {
    c.castShadow = true;
  });

  object.scale.setScalar(0.2);
  // defaults for facing right
  object.rotation.x = (-Math.PI / 180) * 90;
  object.rotation.y = (Math.PI / 180) * 90;
  object.rotation.z = (Math.PI / 180) * 90;
  // default position
  object.position.z = 1;

  craft = object;
  scene?.add(craft);
});

gltfLoader.load(dockGLB, (gltf: GLTF) => {
  const object = gltf.scene;
  object.traverse((c) => {
    c.castShadow = true;
  });

  object.scale.setScalar(1.0);
  // defaults for facing right
  object.rotation.x = 0;
  object.rotation.y = (-Math.PI / 180) * 90;
  // default position
  object.position.x = 1;
  object.position.z = -5;

  dock = object;
  scene?.add(dock);
});

const setupRenderer = () => {
  scene = new THREE.Scene();
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
  pointLight.position.set(50, 50, 50);
  camera.add(pointLight);
  // scene.add(pointLight);

  camera.updateProjectionMatrix();
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setClearColor(0x000000, 0); // transparent
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const setupProgression = () => {
  // TODO: rework based on the number of projects added
  const checkpoints: CraftManoeuvre[] = ["pitch-up-down", "bank-left-right", "backflip"];

  const progressions = [];
  for (const checkpoint of checkpoints) {
    progressions.push({
      checkpoint: getCheckpoint(checkpoint),
      manoeuvre: checkpoint,
    });
  }
  appState.progressions.val = progressions;
  appState.currentProgressionIndex.val = 0;
};

export const initConfig = async () => {
  setupRenderer();
  setupProgression();

  while (!craft || !dock) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (!scene || !camera || !renderer || !craft || !dock) {
    throw new Error("Something went wrong in the config");
  }

  appState.config.val = {
    scene,
    camera,
    renderer,
    craft,
    dock,
  };
};
