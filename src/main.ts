import van from "vanjs-core";

import { ForkMe } from "components/fork-me";
import { Plane } from "components/plane";
import { initConfig } from "lib/config";
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

const handleScroll = () => {
  if (!appState.config.val) {
    return;
  }

  const scrollY = window.scrollY;

  // Constants for the sinusoidal movement
  const amplitude = 3; // This controls the height of the loops
  const frequency = 0.002; // This controls the width of the loops

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = amplitude * Math.sin(frequency * scrollY);

  // Update background position
  appState.config.val.background.position.x = -scrollY * 0.1;

  // Update plane position
  // appState.config.val.plane.position.z = -scrollY * 0.01;

  // Ensure the plane stays within a certain range on the y-axis
  // The range is defined by the amplitude of the sinusoidal movement
  appState.config.val.plane.position.y = sinusoidalY;
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
  window.removeEventListener("scroll", handleScroll);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
window.addEventListener("scroll", handleScroll);
