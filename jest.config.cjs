module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(isomorphic-dompurify|@exodus)/)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
};
