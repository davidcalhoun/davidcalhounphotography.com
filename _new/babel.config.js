module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-syntax-optional-chaining",
    "@babel/plugin-proposal-class-properties"
  ]
};