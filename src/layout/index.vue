<!--
 * @Author: yc
 * @Date: 2024-11-23 11:44:11
 * @LastEditors: yc
 * @LastEditTime: 2025-01-03 11:23:50
 * @Description: Layout
-->
<template>
	<el-container class="layout_container" direction="vertical">
		<Header v-if="!getSSO" />
		<el-container class="classic_content">
			<el-main :class="{ is_padding: isPadding }">
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
		isPadding() {
			return this.$route.path.includes("/chat")
		},
	},
}
</script>

<style lang="scss" scoped>
.layout_container {
	width: 100%;
	height: 100%;
	// background-color: #d2ffd2;
	background-color: #172034;
	.classic_content {
		display: flex;
		height: calc(100% - 64px);
	}
	.el-main {
		padding: 12px 15px;
	}
	.is_padding {
		padding: 0;
	}
}
</style>
