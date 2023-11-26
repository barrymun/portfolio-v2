import van from "vanjs-core";

import { appState } from "utils/state";

const { div } = van.tags;

export const Scene = () => {
  return div(
    {
      class: () => (appState.isInteractive.val ? "scene" : "hidden"),
    },
    () => div(appState.config.val && appState.config.val.renderer.domElement),
  );
};
