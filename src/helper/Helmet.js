const { getRandomHexHash } = require("./Crypto");
const helmet = require('helmet');

const getDefaultDirectives = () => {
  return helmet?.contentSecurityPolicy?.getDefaultDirectives();
}

const generateCspNonce = () => {
  return getRandomHexHash();
}

module.exports = {
  getDefaultDirectives,
  generateCspNonce
};
