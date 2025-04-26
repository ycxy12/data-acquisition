<template>
	<div class="card">
		<button v-for="item in lists" :key="item.path" :class="{ active: active === item.path }" @click="handleClick(item)">{{ item.name }}</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			lists: [
				{ name: "装备类型管理", path: "/resource/equipment" },
				{ name: "国家/地区管理", path: "/resource/country" },
				{ name: "兵力编成编组管理", path: "/resource/troops" },
				{ name: "所属战争管理", path: "/resource/war" },
				{ name: "数据导入", path: "/resource/upload" },
				{ name: "MQ设置", path: "/resource/mq" },
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
