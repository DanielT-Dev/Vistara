module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    setupFiles: [
        "<rootDir>/src/jestSetup.js",
    ],

    setupFilesAfterEnv: [
        "@testing-library/jest-dom",
    ],

    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
    ],

    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
    ],
};