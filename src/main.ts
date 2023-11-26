import van from "vanjs-core";

import { ForkMe } from "components/fork-me";
import { ProjectInfoCard } from "components/project-info-card";
import { Background } from "components/background";
import { Controls } from "components/controls";
import { Home } from "components/home";
import { Scene } from "components/scene";
import { handleResizeBackground, initBackground, renderBackground } from "lib/background";
import { initConfig } from "lib/config";
import { showCard } from "lib/project-info-card";
import { handleResizeScene, performHover, renderCraft, simulateDockMovement } from "lib/scene";
import { dockPositionOffet, positionOffset } from "utils/constants";
import { appState } from "utils/state";

import "assets/css/fonts.css";
import "assets/css/base.css";
import "assets/css/icons.css";
import "assets/css/home.css";
import "assets/css/background.css";
import "assets/css/scene.css";
import "assets/css/controls.css";
import "assets/css/project-info-card.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, Home());
van.add(dom, ForkMe());
van.add(dom, ProjectInfoCard());
van.add(dom, Background());
van.add(dom, Scene());
van.add(dom, Controls());

let hoverPosition: number = 0;
let dockPosition: number = 0;

van.derive(() => {
  // reset the hover position when manoeuvre is complete
  if (!appState.isPerformingManoeuvre.val) {
    hoverPosition = 0;
  }
});

const animate = () => {
  requestAnimationFrame(animate);

  renderBackground();
  renderCraft();

  performHover(hoverPosition);
  simulateDockMovement(dockPosition);

  if (!appState.isPerformingManoeuvre.val) {
    hoverPosition += positionOffset;
    dockPosition += dockPositionOffet;
  }
};

export const startExplorer = async () => {
  await initConfig();
  initBackground();
  animate();
  showCard();
};

const handleResize = () => {
  handleResizeBackground();
  handleResizeScene();
};

const handleUnload = () => {
  window.removeEventListener("unload", handleUnload);
  window.removeEventListener("resize", handleResize);
};

window.addEventListener("unload", handleUnload);
window.addEventListener("resize", handleResize);
