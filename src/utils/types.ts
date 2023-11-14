import * as THREE from "three";
import { State } from "vanjs-core";

export interface Config {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.Renderer;
  background: THREE.Mesh;
  plane: THREE.Group;
}

export interface AppState {
  config: State<Config | undefined>;
  isPerformingManoeuvre: State<boolean>;
}

export type ScrollDirection = "up" | "down";
