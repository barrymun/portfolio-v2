import van from "vanjs-core";

import { startExplorer } from "main";
import { appState } from "utils/state";

const { div } = van.tags;

export const Home = () => {
  const handleClick = async () => {
    appState.isInteractive.val = true;

    await startExplorer();
  };

  return div(
    {
      class: () => (!appState.isInteractive.val ? "home" : "hidden"),
    },
    div(
      div(
        {
          class: "greeting",
        },
        `Hello, I'm Neil`,
      ),
      div(
        {
          class: "whoami",
        },
        `I'm a software developer from Ireland`,
      ),
      div(
        {
          class: "work",
        },
        div(
          {
            onclick: handleClick,
          },
          `Click here to explore`,
        ),
      ),
    ),
    div({
      class: "divider",
    }),
  );
};
