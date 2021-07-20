const config = {
  setupFiles: ["<rootDir>/utils/jest/setEnvVars.js"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // "\\.(css|less|sass)$": "<rootDir>/utils/jest/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/utils/jest/__mocks__/fileMock.js",
  },
  testMatch: [
    "<rootDir>/src/client/spec/**/*test.{js, jsx}",
    "<rootDir>/src/client/spec/**/*.test.tsx",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
    //   "^.+\\.svg$": "<rootDir>/jest/svgTransform.js",
  },
  // snapshotSerializers: ["enzyme-to-json/serializer"],
  collectCoverage: true,
  collectCoverageFrom: ["src/client/**/*.jsx", "src/client/**/*.tsx", "!src/client/spec/**/*.js"],
  // collectCoverageFrom: ["src/**/*.js", "!src/server/index.js"],
  coverageReporters: ["text", "json", "html", "lcov"],
  setupFilesAfterEnv: ["<rootDir>/utils/jest/setUpTests.js"],
  // setupFilesAfterEnv: ["jest-enzyme"],
  // testEnvironment: "enzyme",
  // testEnvironmentOptions: {
  //   enzymeAdapter: "react17",
  // },
};

module.exports = config;
