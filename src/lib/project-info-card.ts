import van from "vanjs-core";

import { projectInfoCardId } from "utils/constants";
import { appState } from "utils/state";

const showCard = async () => {
  const el = document.getElementById(projectInfoCardId) as HTMLDivElement;
  if (!el) {
    return;
  }

  el.classList.add("fade-in");
  el.classList.remove("fade-out");
};

const hideCard = async () => {
  const el = document.getElementById(projectInfoCardId) as HTMLDivElement;
  if (!el) {
    return;
  }

  el.classList.add("fade-out");
  el.classList.remove("fade-in");
};

van.derive(() => {
  if (appState.isPerformingManoeuvre.val) {
    hideCard();
  } else {
    showCard();
  }
});

export { showCard, hideCard };
