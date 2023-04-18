module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "\\.(css)$": "<rootDir>/__mocks__/styleMock.js"
    }
  }
  