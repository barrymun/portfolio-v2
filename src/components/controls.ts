import van from "vanjs-core";

import { ArrowNarrowLeft } from "components/icons/arrow-narrow-left";

const { button, div } = van.tags;

export const Controls = () => {
  return div(
    {
      class: "controls",
    },
    button(ArrowNarrowLeft({ width: 24, height: 24 })),
    button(
      ArrowNarrowLeft({ width: 24, height: 24 }), // TODO: arrow narrow right
    ),
  );
};
