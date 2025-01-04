<template>
	<div class="login_container">
		<div class="login_form">
			<div class="logo_text">
				<svg-icon name="logo" />
				<span>情报资源管理系统</span>
			</div>
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-loginPwd></el-input>
				</el-form-item>
			</el-form>
			<div class="login_btn">
				<el-button @click="login" type="primary" :loading="loading"> 登 录 </el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { loginApi, listUser } from "@/api/login"
import { initDynamicRouter } from "@/router/modules/dynamicRouter"
import { mapMutations } from "vuex"

export default {
	data() {
		return {
			loading: false,
			loginForm: {
				username: "admin",
				password: "admin",
			},
			loginRules: {
				username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
				password: [{ required: true, message: "请输入密码", trigger: "blur" }],
			},
		}
	},
	mounted() {
		// 绑定键盘事件
		document.onkeydown = this.handleKeyDown
		// 初始化 canvas
		if (window.innerWidth >= 1024) {
			window?.initCanvas?.()
		}
	},
	beforeDestroy() {
		// 在组件销毁之前移除事件监听器，防止内存泄漏
		document.onkeydown = null
		// 重置 canvas
		if (window.resetCanvas) {
			window.resetCanvas()
		}
	},
	methods: {
		...mapMutations(["setToken", "setUserInfo"]),
		login() {
			this.$refs.loginFormRef.validate(async (valid) => {
				if (!valid) return
				this.loading = true
				try {
					// 1.执行登录接口
					const { token } = await loginApi(this.loginForm)
					this.setToken(token)

					// 3.获取用户信息
					const { data } = await listUser()
					this.setUserInfo(data[0])

					// 2.添加动态路由
					await initDynamicRouter()

					// 4.跳转到首页
					this.$router.push("/")
				} finally {
					this.loading = false
				}
			})
		},
		handleKeyDown(e) {
			e = window.event || e // 兼容不同浏览器
			if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
				if (this.loading) return
				this.login()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
