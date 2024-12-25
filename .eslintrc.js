/*
 * @Author: yc
 * @Date: 2024-11-23 20:54:52
 * @LastEditors: yc
 * @LastEditTime: 2024-11-23 20:55:21
 * @Description: 描述
 */
module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/essential", "eslint:recommended"],
	parserOptions: {
		parser: "babel-eslint",
	},
	rules: {
		// 禁用 no-unused-vars 规则
		"no-unused-vars": "off", // 或者设置为 'warn' 来只显示警告
	},
}
