module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [{
    files: ['src/**/*.js']
  }],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    semi: 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    'space-before-function-paren': ['error', 'never']
  }
};
