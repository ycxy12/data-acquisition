/*
 * @Author: yc
 * @Date: 2024-11-23 20:22:35
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 16:25:18
 * @Description: webpack配置
 */
const path = require("path")
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin")

module.exports = {
	devServer: {
		port: 8080, // 设置打开的端口
		host: "0.0.0.0", // host
		hot: true, // 热启动
		open: true, // 浏览器自动打开
		compress: true, // 启用压缩，代码占用的空间少，在互联网传输快
		proxy: {
			"/api": {
				target: "要访问目标的地址", //接口地址
				changOrigin: true, //允许跨域
				pathRewrite: {
					"^/api": "", //路径重写
				},
			},
		},
	},
	chainWebpack(config) {
		// 设置 svg-sprite-loader
		config.module.rule("svg").exclude.add(path.join(__dirname, "src/assets/icons")).end()
		config.module
			.rule("icons")
			.test(/\.svg$/)
			.include.add(path.join(__dirname, "src/assets/icons"))
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]",
			})
			.end()
		config.plugin("svg-sprite").use(SpriteLoaderPlugin, [{ plainSprite: true }])
	},
}
