import van from "vanjs-core";

import { ForkMe } from "components/fork-me";
import { Background } from "components/background";
import { Controls } from "components/controls";
import { Craft } from "components/craft";
import { handleResizeBackground, initBackground, renderBackground } from "lib/background";
import { initConfig } from "lib/config";
import { handleResizePlane, performHover, renderPlane } from "lib/craft";
import { positionOffset } from "utils/constants";
import { appState } from "utils/state";

import "assets/css/base.css";
import "assets/css/icons.css";
import "assets/css/background.css";
import "assets/css/craft.css";
import "assets/css/controls.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, ForkMe());
van.add(dom, Background());
van.add(dom, Craft());
van.add(dom, Controls());

let hoverPosition: number = 0;
van.derive(() => {
  // reset the hover position when manoeuvre is complete
  if (!appState.isPerformingManoeuvre.val) {
    hoverPosition = 0;
  }
});

const animate = () => {
  requestAnimationFrame(animate);

  renderBackground();
  renderPlane();

  performHover(hoverPosition);
  hoverPosition += positionOffset;
};

const handleLoad = async () => {
  await initConfig();
  initBackground();
  animate();
};

const handleResize = () => {
  handleResizeBackground();
  handleResizePlane();
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
  window.removeEventListener("resize", handleResize);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
window.addEventListener("resize", handleResize);
