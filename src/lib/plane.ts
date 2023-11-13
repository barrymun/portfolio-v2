import { appState } from "utils/state";

// Constants for the sinusoidal movement and pitch intensity
export const pitchAmplitude: number = 3; // This controls the height of the loops
export const pitchFrequency: number = 0.002; // This controls the width of the loops
export const pitchIntensity: number = 20; // Adjust this factor to control the pitch intensity
// Constants for the rocking motion
export const rollAmplitude = (Math.PI / 180) * 30; // 30 degrees in radians
export const rollFrequency = 0.005; // Adjust this for how quickly you want the plane to rock

const straightAndLevelPosition: number = Math.PI / 2; // 90 degrees in radians

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

export { movePlaneUpAndDown, movePlaneLeftAndRight };
