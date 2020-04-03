const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? 'https://lison16.github.io/mouse-selection/' : '/',
    lintOnSave: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false
}