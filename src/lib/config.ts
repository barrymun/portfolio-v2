import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

import { getCheckpoint } from "utils/helpers";
import { appState } from "utils/state";

let scene: THREE.Scene | undefined;
let ambientLight: THREE.AmbientLight | undefined;
let camera: THREE.PerspectiveCamera | undefined;
let pointLight: THREE.PointLight | undefined;
let renderer: THREE.WebGLRenderer | undefined;
let background: THREE.Mesh | undefined;
let plane: THREE.Group | undefined;
let isLoaded: boolean = false;

const gltfLoader: GLTFLoader = new GLTFLoader();
gltfLoader.load("/jet.glb", (gltf: GLTF) => {
  const object = gltf.scene;
  object.traverse((c) => {
    c.castShadow = true;
  });

  object.scale.setScalar(0.2);
  object.rotation.x = (-Math.PI / 180) * 90;
  object.rotation.z = (Math.PI / 180) * 90;
  object.rotation.y = (Math.PI / 180) * 90;

  plane = object;
  scene?.add(plane);
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
  // camera.add(pointLight);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

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

const setupProgression = () => {
  // TODO: rework based on the number of projects added
  const checkpoints: number[] = [
    getCheckpoint("pitch-up-down"),
    getCheckpoint("bank-left-right"),
    getCheckpoint("backflip"),
  ];

  appState.progressions.val = [
    {
      checkpoint: checkpoints[0],
      manoeuvre: "pitch-up-down",
    },
    {
      checkpoint: checkpoints[1],
      manoeuvre: "bank-left-right",
    },
    {
      checkpoint: checkpoints[2],
      manoeuvre: "backflip",
    },
  ];
  appState.currentProgressionIndex.val = 0;
};

export const initConfig = async () => {
  setupRenderer();
  setupBackground();
  setupProgression();

  while (!isLoaded) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (!scene || !camera || !renderer || !background || !plane) {
    throw new Error("Something went wrong in the config");
  }

  camera.position.z = 5;
  background.position.z = -10; // Ensure the background is behind the plane
  plane.position.z = 0;

  // background.position.set(0, 0, 0);  // Set initial position of background
  // plane.position.set(0, 0, 1);  // Set initial position of plane slightly in front of the background

  appState.config.val = {
    scene,
    camera,
    renderer,
    background,
    plane,
  };
};
