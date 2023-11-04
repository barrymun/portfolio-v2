import van from "vanjs-core";

import { ForkMe } from "components/fork-me";

import "assets/css/base.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, ForkMe());

const handleLoad = () => {
  // do something on load if required
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
