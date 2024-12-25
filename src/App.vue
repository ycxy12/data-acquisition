<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import { initDynamicRouter } from "@/router/modules/dynamicRouter"
import { mapMutations } from "vuex"

export default {
	name: "App",
	created() {
		this.setUserInfo({ userName: "Admin" })
		initDynamicRouter()
	},
	methods: {
		...mapMutations(["setUserInfo"]),
	},
}
</script>

<style></style>
