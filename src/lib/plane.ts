import {
  pitchAmplitude,
  pitchFrequency,
  pitchIntensity,
  rollAmplitude,
  rollFrequency,
  scrollOffset,
  straightAndLevelPosition,
} from "utils/constants";
import { appState } from "utils/state";

const movePlaneUpAndDown = (scrollY: number) => {
  if (!appState.config.val) {
    return;
  }

  // Update background position
  appState.config.val.background.position.x = -scrollY * 0.1;

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * scrollY);

  // Update plane position
  appState.config.val.plane.position.y = sinusoidalY;

  // Calculate the desired pitch angle based on the slope of the sine wave
  const slope = Math.sin(pitchFrequency * scrollY);
  // Adjust pitch based on the slope and intensity factor
  let pitchAngle = slope * pitchIntensity;

  // Ensure the pitchAngle transitions smoothly
  pitchAngle *= Math.PI / 180; // Convert degrees to radians for smoother transition

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

  // Update background position
  appState.config.val.background.position.x = -scrollY * 0.1;

  // Calculate the roll angle using a sinusoidal function
  const rollAngle = rollAmplitude * Math.sin(rollFrequency * scrollY);

  // Update plane's roll (rotation.z) to rock by 30 degrees on each side
  appState.config.val.plane.rotation.z = straightAndLevelPosition - rollAngle;
};

const performBackflip = (scrollY: number) => {
  if (!appState.config.val) {
    return;
  }

  // Update background position
  appState.config.val.background.position.x = -scrollY * 0.1;

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * scrollY);

  // Update plane position
  appState.config.val.plane.position.y = sinusoidalY;
  // appState.config.val.plane.position.x = sinusoidalY; // TODO: might do something with the x-axis

  appState.config.val.plane.rotation.y -= (scrollOffset / 1000) * 2;
};

export { movePlaneUpAndDown, movePlaneLeftAndRight, performBackflip };
