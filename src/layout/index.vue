<!--
 * @Author: yc
 * @Date: 2024-11-23 11:44:11
 * @LastEditors: yc
 * @LastEditTime: 2025-01-02 11:14:05
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
	.classic_content {
		display: flex;
		height: calc(100% - 64px);
	}
	.el-main {
		padding: 12px 15px;
		background-color: #f2f3f5;
	}
	.is_padding {
		padding: 0;
	}
}
</style>
