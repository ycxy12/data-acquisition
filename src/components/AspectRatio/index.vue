<template>
	<div class="aspect-ratio-box" :style="paddingStyle">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "AspectRatioBox",
	props: {
		ratio: {
			type: Number,
			required: true,
			default: 16 / 9, // 默认宽高比 16:9
		},
	},
	computed: {
		paddingStyle() {
			return {
				paddingBottom: `${(1 / this.ratio) * 100}%`,
			}
		},
	},
}
</script>

<style scoped>
.aspect-ratio-box {
	position: relative;
	width: 100%;
	background-color: #f0f0f0;
}

.content {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
