module.exports = {
    root: true,
    env: {
        node: true, // This allows for global variables such as `module` and `process`
        jest: true, // Add Jest global variables like `describe` and `it`
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
    extends: [
        'eslint:recommended', // Use ESLint recommended rules
        'plugin:@typescript-eslint/recommended', // Use recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:jest/recommended', // Use recommended Jest rules
    ],
    parserOptions: {
        sourceType: 'module', // Allows using import/export statements
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'jest'], // Add TypeScript and Jest plugins
    rules: {
        '@typescript-eslint/no-unused-vars': 'error', // Error on unused variables
        '@typescript-eslint/explicit-function-return-type': 'off', // Turn off explicit return type for functions
        '@typescript-eslint/no-explicit-any': 'warn', // Warn if `any` is used
        'jest/no-disabled-tests': 'warn', // Warn about disabled Jest tests
        'jest/no-focused-tests': 'error', // Error on focused Jest tests like `test.only`
        'jest/no-identical-title': 'error', // Error if test titles are identical
        'jest/prefer-to-have-length': 'warn', // Suggest `.toHaveLength()`
        'jest/valid-expect': 'error', // Enforce valid `expect()` usage
    },
};