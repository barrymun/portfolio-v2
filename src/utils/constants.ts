export const repoUrl: string = "https://github.com/barrymun/portfolio-v2";

export const positionOffset: number = 6;

export const straightAndLevelPosition: number = Math.PI / 2; // 90 degrees in radians
// constants for the sinusoidal movement and pitch intensity
export const pitchAmplitude: number = 3; // This controls the height of the loops
export const pitchFrequency: number = 0.002; // This controls the width of the loops
export const pitchIntensity: number = 20; // Adjust this factor to control the pitch intensity
// constants for the rocking motion
export const rollAmplitude: number = (Math.PI / 180) * 30; // 30 degrees in radians
export const rollFrequency: number = 0.0025; // Adjust this for how quickly you want the plane to rock
// constants for the backflip motion
export const flipFrequency: number = pitchFrequency;
// constants for the hover motion
export const hoverAmplitude: number = (Math.PI / 180) * 5;
export const hoverFrequency: number = 0.003;
// constants for the turn motion
export const turnOffset: number = 0.01;
// constants for stars
export const starSpeedNormal: number = 0.3;
export const starSpeedFast: number = 5.0;

export const defaultSvgAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  "stroke-width": 2,
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};
