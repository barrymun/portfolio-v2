import * as THREE from "three";
import { State } from "vanjs-core";

export interface Config {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.Renderer;
  background: THREE.Mesh;
  train: THREE.Mesh;
}

export interface AppState {
  config: State<Config | undefined>;
}
