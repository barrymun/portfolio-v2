import van from "vanjs-core";

import { starSpeedNormal } from "utils/constants";
import { AppState, Config, CraftDirection, Progression, StarSpeed } from "utils/types";

export const appState: AppState = {
  isInteractive: van.state<boolean>(false),
  background: van.state<HTMLCanvasElement | undefined>(undefined),
  config: van.state<Config | undefined>(undefined),
  progressions: van.state<Progression[]>([]),
  isPerformingManoeuvre: van.state<boolean>(false),
  craftDirection: van.state<CraftDirection>("right"),
  currentProgressionIndex: van.state<number>(0),
  starMovementSpeed: van.state<StarSpeed>(starSpeedNormal),
};
