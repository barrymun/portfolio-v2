import van from "vanjs-core";

import { projectInfoCardId } from "utils/constants";

const { div } = van.tags;

export const ProjectInfoCard = () => {
  return div({ id: projectInfoCardId });
};
