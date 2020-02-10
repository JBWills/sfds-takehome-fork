export const bound = (value, min, max) => {
  return Math.min(max, Math.max(min, value));
};

export const getPercent = (value, min, max) => {
  return (value / (max - min)) * 100;
};
