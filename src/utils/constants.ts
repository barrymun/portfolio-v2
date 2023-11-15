export const repoUrl: string = "https://github.com/barrymun/portfolio-v2";

export const scrollOffset: number = 8;

export const straightAndLevelPosition: number = Math.PI / 2; // 90 degrees in radians
// Constants for the sinusoidal movement and pitch intensity
export const pitchAmplitude: number = 3; // This controls the height of the loops
export const pitchFrequency: number = 0.002; // This controls the width of the loops
export const pitchIntensity: number = 20; // Adjust this factor to control the pitch intensity
// Constants for the rocking motion
export const rollAmplitude: number = (Math.PI / 180) * 30; // 30 degrees in radians
export const rollFrequency: number = 0.005; // Adjust this for how quickly you want the plane to rock
// Constants for the backflip motion
export const flipFrequency: number = pitchFrequency;
// Constant for the hover motion
export const hoverAmplitude: number = (Math.PI / 180) * 5;
export const hoverFrequency: number = 0.003;

export const defaultSvgAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  strokeWidth: 2,
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
