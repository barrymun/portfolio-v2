import van from "vanjs-core";

import { performManoeuvre, turnPlane } from "lib/plane";
import { appState } from "utils/state";

// import ArrowNarrowLeftSrc from "@tabler/icons/arrow-narrow-left.svg";
// import ArrowNarrowRightSrc from "@tabler/icons/arrow-narrow-right.svg";

const { button, div, img } = van.tags;

export const Controls = () => {
  const handlePrevious = async () => {
    // user needs to face left if going backwards
    if (appState.planeDirection.val === "right") {
      await turnPlane(true);
    }
    if (appState.currentProgressionIndex.val > 0) {
      appState.planeDirection.val = "left";
      appState.currentProgressionIndex.val -= 1;
      await performManoeuvre();
    }
    // if the user is at the beginning of the progression, turn the plane around
    if (appState.currentProgressionIndex.val === 0) {
      await turnPlane(false);
      // set this after the turn so that the plane faces the right way
      appState.planeDirection.val = "right";
    }
  };

  const handleNext = async () => {
    // user needs to face right if going forwards
    if (appState.planeDirection.val === "left") {
      await turnPlane(true);
    }
    if (appState.currentProgressionIndex.val < appState.progressions.val.length) {
      appState.planeDirection.val = "right";
      await performManoeuvre();
      appState.currentProgressionIndex.val += 1;
    }
    // if the user is at the end of the progression, turn the plane around
    if (appState.currentProgressionIndex.val === appState.progressions.val.length) {
      await turnPlane(false);
      // set this after the turn so that the plane faces the right way
      appState.planeDirection.val = "left";
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
