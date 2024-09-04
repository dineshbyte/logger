module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
    ]
};