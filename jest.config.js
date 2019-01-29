module.exports = {
    coverageDirectory: 'coverage',
    roots: ['<rootDir>/src'],
    testEnvironment: 'node',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png)$': 'jest-transform-stub',
        '\\.(css|scss)$': 'jest-transform-stub'
    }
};
