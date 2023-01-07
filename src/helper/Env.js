const testEnv = () => {
  return {
    foo: process.env.foo,
    bar: process.env.bar
  };
}

module.exports = {
  testEnv,
};
