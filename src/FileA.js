const { add, div, mul } = require('./FileB');

const addTen = num => {
  return add(10, num);
}

const divFive = num => {
  return div(num, 5);
}

const mulTen = num => {
  return mul(num, 10);
}

module.exports = {
  addTen,
  divFive,
  mulTen
};
