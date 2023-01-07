const axios = require('axios');

setInterval(() => {
  axios.get('www.google.com')
    .then(response => {
      // handle success
      console.log(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
}, 1000 * 60 * 60 * 24);

const someMethodThatWillLoadButNotCalled = () => { console.log('Should not see this') }

module.exports = {
  someMethodThatWillLoadButNotCalled
}
