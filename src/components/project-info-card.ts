import van from "vanjs-core";

import { projectInfoCardId } from "utils/constants";
import { appState } from "utils/state";

const { div } = van.tags;

export const ProjectInfoCard = () => {
  return div(
    { id: projectInfoCardId },
    () =>
      appState.progressions.val.length > 0 &&
      div(
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
