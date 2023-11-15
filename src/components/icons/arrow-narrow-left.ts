import van from "vanjs-core";

import { defaultSvgAttributes } from "utils/constants";
import { IconProps } from "utils/types";

const { path, svg } = van.tags;

export const ArrowNarrowLeft = ({ width = 24, height = 24 }: IconProps) => {
  return svg(
    {
      ...defaultSvgAttributes,
      class: "icon icon-tabler icon-tabler-arrow-narrow-left",
      width,
      height,
    },
    path({ stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
    path({ d: "M5 12l14 0" }),
    path({ d: "M5 12l4 4" }),
    path({ d: "M5 12l4 -4" }),
  );
};
