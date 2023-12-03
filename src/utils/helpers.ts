import { flipFrequency, pitchAmplitude, pitchFrequency, rollFrequency } from "utils/constants";
import { CraftManoeuvre } from "utils/types";

/**
 * The given code calculates the period (T) of a periodic function based on the frequency (f) using the formula:
 *
 * T = (2 * π) / |f|
 *
 * Here's what each part of the formula does:
 *
 * 2 * Math.PI: This part of the formula calculates 2 times the mathematical constant π (pi),
 * which is approximately equal to 3.14159. It essentially represents two times the circumference of a circle.
 *
 * Math.abs(frequency): This part calculates the absolute value of the frequency (f).
 * The absolute value ensures that the result is always positive,
 * regardless of whether the frequency is positive or negative.
 *
 * (2 * Math.PI) / Math.abs(frequency): This expression divides the value obtained from doubling π by the
 * absolute value of the frequency. The result of this division represents the period (T) of the periodic function.
 *
 * In summary, the code calculates the period of a periodic function based on the given frequency,
 * ensuring that the result is always positive.
 *
 * @param frequency
 * @returns
 */
export const getPeriod = (frequency: number): number => {
  return (2 * Math.PI) / Math.abs(frequency);
};

export const getCheckpoint = (type: CraftManoeuvre) => {
  let res: number = 0;
  switch (type) {
    case "pitch-up-down":
      res = getPeriod(pitchFrequency);
      break;
    case "bank-left-right":
      res = getPeriod(rollFrequency);
      break;
    case "backflip":
      res = getPeriod(flipFrequency);
      break;
  }
  return res;
};

/**
 * sinusoidal position calculation for y-axis
 * @param position
 * @returns
 */
export const calcPitch = (position: number): number => pitchAmplitude * Math.sin(pitchFrequency * position);

/**
 * returns a random item from an array
 * @param arr
 * @returns
 */
export const getRandomItemFromArray = <T>(arr: T[]): T | undefined => {
  if (arr.length === 0) {
    return undefined; // handle empty array case
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
