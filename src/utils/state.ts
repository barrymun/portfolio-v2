import van from "vanjs-core";

import { AppState, Config, PlaneDirection, Progression } from "utils/types";

export const appState: AppState = {
  background: van.state<HTMLCanvasElement | undefined>(undefined),
  config: van.state<Config | undefined>(undefined),
  progressions: van.state<Progression[]>([]),
  isPerformingManoeuvre: van.state<boolean>(false),
  planeDirection: van.state<PlaneDirection>("right"),
  currentProgressionIndex: van.state<number>(0),
};
