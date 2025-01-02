<template>
	<div class="content">
		<div class="default">
			<h3>情报问答助手</h3>
			<p>您好，我是您的情报问答助手，您可以问我关于装备战技参数、兵力编成编组、经典历史战例相关问题。</p>
			<div class="question">
				<div>您可以试着问我：</div>
				<p v-for="item in questions" :key="item" @click="handleSend(item)">{{ item }}</p>
			</div>
		</div>
		<ChatInput v-model="message" :loading="loading" @send="handleSend" />
	</div>
</template>

<script>
import ChatInput from "../components/chatInput.vue"

export default {
	components: { ChatInput },
	data() {
		return {
			loading: false,
			message: "",
			questions: ["M1主战坦克性能参数", "台湾海军司令部下属单位有哪些", "斯大林格勒战役发生时间"],
		}
	},
	methods: {
		// 发送消息
		handleSend(message) {
			this.message = message
			this.$router.push({ path: `/chat/123456789`, params: { message } })
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	padding: 0 20px;
}
.default {
	width: 100%;
	margin: 0 auto;
	padding-top: 10%;
	max-width: 1000px;
	height: calc(100vh - 244px);
	box-sizing: border-box;
	h3 {
		font-size: 28px;
		text-align: center;
	}
	p {
		text-align: center;
	}
	.question {
		width: 80%;
		margin: 20px auto 0;
		padding: 15px;
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.16);
		border-radius: 10px;
		div {
			font-size: 20px;
			color: rgba(0, 0, 0, 0.8);
			margin-bottom: 20px;
		}
		p {
			text-align: left;
			font-size: 14px;
			padding: 10px 0;
			padding-left: 10px;
			margin: 0;
			margin-left: 40px;
			color: #409eff;
			cursor: pointer;
			&:hover {
				color: #409eff;
				background-color: #f0f5ff;
			}
		}
	}
}
</style>
