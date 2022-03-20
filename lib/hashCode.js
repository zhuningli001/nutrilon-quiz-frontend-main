// src: https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
const hashCode = (str) => {
  return Array.from(str).reduce(
    (a, c) => (Math.imul(31, a) + c.charCodeAt(0)) | 0,
    0
  );
};

export default hashCode;
