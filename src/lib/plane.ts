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
import { appState } from "utils/state";

const performHover = (scrollY: number) => {
  if (!appState.config.val) {
    return;
  }

  const rollAngle: number = hoverAmplitude * Math.sin(hoverFrequency * scrollY);
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

const moveBackground = (scrollY: number) => {
  if (!appState.config.val) {
    return;
  }

  // Update background position
  appState.config.val.background.position.x = -scrollY * 0.1;
};

const movePlaneUpAndDown = (scrollY: number) => {
  if (!appState.config.val) {
    return;
  }

  moveBackground(scrollY);

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * scrollY);

  // Update plane position
  appState.config.val.plane.position.y = sinusoidalY;

  // Calculate the desired pitch angle based on the slope of the sine wave
  const slope = Math.sin(pitchFrequency * scrollY);
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

const movePlaneLeftAndRight = (scrollY: number) => {
  if (!appState.config.val) {
    return;
  }

  moveBackground(scrollY);

  const rollAngle = rollAmplitude * Math.sin(rollFrequency * scrollY);
  appState.config.val.plane.rotation.z = straightAndLevelPosition - rollAngle;
};

const performBackflip = (scrollY: number) => {
  if (!appState.config.val) {
    return;
  }

  moveBackground(scrollY);

  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * scrollY);
  appState.config.val.plane.position.y = sinusoidalY;
  // appState.config.val.plane.position.x = sinusoidalY; // TODO: might do something with the x-axis
  appState.config.val.plane.rotation.y -= (scrollOffset / 1000) * 2;
};

export { performHover, movePlaneUpAndDown, movePlaneLeftAndRight, performBackflip };
