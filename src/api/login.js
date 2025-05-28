/*
 * @Author: yc
 * @Date: 2024-11-24 08:53:50
 * @LastEditors: yc
 * @LastEditTime: 2024-12-27 10:51:36
 * @Description: 登录模块
 */

import http from "@/utils/request"
import routes from "@/router/routes.json"

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params) => {
	return http.post(`/qbcjApi/login`, params)
}

// 用户列表
export const listUser = (params) => {
	return http.get(`/qbcjApi/user`, params)
}

// 获取菜单列表
export const getAuthMenu = () => {
	return routes
}

// 用户退出登录
export const logoutApi = () => {
	return http.post(`/qbcjApi/logout`)
}
