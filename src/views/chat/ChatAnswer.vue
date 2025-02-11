<template>
	<div class="chat_answer">
		<!-- <img src="@/assets/images/ai.png" alt="" /> -->
		<!-- <div class="await_answer">{{ answer }}</div> -->
		<svg-icon name="logo" />
		<p v-if="answer.includes('<p>')" v-html="displayedAnswer"></p>
		<markdown-it-vue v-else class="await_answer card" :content="displayedAnswer" />
	</div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue"
import "markdown-it-vue/dist/markdown-it-vue.css"

export default {
	components: { MarkdownItVue },
	props: {
		answer: {
			type: String,
			default: "",
		},
		pause: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			displayedAnswer: "",
			typingInterval: null,
		}
	},
	watch: {
		answer: {
			immediate: true,
			handler(newAnswer) {
				this.displayedAnswer = ""
				if (this.typingInterval) clearInterval(this.typingInterval)

				if (!newAnswer) return

				let index = 0
				this.typingInterval = setInterval(() => {
					if (this.pause) {
						clearInterval(this.typingInterval)
						return
					}
					if (index < newAnswer.length) {
						this.displayedAnswer += newAnswer[index++]
					} else {
						this.$emit("update")
						clearInterval(this.typingInterval)
					}
				}, 1) // 每个字符间隔时间（毫秒）
			},
		},
	},
	beforeDestroy() {
		if (this.typingInterval) clearInterval(this.typingInterval)
	},
}
</script>

<style lang="scss" scoped>
.chat_answer {
	display: flex;
	align-items: center;
	width: 100%;
	max-width: 1000px;
	margin: 18px auto;
	position: relative;
	img,
	.svg-icon {
		position: absolute;
		top: 6px;
		left: -42px;
		width: 38px;
		height: 38px;
	}
	.await_answer {
		max-width: 100%;
		font-weight: 300;
		line-height: 24px;
		padding: 10px 20px;
		border-radius: 10px;
	}
	p {
		color: #fff;
		line-height: 30px;
	}
	::v-deep .markdown-body {
		color: #fff;
	}
}
</style>
