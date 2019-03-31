// vue.config.js
module.exports = {
  assetsDir: 'static',
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  }
}