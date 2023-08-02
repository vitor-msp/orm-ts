import type { Config } from "jest";

const config: Config = {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**", "!**/index.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};

export default config;
