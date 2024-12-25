/*
 * @Author: yc
 * @Date: 2024-11-24 09:35:15
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 11:41:05
 * @Description: 静态路由
 */
/**
 * staticRouter (静态路由)
 */
export const staticRouter = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录",
		},
	},
	{
		path: "/layout",
		name: "layout",
		component: () => import("@/layout/index.vue"),
		redirect: "/home",
		children: [],
	},
]

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
	{
		path: "/403",
		name: "403",
		component: () => import("@/components/ErrorMessage/403.vue"),
		meta: {
			title: "403页面",
		},
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/components/ErrorMessage/404.vue"),
		meta: {
			title: "404页面",
		},
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/components/ErrorMessage/500.vue"),
		meta: {
			title: "500页面",
		},
	},
]
