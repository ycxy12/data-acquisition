<template>
	<div class="login_container">
		<div class="login_form">
			<div class="logo_text">情报资源管理系统</div>
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
				<el-form-item prop="loginName">
					<el-input v-model="loginForm.loginName" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="loginPwd">
					<el-input type="password" v-model="loginForm.loginPwd" placeholder="请输入密码" show-loginPwd></el-input>
				</el-form-item>
			</el-form>
			<div class="login_btn">
				<el-button @click="login" type="primary" :loading="loading"> 登录 </el-button>
			</div>
		</div>
		<vue-particles
			color="#409EFF"
			:particleOpacity="0.7"
			:particlesNumber="80"
			shapeType="circle"
			:particleSize="4"
			linesColor="#409EFF"
			:linesWidth="1"
			:lineLinked="true"
			:lineOpacity="0.4"
			:linesDistance="150"
			:moveSpeed="3"
			:hoverEffect="true"
			hoverMode="grab"
			:clickEffect="true"
			clickMode="push"
		>
		</vue-particles>
	</div>
</template>

<script>
import { loginApi } from "@/api/login"
import { initDynamicRouter } from "@/router/modules/dynamicRouter"
import { mapMutations } from "vuex"

export default {
	data() {
		return {
			loading: false,
			loginForm: {
				loginName: "",
				loginPwd: "",
			},
			loginRules: {
				loginName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
				loginPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
			},
		}
	},
	mounted() {
		// 绑定键盘事件
		document.onkeydown = this.handleKeyDown
	},
	beforeDestroy() {
		// 在组件销毁之前移除事件监听器，防止内存泄漏
		document.onkeydown = null
	},
	methods: {
		...mapMutations(["setToken", "setUserInfo"]),
		login() {
			this.$refs.loginFormRef.validate(async (valid) => {
				if (!valid) return
				this.loading = true
				try {
					// 1.执行登录接口
					// const { data } = await loginApi(this.loginForm)
					// this.setToken(data.xaccessToken)
					// this.setUserInfo(data)
					this.setToken("0123456789")
					this.setUserInfo({ userName: "Admin", userId: "123456", token: "0123456789" })

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
