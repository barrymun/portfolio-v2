import * as THREE from "three";
import { State } from "vanjs-core";

import { starSpeedFast, starSpeedNormal } from "utils/constants";

export interface Config {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  plane: THREE.Group;
  dock: THREE.Group;
}

export type PlaneDirection = "right" | "left";

export type PlaneManoeuvre = "pitch-up-down" | "bank-left-right" | "backflip";

export type Progression = {
  checkpoint: number;
  manoeuvre: PlaneManoeuvre;
};

export type Star = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
};

export type StarSpeed = typeof starSpeedNormal | typeof starSpeedFast;

export interface AppState {
  background: State<HTMLCanvasElement | undefined>;
  config: State<Config | undefined>;
  isPerformingManoeuvre: State<boolean>;
  planeDirection: State<PlaneDirection>;
  progressions: State<Progression[]>;
  currentProgressionIndex: State<number>;
  starMovementSpeed: State<StarSpeed>;
}

export type IconProps = {
  width?: number;
  height?: number;
};
