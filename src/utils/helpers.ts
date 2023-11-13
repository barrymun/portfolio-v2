export const getPeriod = (frequency: number): number => {
  return (2 * Math.PI) / Math.abs(frequency);
};
