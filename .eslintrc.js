module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/prop-types': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-unused-styles': 1,
    'react/no-unescaped-entities': 0,
    'no-alert': 0,
  },
};
