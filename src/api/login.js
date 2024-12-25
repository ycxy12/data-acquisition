/*
 * @Author: yc
 * @Date: 2024-11-24 08:53:50
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 09:09:25
 * @Description: 登录模块
 */

import http from "@/utils/request"
import routes from "@/router/routes.json"

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params) => {
	return http.post(`/api/login`, params)
}

// 获取菜单列表
export const getAuthMenu = () => {
	return routes
}

// 用户退出登录
export const logoutApi = () => {
	return http.post(`/api/logout`)
}
