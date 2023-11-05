import van from "vanjs-core";

import { appState } from "utils/state";

const { div } = van.tags;

export const Train = () => {
  van.derive(() => {
    console.log(appState.config.val);
  });

  return div(
    {
      class: "train",
    },
    () => div(appState.config.val && appState.config.val.renderer.domElement),
  );
};
