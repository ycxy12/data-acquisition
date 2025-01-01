<!--
 * @Author: yc
 * @Date: 2024-11-23 11:44:11
 * @LastEditors: yc
 * @LastEditTime: 2024-12-25 16:31:35
 * @Description: Layout
-->
<template>
	<el-container class="layout_container" direction="vertical">
		<Header v-if="!getSSO" />
		<el-container class="classic_content">
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Header from "./components/Header"
import { mapGetters } from "vuex"

export default {
	components: { Header },

	computed: {
		...mapGetters(["getSSO"]),
	},
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
		padding: 12px 15px;
		background-color: #f2f3f5;
	}
}
</style>
