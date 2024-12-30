<template>
	<div class="container table">
		<div class="btn">
			<el-button icon="el-icon-download" type="primary" @click="handleExport">情报资源导出</el-button>
		</div>
		<div style="height: calc(100vh - 305px)" v-loading="loading">
			<RelationGraph ref="relationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-node-expand="onNodeExpand" />
		</div>
	</div>
</template>

<script>
import RelationGraph from "relation-graph"
import { getBlBcTreeByCountryId } from "@/api/resource/country"

export default {
	components: { RelationGraph },
	props: {
		countryId: {
			type: String,
			default: undefined,
		},
	},
	data() {
		return {
			//关系图属性配置（重要）
			graphOptions: {
				layouts: [
					{
						label: "中心",
						layoutName: "tree",
						layoutClassName: "seeks-layout-center",
						defaultJunctionPoint: "border",
						defaultNodeShape: 0,
						defaultLineShape: 1,
					},
				],
				allowShowMiniToolBar: false,
				defaultNodeShape: 1,
				defaultExpandHolderPosition: "bottom", //节点展开关闭的按钮位置
				defaultLineShape: 4,
				defaultJunctionPoint: "tb", //
				defaultNodeBorderWidth: 0.2, //节点边框粗细
				defaultLineColor: "#4ea2f0",
				defaultNodeColor: "#4ea2f0",
				defaultNodeWidth: "50", //节点宽度
				defaultNodeHeight: "150", //节点高度
				defaultFocusRootNode: false,
				moveToCenterWhenResize: false,
			},
			graph_json_data: {}, //节点的数据
			loading: false,
		}
	},
	watch: {
		countryId: {
			handler(newVal) {
				this.getTroopsByCountry(newVal)
			},
		},
	},
	methods: {
		//通过国家/地区获取兵力编成编组
		async getTroopsByCountry(countryId) {
			this.loading = true
			const { data } = await getBlBcTreeByCountryId(countryId)
			// 使用转换函数
			const transformedData = this.transformTree(data)
			this.graph_json_data = {
				rootId: data.id,
				...transformedData,
			}
			this.$refs.relationGraph.setJsonData(this.graph_json_data, (seeksRGGraph) => {
				this.loading = false
			})
		},
		handleExport() {
			console.log("Export")
		},
		onNodeClick(node) {
			console.log("Clicked node:", node)
		},
		onNodeExpand(node) {
			console.log("Expanded node:", node)
		},
		transformTree(tree) {
			const result = { nodes: [], lines: [] }
			function traverse(node, parentId = null) {
				if (parentId) {
					// 将当前节点加入 nodes
					result.nodes.push({ id: node.id, text: node.troopsName || "" })
					// 如果有父节点，加入一条线
					result.lines.push({ from: parentId, to: node.id })
				} else {
					result.nodes.push({
						id: node.id,
						text: node.name || "",
						width: 250,
						height: 50,
						color: "#2e4e8f",
						fontColor: "#ffffff",
						styleClass: "first_node",
					})
				}
				// 如果有子节点，递归处理
				if (node.blbcTroopsList) {
					node.blbcTroopsList.forEach((child) => traverse(child, node.id))
				}
				// 如果有子节点，递归处理
				if (node.children) {
					node.children.forEach((child) => traverse(child, node.id))
				}
			}
			// 递归遍历树的根节点
			traverse(tree)

			return result
		},
	},
}
</script>
<style lang="scss" scoped>
.table {
	flex: 1;
	.btn {
		display: flex;
		justify-content: flex-end;
		padding-bottom: 15px;
		border-bottom: 1px solid #e4e7ed;
	}
	::v-deep .relation-graph .c-node-text {
		writing-mode: vertical-rl;
		letter-spacing: 2px;
	}
	::v-deep .relation-graph .first_node .c-node-text {
		writing-mode: rl;
		font-size: 18px;
		font-weight: 600;
	}
}
</style>
