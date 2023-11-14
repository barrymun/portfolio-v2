import van from "vanjs-core";

import { AppState, Config, PlaneDirection, Progression } from "utils/types";

export const appState: AppState = {
  config: van.state<Config | undefined>(undefined),
  progressions: van.state<Progression[]>([]),
  isPerformingManoeuvre: van.state<boolean>(false),
  planeDirection: van.state<PlaneDirection>("right"),
};
