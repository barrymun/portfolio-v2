import van from "vanjs-core";

import { projectInfoCardId } from "utils/constants";
import { appState } from "utils/state";

import githubSrc from "@tabler/icons/brand-github.svg";

const { div, img, span } = van.tags;

export const ProjectInfoCard = () => {
  const handleClick = () => {
    window.open(
      appState.progressions.val[appState.currentProgressionIndex.val].project.url,
      "_blank",
      "noopener noreferrer",
    );
  };

  return div(
    { id: projectInfoCardId },
    () =>
      appState.progressions.val.length > 0 &&
      span(
        div(
          div(
            {
              class: "github",
              onclick: handleClick,
            },
            img({
              src: githubSrc,
            }),
          ),
          div(
            {
              class: "click-me",
              onclick: handleClick,
            },
            `Click me!`,
          ),
        ),
        div(
          {
            class: "title",
          },
          appState.progressions.val[appState.currentProgressionIndex.val].project.title,
        ),
        div(
          {
            class: "description",
          },
          appState.progressions.val[appState.currentProgressionIndex.val].project.description,
        ),
      ),
  );
};
