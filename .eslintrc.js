module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'require-jsdoc': 'off',
    'max-len': ['error', {'code': 120}],
    'no-unused-vars': 'warn',
    'indent': ['warn', 2],
    'space-before-blocks': 'warn',
    'space-before-function-paren': 'warn',
    'arrow-spacing': 'warn',
    'eol-last': 'error',
    'no-extra-semi': 'warn',
    'no-whitespace-before-property': 'error',
  },
};
