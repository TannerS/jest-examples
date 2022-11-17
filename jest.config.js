module.exports = {
  verbose: true,
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '(/test/).+(.unit.spec.js)',
  reporters: ['default', 'jest-junit'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coverageDirectory: '<rootDir>/reports/coverage/unit',
  coverageReporters: ['cobertura', 'lcov', 'text', 'text-summary'],
  roots: ['<rootDir>', '<rootDir>/src', '<rootDir>/test']
};
