import van from "vanjs-core";

import { AppState } from "utils/types";

export const appState: AppState = {
  placeholder: van.state<string | undefined>(undefined),
};
