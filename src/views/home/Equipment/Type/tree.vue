<template>
	<div
		class="container tree"
		v-loading="loading"
		element-loading-text="拼命加载中"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.5)"
	>
		<h3>装备类型</h3>
		<div class="list">
			<el-tree ref="tree" :data="lists" :props="props" node-key="id" highlight-current @node-click="handleNodeClick"></el-tree>
		</div>
	</div>
</template>

<script>
import { listZbTypeTreeAndInfo } from "@/api/resource/equipment"

export default {
	data() {
		return {
			lists: [],
			props: {
				label: "name",
				children: "children",
			},
			loading: false,
		}
	},
	created() {
		this.loadNode()
	},
	methods: {
		async loadNode() {
			this.loading = true
			const { data } = await listZbTypeTreeAndInfo()
			this.loading = false
			this.lists = data
			this.$nextTick(() => {
				if (this.$refs.tree && data.length) {
					this.$refs.tree.setCurrentKey(data[0].id) // 高亮
					this.$emit("updateId", data[0])
				}
			})
		},
		//选中
		handleNodeClick(data) {
			this.$emit("updateId", data)
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
		color: #fff;
		margin: 0 15px 10px;
	}
	.list {
		height: calc(100vh - 236px);
		overflow: auto;
	}
}
::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
	color: #409eff;
}
</style>
