/*
 * @Author: yc
 * @Date: 2024-11-23 20:38:34
 * @LastEditors: yc
 * @LastEditTime: 2024-12-27 18:37:30
 * @Description: 描述
 */
import Vue from "vue"
import Router from "vue-router"
import { initDynamicRouter } from "./modules/dynamicRouter"
import { staticRouter, errorRouter } from "./modules/staticRouter"
import NProgress from "@/utils/nprogress"
import store from "@/store"

Vue.use(Router)

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * */
const router = new Router({
	mode: "hash",
	routes: [...staticRouter, ...errorRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
	// 1.NProgress 开始
	NProgress.start()

	// 2.动态设置标题
	const title = "情报资源管理系统"
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

	// 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
	if (to.path.toLocaleLowerCase() === "/login") {
		if (store.getters.getToken) return next(from.fullPath)
		resetRouter()
		return next()
	}

	// 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
	let ROUTER_WHITE_LIST = ["/500"]
	if (ROUTER_WHITE_LIST.includes(to.path)) return next()

	// 5.判断是否有 Token，没有重定向到 login 页面
	if (!store.getters.getToken) return next({ path: "/login", replace: true })

	// 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
	if (!store.getters.authMenuList.length) {
		await initDynamicRouter()
		return next({ ...to, replace: true })
	}

	// 7.正常访问页面
	next()
})

//解决router.addRoute冬天添加路由，刷新页面404的问题
router.onReady(() => {
	if (store.getters.getToken && store.getters.flatMenuList.length) {
		// 3.添加动态路由
		store.getters.flatMenuList.forEach((item) => {
			router.addRoute(item.meta.routerView ? item.meta.routerView : "layout", {
				path: item.path,
				name: item.name,
				redirect: item.redirect || null,
				component: () => import(`/src/views${item.component}.vue`),
				meta: item.meta || {}, // 添加任何需要的 meta 信息
			})
		})
		router.addRoute({
			path: "/:pathMatch(.*)*",
			component: () => import("@/components/ErrorMessage/404.vue"),
		})
	}
})

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
	store.getters.flatMenuList.forEach((route) => {
		const { name } = route
		if (name && router.hasRoute(name)) router.removeRoute(name)
	})
}

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
	NProgress.done()
	console.warn("路由错误", error.message)
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done()
})

export default router
