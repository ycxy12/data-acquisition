<template>
	<div class="card">
		<button v-for="(item, index) in lists" :key="index" :class="{ active: active === index }" @click="handleClick(index)">{{ item }}</button>
	</div>
</template>

<script>
export default {
	props: {
		// 外部传入的标签数据
		value: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			lists: ["装备战技参数", "兵力编成编组", "经典历史战例"],
		}
	},
	methods: {
		handleClick(index) {
			if (this.active === index) return
			this.active = index
		},
	},
	computed: {
		// 计算属性，获取标签数据，并实现双向绑定
		active: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit("input", val)
			},
		},
	},
}
</script>
<style lang="scss" scoped>
button {
	background: #fff;
	border: 1px solid #dcdfe6;
	color: #606266;
	padding: 12px 20px;
	font-size: 14px;
	border-radius: 4px;
	cursor: pointer;
	margin-right: 20px;
	&:hover {
		border: 1px solid #409eff;
		color: #409eff;
	}
	&.active {
		border: 1px solid #409eff;
		background: #409eff;
		color: #fff;
	}
}
</style>
