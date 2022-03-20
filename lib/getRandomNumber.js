export const getRandomFloat = (min, max = min + 1, decimal = 2) =>
  (Math.random() * (max - min) + min).toFixed(2);

export const getRandomInt = (min, max = min + 1) =>
  Math.floor(Math.random() * (max - min) + min);
