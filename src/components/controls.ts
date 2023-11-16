import van from "vanjs-core";

import { performManoeuvre } from "lib/plane";
import { appState } from "utils/state";

// import ArrowNarrowLeftSrc from "@tabler/icons/arrow-narrow-left.svg";
// import ArrowNarrowRightSrc from "@tabler/icons/arrow-narrow-right.svg";

const { button, div, img } = van.tags;

export const Controls = () => {
  const handlePrevious = () => {
    if (appState.currentProgressionIndex.val > 0) {
      appState.currentProgressionIndex.val -= 1;
      performManoeuvre();
    }
  };

  const handleNext = () => {
    if (appState.currentProgressionIndex.val < appState.progressions.val.length) {
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
      },
      img({
        // src: ArrowNarrowLeftSrc,
      }),
    ),
    button(
      {
        onclick: handleNext,
      },
      img({
        // src: ArrowNarrowRightSrc,
      }),
    ),
  );
};
