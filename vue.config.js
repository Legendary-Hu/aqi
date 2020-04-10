// vue.config.js
module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8081',
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/api':{
                target:'http://api.map.baidu.com',//百度天气的服务接口
                ws: true, //代理websockets
                changeOrigin: true, //本地开启虚拟站点
                pathRewrite: {
                    '^/api': '' //路径覆盖，用替换成target里的路径
                }
            }
        }
    },
}