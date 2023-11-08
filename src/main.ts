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
  console.log({
    position: appState.config.val.plane.position,
    rotation: appState.config.val.plane.rotation,
  });

  const scrollY = window.scrollY;

  // Constants for the sinusoidal movement
  const amplitude = 5; // This controls the height of the loops
  const frequency = 0.002; // This controls the width of the loops
  const rotationIntensity = Math.PI; // One full rotation (in radians)

  // Update background position
  appState.config.val.background.position.x = -scrollY * 0.1;

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = amplitude * Math.sin(frequency * scrollY);

  // Calculate the rotation of the plane based on its y position
  // The plane will complete a full rotation (2 * Math.PI radians) at the peak of the sinusoidalY
  const rotation = rotationIntensity * Math.sin(frequency * scrollY);

  // Update plane position
  // appState.config.val.plane.position.z = -scrollY * 0.01;
  // appState.config.val.plane.rotation.x = -scrollY * 0.01;
  // appState.config.val.plane.rotation.x += 0.01;
  // appState.config.val.plane.rotation.z += 0.01;
  // appState.config.val.plane.rotation.y = -scrollY * 0.01;
  appState.config.val.plane.position.y = sinusoidalY;
  // return;

  // Apply rotation to the plane
  // Assuming that the plane needs to rotate around the x-axis to perform a loop
  // appState.config.val.plane.rotation.x = rotation;
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
  // window.removeEventListener("scroll", handleScroll);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
// window.addEventListener("scroll", handleScroll);
