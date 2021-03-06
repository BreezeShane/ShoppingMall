// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
 
module.exports = {
    // runtimeCompiler: true ,
    publicPath:"/",
    outputDir:'dist',
    assetsDir: 'src/assets',
    devServer: {
        port: 8342,
        proxy: {
            '/api': {
                target: 'http://202.193.53.235:8080/',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
}
