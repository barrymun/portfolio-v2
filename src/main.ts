import van from "vanjs-core";

import { ForkMe } from "components/fork-me";
import { Background } from "components/background";
import { Controls } from "components/controls";
import { Plane } from "components/plane";
import { initBackground, renderBackground } from "lib/background";
import { initConfig } from "lib/config";
import { performHover, renderPlane } from "lib/plane";
import { positionOffset } from "utils/constants";

import "assets/css/base.css";
import "assets/css/icons.css";
import "assets/css/background.css";
import "assets/css/plane.css";
import "assets/css/controls.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, ForkMe());
van.add(dom, Background());
van.add(dom, Plane());
van.add(dom, Controls());

let hoverPosition: number = 0;

const animate = () => {
  requestAnimationFrame(animate);

  renderBackground();
  renderPlane();

  performHover(hoverPosition);
  hoverPosition += positionOffset;
};

const handleLoad = () => {
  initBackground();
  initConfig();
  animate();
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
