const { add, div, mul } = require('./FileB');
// https://stackoverflow.com/q/75036458/2449314
const fileC = require('./FileC');

const addTen = num => {
  return add(10, num);
}

const divFive = num => {
  return div(num, 5);
}

const mulTen = num => {
  return mul(num, 10);
}

const subTen = num => {
  return fileC.sub(num, 10);
}

module.exports = {
  addTen,
  divFive,
  mulTen,
  subTen
};
