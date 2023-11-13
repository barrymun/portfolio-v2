import van from "vanjs-core";

import { ForkMe } from "components/fork-me";
import { Plane } from "components/plane";
import { initConfig } from "lib/config";
import { handleUserScroll } from "lib/scroll";
import { appState } from "utils/state";

import "assets/css/base.css";
import "assets/css/plane.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, ForkMe());
van.add(dom, Plane());

const animate = () => {
  requestAnimationFrame(animate);

  if (!appState.config.val) {
    return;
  }

  appState.config.val.renderer.render(appState.config.val.scene, appState.config.val.camera);
};

const handleLoad = () => {
  initConfig();
  animate();
};

const handleUnload = () => {
  // Reset scroll position to top
  window.scrollTo(0, 0);

  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
  // window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("scroll", handleUserScroll);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
// window.addEventListener("scroll", handleScroll);
window.addEventListener("scroll", handleUserScroll);
