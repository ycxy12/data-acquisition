<template>
	<div class="chat_answer">
		<!-- <img src="@/assets/images/ai.png" alt="" /> -->
		<!-- <div class="await_answer">{{ answer }}</div> -->
		<svg-icon name="logo" />
		<markdown-it-vue class="await_answer card" :content="answer" />
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
	::v-deep .markdown-body {
		color: #fff;
	}
}
</style>
