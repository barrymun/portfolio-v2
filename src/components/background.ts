import van from "vanjs-core";

import { appState } from "utils/state";

const { div } = van.tags;

export const Background = () => {
  return div(
    {
      class: "background",
    },
    () => div(appState.background.val && appState.background.val),
  );
};
