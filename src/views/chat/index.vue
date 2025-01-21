<template>
	<div class="content">
		<div class="default" ref="assistantRef">
			<div class="chat_content" ref="scrollTargetRef">
				<h3>情报问答助手</h3>
				<p>您好，我是您的情报问答助手，您可以问我关于装备战技参数、兵力编成编组、经典历史战例相关问题。</p>
				<div class="question card">
					<div>您可以试着问我：</div>
					<p v-for="item in questions" :key="item" @click="handleSend(item)">
						{{ item }}
					</p>
				</div>
				<template v-for="item in lists">
					<ChatQuestion :question="item.question" :key="'question-' + item.id" />
					<ChatAnswer :answer="item.answer" :key="'answer-' + item.id" @update="update" />
				</template>
			</div>

			<!-- 用于检测是否滚动到底部 -->
			<div ref="bottomMarker" class="bottom-marker"></div>
		</div>
		<ChatInput v-model="message" :loading="loading" @send="handleSend" />
		<!-- 返回顶部 -->
		<el-backtop target=".default"></el-backtop>
	</div>
</template>
<script>
import ChatInput from "./components/chatInput.vue"
import ChatQuestion from "./ChatQuestion.vue"
import ChatAnswer from "./ChatAnswer.vue"
import { qaChat } from "@/api/chat/chat"
import dayjs from "dayjs"

export default {
	components: { ChatInput, ChatQuestion, ChatAnswer },
	data() {
		return {
			loading: false,
			message: "",
			lists: [],
			questions: ["美国海军部下级有哪些?", "常胜者主战坦克", "长津湖战役"],
			isUserScrolling: false, // 用户是否主动滚动
		}
	},
	mounted() {
		this.setupObserver()
	},
	methods: {
		async handleSend(message) {
			this.loading = true
			this.lists.push({ id: dayjs().valueOf(), question: message, answer: "" })

			const { msg } = await qaChat({ problem: message })
			this.lists[this.lists.length - 1].answer = msg

			//自动滚动到最下面
			let _this = this
			setTimeout(() => {
				const assistantRef = _this.$refs.assistantRef
				assistantRef.scrollTo({
					top: assistantRef.scrollHeight,
					behavior: "smooth", // 平滑滚动
				})
			}, 10)
		},
		scrollToBottom() {
			const assistantRef = this.$refs.assistantRef
			this.isUserScrolling = assistantRef.scrollTop + assistantRef.clientHeight < assistantRef.scrollHeight - 100
			if (!this.isUserScrolling) {
				assistantRef.scrollTo({
					top: assistantRef.scrollHeight,
					behavior: "smooth", // 平滑滚动
				})
			}
		},

		setupObserver() {
			let _this = this
			const observer = new IntersectionObserver(
				(entries) => {
					_this.scrollToBottom()
				},
				{
					root: _this.$refs.assistantRef, // 确保该元素可以滚动
					rootMargin: "10px", // 可调整观察边距
					threshold: [0, 1.0], // 部分进入视口和完全进入视口均触发
				}
			)

			const bottomMarker = this.$refs.bottomMarker
			if (bottomMarker) observer.observe(bottomMarker)
		},
		update() {
			this.loading = false
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
}
.default {
	width: 100%;
	height: calc(100vh - 244px);
	box-sizing: border-box;
	// padding-bottom: 50px;
	overflow-y: auto;
	// width: 100%;
	// margin: 0 auto;
	// padding-top: 5%;
	// max-width: 1000px;
	// height: calc(100vh - 244px);
	// box-sizing: border-box;
	h3 {
		color: #fff;
		font-size: 28px;
		text-align: center;
	}
	p {
		color: #fff;
		text-align: center;
	}
	.question {
		width: 80%;
		margin: 20px auto 0;
		padding: 15px;
		border-radius: 10px;
		div {
			font-size: 20px;
			color: rgba(255, 255, 255, 0.8);
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
			border-radius: 4px;
			cursor: pointer;
			&:hover {
				color: #409eff;
				background-color: #f0f5ff;
			}
		}
	}
	.chat_content {
		margin: 0 auto;
		width: 100%;
		max-width: 1000px;
		padding: 0 52px;
		padding-top: 5%;

		&::-webkit-scrollbar {
			display: none;
		}
	}
}
.bottom-marker {
	height: 1px; /* 占位高度 */
	visibility: hidden; /* 不显示 */
}
</style>
