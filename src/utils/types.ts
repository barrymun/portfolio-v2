import * as THREE from "three";
import { State } from "vanjs-core";

export interface Config {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.Renderer;
  background: THREE.Mesh;
  plane: THREE.Group;
}

export type ScrollDirection = "down" | "up";

export type PlaneDirection = "right" | "left";

export type PlaneManoeuvre = "pitch-up-down" | "bank-left-right" | "backflip";

export type Progression = {
  checkpoint: number;
  manoeuvre: PlaneManoeuvre;
};

export interface AppState {
  config: State<Config | undefined>;
  isPerformingManoeuvre: State<boolean>;
  planeDirection: State<PlaneDirection>;
  progressions: State<Progression[]>;
}
