/**
 * Fisher-Yates Shuffle
 * source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 *
 */

const shuffle = (array) => {
  let curr = array.length,
    rand;

  while (curr > 0) {
    rand = Math.floor(Math.random() * curr);
    curr -= 1;

    [array[curr], array[rand]] = [array[rand], array[curr]];
  }

  return array;
};

export default shuffle;
