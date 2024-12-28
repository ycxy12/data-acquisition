<template>
	<div class="container tree">
		<h3>国家或地区</h3>
		<div class="list">
			<p v-for="item in lists" :key="item.id" :class="{ active: item.id === active }" @click="handleClick(item)">{{ item.name }}</p>
		</div>
	</div>
</template>

<script>
import { listCountry } from "@/api/resource/country"

export default {
	data() {
		return {
			active: undefined,
			lists: [],
		}
	},
	mounted() {
		this.getTreeData()
	},
	watch: {
		active() {
			this.$emit("updateId", this.active)
		},
	},
	methods: {
		//获取列表数据
		async getTreeData() {
			const { data } = await listCountry()
			this.lists = data
			if (data.length > 0) {
				this.active = data[0].id
			}
		},
		//选中
		handleClick(item) {
			this.active = item.id
		},
	},
}
</script>

<style lang="scss" scoped>
.tree {
	width: 280px;
	height: 100%;
	margin-right: 15px;
	h3 {
		margin: 0 15px 10px;
	}
	.list {
		height: calc(100vh - 236px);
		overflow: auto;
		p {
			cursor: pointer;
			padding: 5px 15px;
			margin: 5px;
			color: #606266;
			&:hover {
				background-color: #f5f7fa;
			}
		}
		.active {
			color: #409eff;
			background-color: #f5f7fa;
		}
	}
}
</style>
