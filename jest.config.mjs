import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
// import * as url from "url";
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^d3$": "<rootDir>/node_modules/d3/dist/d3.min.js",
    workerThreads: true,
  },
};
async function jestConfig() {
  const nextJestConfig = await createJestConfig(config)();
  // /node_modules/ is the first pattern
  // if (nextJestConfig.transformIgnorePatterns[0] === "/node_modules/")
  //   nextJestConfig.transformIgnorePatterns[0] = "/node_modules/(?!d3)/";
  // else
  //   throw new Error(
  //     "Assertion Failed in jest config: " +
  //       nextJestConfig.transformIgnorePatterns
  //   );
  return nextJestConfig;
}
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(jestConfig);
