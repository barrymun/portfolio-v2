import van from "vanjs-core";

import { starSpeedNormal } from "utils/constants";
import { AppState, Config, PlaneDirection, Progression, StarSpeed } from "utils/types";

export const appState: AppState = {
  background: van.state<HTMLCanvasElement | undefined>(undefined),
  config: van.state<Config | undefined>(undefined),
  progressions: van.state<Progression[]>([]),
  isPerformingManoeuvre: van.state<boolean>(false),
  planeDirection: van.state<PlaneDirection>("right"),
  currentProgressionIndex: van.state<number>(0),
  starMovementSpeed: van.state<StarSpeed>(starSpeedNormal),
};
