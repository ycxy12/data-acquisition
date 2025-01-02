<template>
	<div class="chat_answer">
		<img src="@/assets/images/ai.png" alt="" />
		<!-- <div class="await_answer">{{ answer }}</div> -->
		<markdown-it-vue class="await_answer" :content="answer" />
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
	img {
		position: absolute;
		top: 6px;
		left: -42px;
		width: 32px;
		height: 32px;
	}
	.await_answer {
		max-width: 100%;
		font-weight: 300;
		color: rgba(0, 0, 0, 0.8);
		line-height: 24px;
		padding: 10px 20px;
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.16);
		border-radius: 10px;
	}
}
</style>
