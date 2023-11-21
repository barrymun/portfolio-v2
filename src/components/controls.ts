import van from "vanjs-core";

import { performManoeuvre, turnCraft } from "lib/scene";
import { appState } from "utils/state";

// import ArrowNarrowLeftSrc from "@tabler/icons/arrow-narrow-left.svg";
// import ArrowNarrowRightSrc from "@tabler/icons/arrow-narrow-right.svg";

const { button, div, img } = van.tags;

export const Controls = () => {
  const handlePrevious = async () => {
    // user needs to face left if going backwards
    if (appState.craftDirection.val === "right") {
      await turnCraft(true);
    }
    if (appState.currentProgressionIndex.val > 0) {
      appState.craftDirection.val = "left";
      appState.currentProgressionIndex.val -= 1;
      await performManoeuvre();
    }
    // if the user is at the beginning of the progression, turn the craft around
    if (appState.currentProgressionIndex.val === 0) {
      await turnCraft(false);
      // set this after the turn so that the craft faces the correct way
      appState.craftDirection.val = "right";
    }
  };

  const handleNext = async () => {
    // user needs to face right if going forwards
    if (appState.craftDirection.val === "left") {
      await turnCraft(true);
    }
    if (appState.currentProgressionIndex.val < appState.progressions.val.length) {
      appState.craftDirection.val = "right";
      await performManoeuvre();
      appState.currentProgressionIndex.val += 1;
    }
    // if the user is at the end of the progression, turn the craft around
    if (appState.currentProgressionIndex.val === appState.progressions.val.length) {
      await turnCraft(false);
      // set this after the turn so that the craft faces the correct way
      appState.craftDirection.val = "left";
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
