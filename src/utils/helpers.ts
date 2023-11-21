import { flipFrequency, pitchFrequency, rollFrequency } from "utils/constants";
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
