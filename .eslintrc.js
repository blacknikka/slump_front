// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    // 'prettier',
    'plugin:vue/essential',
    // 'plugin:prettier/recommended',
    'standard',
  ],
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],

    // allow adding comma.
    'comma-dangle': ['error', 'only-multiline'],
  },
};
