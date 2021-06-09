// jest.config.js
const { defaults } = require('jest-config');

module.exports = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },

    "moduleNameMapper": {
        "\\.css$": "identity-obj-proxy",
    },

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    // setupFilesAfterEnv: [
    //     "@testing-library/react/cleanup-after-each",
    //     "@testing-library/jest-dom/extend-expect"
    // ],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(src/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    coveragePathIgnorePatterns: [
        "/node_modules/"
    ],

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};