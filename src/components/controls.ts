import van from "vanjs-core";

// import ArrowNarrowLeftSrc from "@tabler/icons/arrow-narrow-left.svg";
// import ArrowNarrowRightSrc from "@tabler/icons/arrow-narrow-right.svg";

const { button, div, img } = van.tags;

export const Controls = () => {
  return div(
    {
      class: "controls",
    },
    button(
      img({
        // src: ArrowNarrowLeftSrc,
      }),
    ),
    button(
      img({
        // src: ArrowNarrowRightSrc,
      }),
    ),
  );
};
