const path = require('path')
const configs = require('@vue-monorepo-boilerplate/configs')

module.exports = function (env, argv) {
  return configs(env, argv, {
    packageName: 'demo',
    configureWebpack: {
      entry: {
        app: './src/index.js'
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@pages': path.resolve(__dirname, './src/pages')
        }
      }
    }
  })
}
