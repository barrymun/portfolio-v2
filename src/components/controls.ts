import van from "vanjs-core";

import { performManoeuvre, turnCraft } from "lib/scene";
import { appState } from "utils/state";

import arrowNarrowLeftSrc from "@tabler/icons/arrow-narrow-left.svg";
import arrowNarrowRightSrc from "@tabler/icons/arrow-narrow-right.svg";

const { button, div, img } = van.tags;

export const Controls = () => {
  const handlePrevious = async () => {
    // user needs to face left if going backwards
    if (appState.craftDirection.val === "right") {
      await turnCraft("left");
    }
    if (appState.currentProgressionIndex.val > 0) {
      await performManoeuvre();
      appState.currentProgressionIndex.val -= 1;
    }
    // if the user is at the beginning of the progression, turn the craft around
    if (appState.currentProgressionIndex.val === 0) {
      await turnCraft("right");
    }
  };

  const handleNext = async () => {
    // user needs to face right if going forwards
    if (appState.craftDirection.val === "left") {
      await turnCraft("right");
    }
    if (appState.currentProgressionIndex.val < appState.progressions.val.length) {
      await performManoeuvre();
      appState.currentProgressionIndex.val += 1;
    }
    // if the user is at the end of the progression, turn the craft around
    if (appState.currentProgressionIndex.val === appState.progressions.val.length - 1) {
      await turnCraft("left");
    }
  };

  return div(
    {
      class: () => (appState.isInteractive.val ? "controls" : "hidden"),
    },
    div(
      button(
        {
          onclick: handlePrevious,
          disabled: () => appState.currentProgressionIndex.val === 0 || appState.isPerformingManoeuvre.val,
        },
        img({
          src: arrowNarrowLeftSrc,
        }),
      ),
      button(
        {
          onclick: handleNext,
          disabled: () =>
            appState.currentProgressionIndex.val === appState.progressions.val.length - 1 ||
            appState.isPerformingManoeuvre.val,
        },
        img({
          src: arrowNarrowRightSrc,
        }),
      ),
    ),
    div(`Navigate by clicking the arrows`),
  );
};
