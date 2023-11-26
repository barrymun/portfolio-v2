import van from "vanjs-core";

import { appState } from "utils/state";

const { div } = van.tags;

export const Background = () => {
  return div(
    {
      class: () => (appState.isInteractive.val ? "background" : "hidden"),
    },
    () => div(appState.background.val && appState.background.val),
  );
};
