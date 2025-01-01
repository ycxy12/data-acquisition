<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import { mapMutations } from "vuex"
import { initDynamicRouter } from "@/router/modules/dynamicRouter"

export default {
	name: "App",
	async created() {
		console.log(this.$route)
		let access_token = this.getAccessToken()
		if (access_token) {
			this.setSSO(true)
			this.setToken(access_token)
			this.setUserInfo({ username: "Admin" })
			// 2.添加动态路由
			await initDynamicRouter()
			this.$router.push(window.location.pathname)
		}
	},
	methods: {
		...mapMutations(["setToken", "setUserInfo", "setSSO"]),
		//获取access_token
		// getAccessToken() {
		// 	// 先通过 $route.query 获取 token
		// 	const token = this.$route.query.access_token
		// 	// 如果没有在 $route.query 中找到，再从 URL 中解析
		// 	if (token) {
		// 		return token
		// 	} else {
		// 		// 使用 URLSearchParams 来简化查询参数的解析
		// 		const urlParams = new URLSearchParams(window.location.search)
		// 		return urlParams.get("access_token") // 如果有则返回 access_token，否则返回 null
		// 	}
		// },

		getAccessToken() {
			let query = this.$route.query
			if (query.access_token) {
				return query.access_token
			} else {
				console.log(window.location)
				let fullUrl = window.location.href
				let tokenIndex = fullUrl.indexOf("access_token=")
				if (tokenIndex != -1) {
					let queryParams = fullUrl.substring(tokenIndex).split("&")
					for (let pIdx in queryParams) {
						let queryParam = queryParams[pIdx]
						if (queryParam.indexOf("=") > 0 && queryParam.split("=")[0] == "access_token") {
							return queryParam.split("=")[1]
						}
					}
				}
				return null
			}
		},
	},
}
</script>

<style></style>
