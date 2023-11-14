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
import { PlaneManoeuvre, ScrollDirection } from "utils/types";

const performHover = (offset: number) => {
  if (!appState.config.val) {
    return;
  }

  // don't perform the hover manoeuvre if the user is scrolling
  if (appState.isPerformingManoeuvre.val) {
    return;
  }

  const rollAngle: number = hoverAmplitude * Math.sin(hoverFrequency * offset);
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

const moveBackground = (offset: number) => {
  if (!appState.config.val) {
    return;
  }

  // Update background position
  appState.config.val.background.position.x = -offset * 0.1;
};

const movePlaneUpAndDown = (offset: number) => {
  if (!appState.config.val) {
    return;
  }

  moveBackground(offset);

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * offset);

  // Update plane position
  appState.config.val.plane.position.y = sinusoidalY;

  // Calculate the desired pitch angle based on the slope of the sine wave
  const slope = Math.sin(pitchFrequency * offset);
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

const movePlaneLeftAndRight = (offset: number) => {
  if (!appState.config.val) {
    return;
  }

  moveBackground(offset);

  const rollAngle = rollAmplitude * Math.sin(rollFrequency * offset);
  appState.config.val.plane.rotation.z = straightAndLevelPosition - rollAngle;
};

const performBackflip = (offset: number) => {
  if (!appState.config.val) {
    return;
  }

  moveBackground(offset);

  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * offset);
  appState.config.val.plane.position.y = sinusoidalY;
  // appState.config.val.plane.position.x = sinusoidalY; // TODO: might do something with the x-axis
  appState.config.val.plane.rotation.y -= (scrollOffset / 1000) * 2;
};

const performManoeuvre = async (type: PlaneManoeuvre) => {
  if (!appState.config.val) {
    return;
  }

  const checkpoint = getCheckpoint(type);

  appState.isPerformingManoeuvre.val = true;
  let offset: number = 0;
  while (offset < checkpoint) {
    switch (type) {
      case "pitch-up-down":
        movePlaneUpAndDown(offset);
        break;
      case "bank-left-right":
        movePlaneLeftAndRight(offset);
        break;
      case "backflip":
        performBackflip(offset);
        break;
    }
    offset += scrollOffset;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  appState.isPerformingManoeuvre.val = false;
};

const setDirection = (direction: ScrollDirection) => {
  if (!appState.config.val) {
    return;
  }

  appState.config.val.plane.rotation.y = direction === "down" ? (Math.PI / 180) * 90 : (-Math.PI / 180) * 90;
};

export { performHover, movePlaneUpAndDown, movePlaneLeftAndRight, performBackflip, performManoeuvre, setDirection };
