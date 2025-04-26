<!--
 * @Author: yc
 * @Date: 2024-11-23 11:45:16
 * @LastEditors: yc
 * @LastEditTime: 2025-02-17 08:10:58
 * @Description: 头部
-->
<template>
	<el-header height="64px">
		<svg-icon name="logo" />
		<h3>情报资源管理系统</h3>
		<Menu />
		<Message />
		<!-- <el-dropdown @command="handleCommand">
			<span class="el-dropdown-link">
				<i class="el-icon-user-solid"></i>
				{{ getUserInfo ? getUserInfo.username : "" }}
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="logout">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown> -->
	</el-header>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import Menu from "./Menu"
import Message from "./Message.vue"

export default {
	components: { Menu, Message },
	data() {
		return {}
	},
	computed: {
		...mapGetters(["getToken", "getUserInfo"]),
	},
	methods: {
		...mapMutations(["clearState"]),
		handleCommand(command) {
			switch (command) {
				case "logout":
					this.logout()
					break
				default:
			}
		},
		logout() {
			this.$confirm("您是否确认退出登录?", "温馨提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				this.clearState()
				this.$router.replace("/login")
				this.$message.success("退出登录成功！")
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.el-header {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 20;
	padding: 0 20px 0;
	color: #fff;
	background-color: #304156;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	background-color: rgba(40, 64, 131, 1);

	.svg-icon {
		width: 40px;
		height: 40px;
		margin-right: 10px;
	}

	h3 {
		font-size: 24px;
		letter-spacing: 2px;
	}

	.el-dropdown {
		color: #fff;
		cursor: pointer;

		&:hover {
			color: #1890ff;
		}
	}
}
</style>
