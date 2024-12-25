<template>
	<el-aside width="200px">
		<el-menu :default-active="activeMenu" background-color="#001529" text-color="#fff" active-text-color="#1890ff">
			<sub-menu :menu-list="showMenuList" />
		</el-menu>
	</el-aside>
</template>

<script>
import { mapGetters } from "vuex"
import SubMenu from "./SubMenu.vue"
export default {
	components: { SubMenu },
	data() {
		return {}
	},
	computed: {
		...mapGetters(["showMenuList"]),
		activeMenu() {
			const route = this.$route
			return route.meta.activeMenu ? route.meta.activeMenu : route.path
		},
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
.el-aside {
	height: calc(100vh - 64px);
	background-color: #001529;
	overflow: auto;
	scrollbar-width: none;
}
</style>
