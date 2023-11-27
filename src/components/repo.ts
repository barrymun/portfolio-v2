import van from "vanjs-core";

import { repoUrl } from "utils/constants";

import githubSrc from "@tabler/icons/brand-github.svg";

const { div, img } = van.tags;

export const GitHub = () => {
  const handleClick = () => {
    window.open(repoUrl, "_blank", "noopener noreferrer");
  };

  return div(
    {
      class: "repo",
      onclick: handleClick,
    },
    img({
      src: githubSrc,
    }),
  );
};
