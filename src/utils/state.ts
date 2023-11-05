import van from "vanjs-core";

import { AppState, Config } from "utils/types";

export const appState: AppState = {
  config: van.state<Config | undefined>(undefined),
};
