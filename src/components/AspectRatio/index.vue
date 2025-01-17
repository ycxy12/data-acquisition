<template>
	<div class="aspect-ratio-box" :style="paddingStyle">
		<div class="content" :style="{ backgroundImage: `url(${currentCover})` }">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import defaultImage from "./123.png"

export default {
	name: "AspectRatioBox",
	props: {
		ratio: {
			type: Number,
			required: true,
			default: 16 / 9, // 默认宽高比 16:9
		},
		cover: {
			type: String,
			default: "./123.png",
		},
	},
	data() {
		return {
			currentCover: this.cover, // 当前图片地址，默认是传入的 cover
		}
	},
	computed: {
		paddingStyle() {
			return {
				paddingBottom: `${(1 / this.ratio) * 100}%`,
			}
		},
	},
	methods: {
		checkCoverValidity() {
			const img = new Image()
			img.src = this.cover
			img.onerror = () => {
				this.currentCover = defaultImage // 如果 cover 加载失败，切换为默认图片
			}
		},
	},
	watch: {
		cover: {
			immediate: true,
			handler() {
				this.currentCover = this.cover // 重置为新的 cover
				this.checkCoverValidity() // 检查有效性
			},
		},
	},
}
</script>

<style scoped>
.aspect-ratio-box {
	position: relative;
	width: 100%;
	/* background-color: #f0f0f0;F */
}

.content {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/* background-color: #ccc; */
	display: flex;
	justify-content: center;
	align-items: center;
	background-size: cover;
	background-position: center;
}
</style>
