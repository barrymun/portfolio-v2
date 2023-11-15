import * as THREE from "three";
import { State } from "vanjs-core";

export interface Config {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.Renderer;
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
  background: State<HTMLCanvasElement | undefined>;
  config: State<Config | undefined>;
  isPerformingManoeuvre: State<boolean>;
  planeDirection: State<PlaneDirection>;
  progressions: State<Progression[]>;
  currentProgressionIndex: State<number>;
}

export type Star = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
};

export type IconProps = {
  width?: number;
  height?: number;
};
