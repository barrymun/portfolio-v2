import { flipFrequency, pitchAmplitude, pitchFrequency, rollFrequency } from "utils/constants";
import { CraftManoeuvre } from "utils/types";

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
