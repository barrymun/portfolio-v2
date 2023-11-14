import van from "vanjs-core";

import { ForkMe } from "components/fork-me";
import { Background } from "components/background";
import { Plane } from "components/plane";
import { initBackground, renderBackground } from "lib/background";
import { initConfig } from "lib/config";
import { performHover, renderPlane } from "lib/plane";

import "assets/css/base.css";
import "assets/css/background.css";
import "assets/css/plane.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, ForkMe());
van.add(dom, Background());
van.add(dom, Plane());

let hoverPosition: number = 0;

const animate = () => {
  requestAnimationFrame(animate);

  renderBackground();
  renderPlane();

  performHover(hoverPosition);
  hoverPosition += 4;
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
