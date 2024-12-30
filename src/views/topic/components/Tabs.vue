<template>
	<div class="card">
		<button v-for="(item, index) in lists" :key="index" :class="{ active: active === index }" @click="handleClick(index)">{{ item }}</button>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			lists: ["我的订阅", "全部专题"],
		}
	},
	methods: {
		// 点击标签切换路由
		handleClick(active) {
			if (this.active === active) return
			this.active = active
		},
	},
	computed: {
		//实现双向绑定
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
