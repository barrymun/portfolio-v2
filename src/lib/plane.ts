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
} from "utils/constants";
import { getCheckpoint } from "utils/helpers";
import { appState } from "utils/state";

// determine the sign to apply to various properties based on the plane's orientation
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
  appState.config.val.plane.rotation.z = rotationAngle;
  // pitch up and down slightly
  appState.config.val.plane.rotation.y = rotationAngle;
  // move in and out of the screen slightly
  appState.config.val.plane.position.z -= rollAngle / 20;
  // move plane up and down slightly
  appState.config.val.plane.position.y -= rollAngle / 30;
  // move plane left and right slightly
  appState.config.val.plane.position.x -= rollAngle / 50;

  appState.config.val.plane.rotation.x = ((orientationSign * -Math.PI) / 180) * 90;
  appState.config.val.plane.rotation.y = ((orientationSign * Math.PI) / 180) * 90;
};

const turnPlane = async (resetOldRotations: boolean) => {
  if (!appState.config.val) {
    return;
  }

  // start performing the manoeuvre
  appState.isPerformingManoeuvre.val = true;

  // set plane rotation on y and z axis to 0
  const planeRotationY = appState.config.val.plane.rotation.y;
  const planeRotationZ = appState.config.val.plane.rotation.z;
  appState.config.val.plane.rotation.x = 0;
  appState.config.val.plane.rotation.z = 0;

  let counter: number = 0;
  while (counter < 3) {
    counter += turnOffset;
    appState.config.val.plane.rotation.y -= orientationSign * turnOffset;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  // reset plane rotation on y and z axis
  if (resetOldRotations) {
    appState.config.val.plane.rotation.y = planeRotationY;
    appState.config.val.plane.rotation.z = planeRotationZ;
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

  // Update plane position
  appState.config.val.plane.position.y = sinusoidalY;
  appState.config.val.plane.position.x = -(sinusoidalY / 4);

  // Calculate the desired pitch angle based on the slope of the sine wave
  const slope = Math.sin(pitchFrequency * position);
  // Adjust pitch based on the slope and intensity factor
  let pitchAngle = slope * pitchIntensity;

  // Ensure the pitchAngle transitions smoothly
  pitchAngle *= Math.PI / 360; // Convert degrees to radians for smoother transition

  // Update plane rotation to pitch upwards or downwards
  appState.config.val.plane.rotation.y = orientationSign * straightAndLevelPosition - pitchAngle;
  appState.config.val.plane.rotation.x = ((orientationSign * -Math.PI) / 180) * 90;
};

const movePlaneLeftAndRight = (position: number) => {
  if (!appState.config.val) {
    return;
  }

  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * position);
  appState.config.val.plane.position.x = -(sinusoidalY / 10);
  const rollAngle = rollAmplitude * Math.sin(rollFrequency * position);
  appState.config.val.plane.rotation.z = straightAndLevelPosition - rollAngle;

  appState.config.val.plane.rotation.x = ((orientationSign * -Math.PI) / 180) * 90;
  appState.config.val.plane.rotation.y = ((orientationSign * Math.PI) / 180) * 90;
};

const performBackflip = (position: number) => {
  if (!appState.config.val) {
    return;
  }

  const sinusoidalY = pitchAmplitude * Math.sin(pitchFrequency * position);
  appState.config.val.plane.position.y = sinusoidalY;

  appState.config.val.plane.position.x = -((orientationSign * sinusoidalY) / 4);
  appState.config.val.plane.rotation.x = ((orientationSign * -Math.PI) / 180) * 90;

  appState.config.val.plane.rotation.y -= (positionOffset / 1000) * 2;
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
  appState.config.val.plane.rotation.y = ((orientationSign * Math.PI) / 180) * 90;

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
