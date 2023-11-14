import van from "vanjs-core";

import { ForkMe } from "components/fork-me";
import { Plane } from "components/plane";
import { initConfig } from "lib/config";
import { performHover } from "lib/plane";
import { appState } from "utils/state";

import "assets/css/base.css";
import "assets/css/plane.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, ForkMe());
van.add(dom, Plane());

let counter: number = 0;

const animate = () => {
  requestAnimationFrame(animate);

  if (!appState.config.val) {
    return;
  }

  appState.config.val.renderer.render(appState.config.val.scene, appState.config.val.camera);

  performHover(counter);
  counter += 4;
};

const handleLoad = () => {
  initConfig();
  animate();
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
