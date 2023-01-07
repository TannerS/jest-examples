const crypto = require('src/helper/Crypto');

const getRandomHexHash = () => {
  return crypto?.randomBytes(16).toString('hex');
}

module.exports = {
  getRandomHexHash,
};
