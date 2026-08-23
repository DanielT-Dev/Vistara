module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    setupFilesAfterEnv: [
        "<rootDir>/src/setupTests.ts",
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