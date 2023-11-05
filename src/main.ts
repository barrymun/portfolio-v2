import van from "vanjs-core";

import { ForkMe } from "components/fork-me";
import { Train } from "components/train";
import { initConfig } from "lib/config";
import { appState } from "utils/state";

// import "assets/css/base.css";
import "assets/css/train.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, ForkMe());
van.add(dom, Train());

const animate = () => {
  if (!appState.config.val) {
    return;
  }

  requestAnimationFrame(animate);
  appState.config.val.renderer.render(appState.config.val.scene, appState.config.val.camera);
};

const handleLoad = () => {
  initConfig();
  animate();
};

const handleScroll = () => {
  if (!appState.config.val) {
    return;
  }

  const scrollY = window.scrollY;
  appState.config.val.train.position.x = scrollY * 0.1;
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
  window.removeEventListener("scroll", handleScroll);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
window.addEventListener("scroll", handleScroll);
