/*
 * @Author: yc
 * @Date: 2024-11-24 09:11:52
 * @LastEditors: yc
 * @LastEditTime: 2024-12-27 10:53:26
 * @Description: 仓库
 */
import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import { getFlatMenuList, getShowMenuList } from "@/utils"
import { getAuthMenu } from "@/api/login"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 存储应用的状态
		token: null,
		//用户信息
		userInfo: null,
		// 菜单权限列表
		authMenuList: [],
	},
	mutations: {
		// 修改状态的方法
		setToken(state, token) {
			state.token = token
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		setAuthMenuList(state, authMenuList) {
			state.authMenuList = authMenuList
		},
		clearState(state) {
			state.token = null
			state.userInfo = null
			state.authMenuList = []
		},
	},
	actions: {
		// Get AuthMenuList
		async getAuthMenuList({ commit }) {
			const { data } = await getAuthMenu()
			commit("setAuthMenuList", data)
		},
		//登出
		logout({ commit }) {
			commit("clearState")
		},
	},
	getters: {
		// 获取状态的方法
		getToken: (state) => state.token,
		//用户信息
		getUserInfo: (state) => state.userInfo,
		// 菜单权限列表 ==> 这里的菜单没有经过任何处理
		authMenuList: (state) => state.authMenuList,
		// 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
		showMenuList: (state) => getShowMenuList(state.authMenuList),
		// 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
		flatMenuList: (state) => getFlatMenuList(state.authMenuList),
	},
	plugins: [createPersistedState()],
})
