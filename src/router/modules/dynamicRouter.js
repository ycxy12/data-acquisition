/*
 * @Author: yc
 * @Date: 2024-11-24 09:35:15
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 15:20:38
 * @Description: 动态路由
 */
import store from "@/store"
import router from "@/router/index"
import { Notification } from "element-ui"

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
	try {
		// 1.获取菜单列表 && 按钮权限列表
		await store.dispatch("getAuthMenuList")

		// 2.判断当前用户有没有菜单权限
		if (!store.getters.authMenuList.length) {
			Notification({
				title: "无权限访问",
				message: "当前账号无任何菜单权限，请联系系统管理员！",
				type: "warning",
				duration: 3000,
			})

			store.dispatch("logout")
			router.replace("/login")
			return Promise.reject("No permission")
		}

		// 3.添加动态路由
		store.getters.flatMenuList.forEach((item) => {
			router.addRoute("layout", {
				path: item.path,
				name: item.name,
				component: () => import(`/src/views${item.component}.vue`),
				meta: item.meta || {}, // 添加任何需要的 meta 信息
			})
		})
		router.addRoute({
			path: "/:pathMatch(.*)*",
			component: () => import("@/components/ErrorMessage/404.vue"),
		})
	} catch (error) {
		// 当按钮 || 菜单请求出错时，重定向到登陆页
		store.dispatch("logout")
		router.replace("/login")
		return Promise.reject(error)
	}
}
