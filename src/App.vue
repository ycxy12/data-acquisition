<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import { initDynamicRouter } from "@/router/modules/dynamicRouter"

export default {
	name: "App",
	async created() {
		let access_token = this.getAccessToken()
		if (access_token) {
			this.setSSO(true)
			this.setToken(access_token)
			this.setUserInfo({ username: "Admin" })
			// 2.添加动态路由
			await initDynamicRouter()
			this.$router.push(window.location.pathname)
		}
		if (this.getToken) {
			await initDynamicRouter()
		}
	},
	computed: {
		...mapGetters(["getToken"]),
	},
	methods: {
		...mapMutations(["setToken", "setUserInfo", "setSSO"]),
		//获取access_token
		getAccessToken() {
			let query = this.$route.query
			if (query.access_token) {
				return query.access_token
			} else {
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
