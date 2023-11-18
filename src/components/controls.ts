import van from "vanjs-core";

import { performManoeuvre, turnPlane } from "lib/plane";
import { appState } from "utils/state";

// import ArrowNarrowLeftSrc from "@tabler/icons/arrow-narrow-left.svg";
// import ArrowNarrowRightSrc from "@tabler/icons/arrow-narrow-right.svg";

const { button, div, img } = van.tags;

export const Controls = () => {
  const handlePrevious = async () => {
    if (appState.planeDirection.val === "right") {
      await turnPlane();
    }
    if (appState.currentProgressionIndex.val > 0) {
      appState.planeDirection.val = "left";
      appState.currentProgressionIndex.val -= 1;
      performManoeuvre();
    }
  };

  const handleNext = async () => {
    if (appState.planeDirection.val === "left") {
      await turnPlane();
    }
    if (appState.currentProgressionIndex.val < appState.progressions.val.length) {
      appState.planeDirection.val = "right";
      performManoeuvre();
      appState.currentProgressionIndex.val += 1;
    }
  };

  return div(
    {
      class: "controls",
    },
    button(
      {
        onclick: handlePrevious,
        disabled: () => appState.currentProgressionIndex.val === 0 || appState.isPerformingManoeuvre.val,
      },
      img({
        // src: ArrowNarrowLeftSrc,
      }),
    ),
    button(
      {
        onclick: handleNext,
        disabled: () =>
          appState.currentProgressionIndex.val === appState.progressions.val.length ||
          appState.isPerformingManoeuvre.val,
      },
      img({
        // src: ArrowNarrowRightSrc,
      }),
    ),
  );
};
