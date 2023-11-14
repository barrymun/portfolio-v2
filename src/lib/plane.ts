import {
  hoverAmplitude,
  hoverFrequency,
  pitchAmplitude,
  pitchFrequency,
  pitchIntensity,
  rollAmplitude,
  rollFrequency,
  scrollOffset,
  straightAndLevelPosition,
} from "utils/constants";
import { getCheckpoint } from "utils/helpers";
import { appState } from "utils/state";
import { ScrollDirection } from "utils/types";

const performHover = (position: number) => {
  if (!appState.config.val) {
    return;
  }

  // don't perform the hover manoeuvre if the user is scrolling
  if (appState.isPerformingManoeuvre.val) {
    return;
  }

  const rollAngle: number = hoverAmplitude * Math.sin(hoverFrequency * position);
  const rotationAngle: number = straightAndLevelPosition - rollAngle;
  // bank left and right slightly
  appState.config.val.plane.rotation.z = rotationAngle;
  // pitch up and down slightly
  appState.config.val.plane.rotation.y = rotationAngle;
  // move in and out of the screen slightly
  appState.config.val.plane.position.z -= rollAngle / 20;
  // move plane up and down slightly
  appState.config.val.plane.position.y -= rollAngle / 30;
  // move plane left and right slightly
  appState.config.val.plane.position.x -= rollAngle / 50;
};

const moveBackground = (_position: number) => {
  // TODO: move background
};

const movePlaneUpAndDown = (position: number) => {
  if (!appState.config.val) {
    return;
  }

  moveBackground(position);

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * position);

  // Update plane position
  appState.config.val.plane.position.y = sinusoidalY;

  // Calculate the desired pitch angle based on the slope of the sine wave
  const slope = Math.sin(pitchFrequency * position);
  // Adjust pitch based on the slope and intensity factor
  let pitchAngle = slope * pitchIntensity;

  // Ensure the pitchAngle transitions smoothly
  pitchAngle *= Math.PI / 360; // Convert degrees to radians for smoother transition

  // Update plane rotation to pitch upwards or downwards
  appState.config.val.plane.rotation.y = straightAndLevelPosition - pitchAngle;

  // Set the other rotation components to their original values
  appState.config.val.plane.rotation.x = (-Math.PI / 180) * 90;
  appState.config.val.plane.rotation.z = (Math.PI / 180) * 90;
};

const movePlaneLeftAndRight = (position: number) => {
  if (!appState.config.val) {
    return;
  }

  moveBackground(position);

  const rollAngle = rollAmplitude * Math.sin(rollFrequency * position);
  appState.config.val.plane.rotation.z = straightAndLevelPosition - rollAngle;
};

const performBackflip = (position: number) => {
  if (!appState.config.val) {
    return;
  }

  moveBackground(position);

  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * position);
  appState.config.val.plane.position.y = sinusoidalY;
  // appState.config.val.plane.position.x = sinusoidalY; // TODO: might do something with the x-axis
  appState.config.val.plane.rotation.y -= (scrollOffset / 1000) * 2;
};

const performManoeuvre = async () => {
  if (!appState.config.val) {
    return;
  }

  if (appState.currentProgressionIndex.val >= appState.progressions.val.length) {
    return;
  }

  const manoeuvre = appState.progressions.val[appState.currentProgressionIndex.val].manoeuvre;
  const checkpoint = getCheckpoint(manoeuvre);

  appState.isPerformingManoeuvre.val = true;
  let position: number = 0;
  while (position < checkpoint) {
    switch (manoeuvre) {
      case "pitch-up-down":
        movePlaneUpAndDown(position);
        break;
      case "bank-left-right":
        movePlaneLeftAndRight(position);
        break;
      case "backflip":
        performBackflip(position);
        break;
    }
    position += scrollOffset;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  appState.currentProgressionIndex.val += 1;
  appState.isPerformingManoeuvre.val = false;
};

const setDirection = (direction: ScrollDirection) => {
  if (!appState.config.val) {
    return;
  }

  appState.config.val.plane.rotation.y = direction === "down" ? (Math.PI / 180) * 90 : (-Math.PI / 180) * 90;
};

const renderPlane = () => {
  if (!appState.config.val) {
    return;
  }

  appState.config.val.renderer.render(appState.config.val.scene, appState.config.val.camera);
};

export {
  performHover,
  movePlaneUpAndDown,
  movePlaneLeftAndRight,
  performBackflip,
  performManoeuvre,
  setDirection,
  renderPlane,
};
