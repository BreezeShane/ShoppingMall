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
            '/': {
                target: 'http://202.193.53.235:8080/',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/': ''
                }
            },
            // '/good/list': {
            //     target: 'http://202.193.53.235:8080/good/list',
            //     changeOrigin: true,
            //     ws: true,
            //     pathRewrite: {
            //         '^/good/list': ''
            //     }
            // }
        }
    }
}
