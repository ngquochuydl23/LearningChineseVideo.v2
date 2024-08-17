module.exports = {
  presets: [
    ['module:@react-native/babel-preset', { "useTransformReactJSXExperimental": true }],
    'module:metro-react-native-babel-preset'
  ],
  plugins: [
    'react-native-paper/babel',
    ["@babel/plugin-transform-private-methods", { "loose": true }],
  ],
};