import van from "vanjs-core";

import {
  hoverAmplitude,
  hoverFrequency,
  pitchAmplitude,
  pitchFrequency,
  pitchIntensity,
  rollAmplitude,
  rollFrequency,
  positionOffset,
  straightAndLevelPosition,
  turnOffset,
  turnBankAngle,
} from "utils/constants";
import { getCheckpoint } from "utils/helpers";
import { appState } from "utils/state";

// determine the sign to apply to various properties based on the craft's orientation
let orientationSign: number = appState.planeDirection.val === "right" ? 1 : -1;
van.derive(() => {
  orientationSign = appState.planeDirection.val === "right" ? 1 : -1;
});

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
  appState.config.val.craft.rotation.z = rotationAngle;
  // pitch up and down slightly
  appState.config.val.craft.rotation.y = rotationAngle;
  // move in and out of the screen slightly
  appState.config.val.craft.position.z -= rollAngle / 20;
  // move craft up and down slightly
  appState.config.val.craft.position.y -= rollAngle / 30;
  // move craft left and right slightly
  appState.config.val.craft.position.x -= rollAngle / 50;

  appState.config.val.craft.rotation.x = ((orientationSign * -Math.PI) / 180) * 90;
  appState.config.val.craft.rotation.y = ((orientationSign * Math.PI) / 180) * 90;
};

const turnPlane = async (resetOldRotations: boolean) => {
  if (!appState.config.val) {
    return;
  }

  // start performing the manoeuvre
  appState.isPerformingManoeuvre.val = true;

  // save the old craft rotation on y and z axis
  const planeRotationY = appState.config.val.craft.rotation.y;
  const planeRotationZ = appState.config.val.craft.rotation.z;
  // set craft rotation on y and z axis to 0
  appState.config.val.craft.rotation.x = 0;
  appState.config.val.craft.rotation.z = 0;

  let counter: number = 0;
  while (counter < 3) {
    counter += turnOffset;
    // turn
    appState.config.val.craft.rotation.y -= orientationSign * turnOffset;
    // handle angle of bank
    const currentBankAngle = (counter > 1.5 ? 3 - counter : counter) * 25;
    const finalBankAngle = Math.min(currentBankAngle, turnBankAngle);
    appState.config.val.craft.rotation.z = ((orientationSign * Math.PI) / 180) * finalBankAngle;
    // slight delay for smoother animation
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  // reset craft rotation on y and z axis
  if (resetOldRotations) {
    appState.config.val.craft.rotation.y = planeRotationY;
    appState.config.val.craft.rotation.z = planeRotationZ;
  }

  // end performing the manoeuvre
  appState.isPerformingManoeuvre.val = false;
};

const movePlaneUpAndDown = (position: number) => {
  if (!appState.config.val) {
    return;
  }

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * position);

  // Update craft position
  appState.config.val.craft.position.y = sinusoidalY;
  appState.config.val.craft.position.x = -(sinusoidalY / 4);

  // Calculate the desired pitch angle based on the slope of the sine wave
  const slope = Math.sin(pitchFrequency * position);
  // Adjust pitch based on the slope and intensity factor
  let pitchAngle = slope * pitchIntensity;

  // Ensure the pitchAngle transitions smoothly
  pitchAngle *= Math.PI / 360; // Convert degrees to radians for smoother transition

  // Update craft rotation to pitch upwards or downwards
  appState.config.val.craft.rotation.y = orientationSign * straightAndLevelPosition - pitchAngle;
  appState.config.val.craft.rotation.x = ((orientationSign * -Math.PI) / 180) * 90;
};

const movePlaneLeftAndRight = (position: number) => {
  if (!appState.config.val) {
    return;
  }

  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * position);
  appState.config.val.craft.position.x = -(sinusoidalY / 10);
  const rollAngle = rollAmplitude * Math.sin(rollFrequency * position);
  appState.config.val.craft.rotation.z = straightAndLevelPosition - rollAngle;

  appState.config.val.craft.rotation.x = ((orientationSign * -Math.PI) / 180) * 90;
  appState.config.val.craft.rotation.y = ((orientationSign * Math.PI) / 180) * 90;
};

const performBackflip = (position: number) => {
  if (!appState.config.val) {
    return;
  }

  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * position);
  appState.config.val.craft.position.y = sinusoidalY;

  appState.config.val.craft.position.x = -((orientationSign * sinusoidalY) / 4);
  appState.config.val.craft.rotation.x = ((orientationSign * -Math.PI) / 180) * 90;

  appState.config.val.craft.rotation.y -= (positionOffset / 1000) * 2;
};

const performManoeuvre = async () => {
  if (!appState.config.val) {
    return;
  }

  if (
    appState.currentProgressionIndex.val >= appState.progressions.val.length ||
    appState.currentProgressionIndex.val < 0
  ) {
    return;
  }

  const manoeuvre = appState.progressions.val[appState.currentProgressionIndex.val].manoeuvre;
  const checkpoint = getCheckpoint(manoeuvre);

  // start performing the manoeuvre
  appState.isPerformingManoeuvre.val = true;

  // ensure correct direction for the first frame
  appState.config.val.craft.rotation.y = ((orientationSign * Math.PI) / 180) * 90;

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
    position += positionOffset;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  // end performing the manoeuvre
  appState.isPerformingManoeuvre.val = false;
};

const renderPlane = () => {
  if (!appState.config.val) {
    return;
  }

  appState.config.val.renderer.render(appState.config.val.scene, appState.config.val.camera);
};

const handleResizePlane = () => {
  if (!appState.config.val) {
    return;
  }

  appState.config.val.camera.aspect = window.innerWidth / window.innerHeight;
  appState.config.val.camera.updateProjectionMatrix();
  appState.config.val.renderer.setSize(window.innerWidth, window.innerHeight);
};

export {
  performHover,
  turnPlane,
  movePlaneUpAndDown,
  movePlaneLeftAndRight,
  performBackflip,
  performManoeuvre,
  renderPlane,
  handleResizePlane,
};
