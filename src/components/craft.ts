import van from "vanjs-core";

import { appState } from "utils/state";

const { div } = van.tags;

export const Craft = () => {
  return div(
    {
      class: "craft",
    },
    () => div(appState.config.val && appState.config.val.renderer.domElement),
  );
};
