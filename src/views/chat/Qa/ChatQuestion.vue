<template>
	<div class="chat_question">
		<img src="@/assets/images/user.png" alt="" />
		<div class="content">{{ question }}</div>
	</div>
</template>

<script>
export default {
	props: {
		question: {
			type: String,
			default: "",
		},
	},
}
</script>

<style lang="scss" scoped>
.chat_question {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	max-width: 1000px;
	margin: 18px auto;
	position: relative;
	img {
		position: absolute;
		top: 6px;
		right: -42px;
		width: 32px;
		height: 32px;
	}
	.content {
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
