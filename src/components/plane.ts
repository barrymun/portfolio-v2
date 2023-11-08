import van from "vanjs-core";

import { appState } from "utils/state";

const { div } = van.tags;

export const Plane = () => {
  // van.derive(() => {
  //   console.log(appState.config.val);
  // });

  return div(
    {
      class: "plane",
    },
    () => div(appState.config.val && appState.config.val.renderer.domElement),
  );
};
