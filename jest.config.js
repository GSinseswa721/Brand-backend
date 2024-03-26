module.exports = {
    //preset: 'ts-jest',
    //testEnvironment: 'node',
    //testMatch: ["**/**/*.test.ts"],
    //verbose: true,
    //forceExit: true,

    
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
  