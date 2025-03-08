import * as THREE from "three";
import { State } from "vanjs-core";

import { starSpeedFast, starSpeedNormal } from "utils/constants";

export interface Config {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  craft: THREE.Group;
  dock: THREE.Group;
}

export type CraftDirection = "right" | "left";

export type CraftManoeuvre = "pitch-up-down" | "bank-left-right" | "backflip";

export type Project = {
  url: string;
  title: string;
  description: string;
  checkpoint: CraftManoeuvre;
};

export type Progression = {
  checkpoint: number;
  manoeuvre: CraftManoeuvre;
  project: Project;
};

export type Star = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
};

export type StarSpeed = typeof starSpeedNormal | typeof starSpeedFast;

export interface AppState {
  isInteractive: State<boolean>;
  background: State<HTMLCanvasElement | undefined>;
  config: State<Config | undefined>;
  isPerformingManoeuvre: State<boolean>;
  craftDirection: State<CraftDirection>;
  progressions: State<Progression[]>;
  currentProgressionIndex: State<number>;
  starMovementSpeed: State<StarSpeed>;
}

export type IconProps = {
  width?: number;
  height?: number;
};
