module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'not dead',
            'not < 2%'
          ]
        },
        modules: false
      }
    ]
  ]
};