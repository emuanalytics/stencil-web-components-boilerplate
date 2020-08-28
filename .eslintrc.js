module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    project: ['tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@stencil/recommended'
  ],
  rules: {
    '@stencil/strict-boolean-conditions': 0,
    'react/jsx-no-bind': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
