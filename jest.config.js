module.exports = {
    "preset": "ts-jest",
      "testEnvironment": "node",
      "rootDir": "src",
      "collectCoverage": true,
      "testTimeout": 30000,
      "coverageThreshold": {
        "global": {
          "lines": 50
        }
      }
      
  };
  