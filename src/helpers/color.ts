export const getRandomColor = () =>
  "#" +
  "0123456789abcdef"
    .split("")
    .map(function (v, i, a) {
      return i > 5 ? null : a[Math.floor(Math.random() * 16)];
    })
    .join("");
