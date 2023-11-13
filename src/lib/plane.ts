import { appState } from "utils/state";

// Constants for the sinusoidal movement and pitch intensity
const amplitude: number = 3; // This controls the height of the loops
const frequency: number = 0.002; // This controls the width of the loops
const pitchIntensity: number = 20; // Adjust this factor to control the pitch intensity

const movePlaneUpAndDown = (scrollY: number) => {
  if (!appState.config.val) {
    return;
  }

  // Update background position
  appState.config.val.background.position.x = -scrollY * 0.1;

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = amplitude * Math.sin(frequency * scrollY);

  // Update plane position
  appState.config.val.plane.position.y = sinusoidalY;

  // Calculate the desired pitch angle based on the slope of the sine wave
  const slope = Math.sin(frequency * scrollY);
  // Adjust pitch based on the slope and intensity factor
  let pitchAngle = slope * pitchIntensity;

  // Ensure the pitchAngle transitions smoothly
  pitchAngle *= Math.PI / 180; // Convert degrees to radians for smoother transition

  // Update plane rotation to pitch upwards or downwards
  // Using the corrected originalPitch of 90 degrees
  const originalPitch = Math.PI / 2; // 90 degrees in radians
  appState.config.val.plane.rotation.y = originalPitch - pitchAngle;

  // Set the other rotation components to their original values
  appState.config.val.plane.rotation.x = (-Math.PI / 180) * 90;
  appState.config.val.plane.rotation.z = (Math.PI / 180) * 90;
};

export { movePlaneUpAndDown };
