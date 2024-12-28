<template>
	<div class="container tree">
		<h3>装备类型</h3>
		<div class="list">
			<el-tree ref="tree" lazy :load="loadNode" :props="props" node-key="id" highlight-current @node-click="handleNodeClick"></el-tree>
		</div>
	</div>
</template>

<script>
import { listZbType } from "@/api/resource/equipment"
import { listZbInfo } from "@/api/home/equipment"

export default {
	data() {
		return {
			lists: [],
			props: {
				label: "name",
				isLeaf: "isLeaf",
				children: "children",
			},
		}
	},
	methods: {
		async loadNode(node, resolve) {
			//如果展开第一级节点，从后台加载一级节点列表
			if (node.level === 0) {
				const { data } = await listZbType()
				this.$nextTick(() => {
					this.$refs.tree.setCurrentKey(data[0].id) // 高亮
					this.$emit("updateId", data[0])
				})
				return resolve(data)
			}
			//如果展开其他级节点，动态从后台加载下一级节点列表
			if (node.level === 1) {
				let params = { pageNum: 1, pageSize: 100, type: node.data.id }
				const { rows } = await listZbInfo(params)
				const children = rows.map((item) => {
					return { id: item.id, name: item.name, isLeaf: true }
				})
				return resolve(children)
			}
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
