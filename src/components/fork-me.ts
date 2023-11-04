import van from "vanjs-core";

import { repoUrl } from "utils/constants";

const { a, img } = van.tags;

export const ForkMe = () => {
  return a(
    {
      href: repoUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      style: "position: absolute; top: 0; right: 0; border: 0;",
    },
    img({
      decoding: "async",
      width: "149",
      height: "149",
      src: "https://github.blog/wp-content/uploads/2008/12/forkme_right_orange_ff7600.png?resize=149%2C149",
      class: "attachment-full size-full",
      alt: "Fork me on GitHub",
      loading: "lazy",
      "data-recalc-dims": "1",
    }),
  );
};
