module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver', {
        alias: {
          '@controllers': './src/controllers',
          '@models': './src/models',
          '@services': './src/services',
          '@config': './src/config',
          '@middleware': './src/middleware',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@validations': './src/validations',
          '@repositories': './src/repositories'
        }
      }
    ]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
