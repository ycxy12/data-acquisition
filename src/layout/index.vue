<!--
 * @Author: yc
 * @Date: 2024-11-23 11:44:11
 * @LastEditors: yc
 * @LastEditTime: 2024-11-23 21:42:05
 * @Description: Layout
-->
<template>
	<el-container class="layout_container" direction="vertical">
		<Header />
		<el-container class="classic_content">
			<Menu />
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Header from "./components/Header"
import Menu from "./components/Menu"
export default {
	components: { Header, Menu },
	data() {
		return {}
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
.layout_container {
	width: 100%;
	height: 100%;
	.classic_content {
		display: flex;
		height: calc(100% - 64px);
	}
	.el-main {
		padding: 15px;
	}
}
</style>
