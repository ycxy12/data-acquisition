<template>
	<el-menu :default-active="activeMenu" mode="horizontal" text-color="#fff" active-text-color="#1890ff">
		<sub-menu :menu-list="showMenuList" />
	</el-menu>
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
.el-menu {
	height: 64px;
	margin-left: 60px;
	margin-right: auto;
	background-color: transparent;
	&.el-menu--horizontal {
		border-bottom: none;
	}
}
</style>
