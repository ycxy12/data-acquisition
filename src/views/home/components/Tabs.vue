<template>
	<div class="card">
		<button v-for="item in lists" :key="item.path" :class="{ active: active.includes(item.path) }" @click="handleClick(item)">
			{{ item.name }}
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			lists: [
				{ name: "装备战技参数", path: "/home/equipment" },
				{ name: "兵力编成编组", path: "/home/troops" },
				{ name: "经典历史战例", path: "/home/war" },
			],
		}
	},
	methods: {
		// 点击标签切换路由
		handleClick(item) {
			if (this.active === item.path) return
			this.$router.push(item.path)
		},
	},
	computed: {
		//计算属性，获取当前路由
		active() {
			return this.$route.path
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
