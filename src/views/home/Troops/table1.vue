<template>
	<div class="container table">
		<div class="btn">
			<el-button icon="el-icon-download" type="primary" @click="handleExport">情报资源导出</el-button>
		</div>
		<div
			style="height: calc(100vh - 305px)"
			v-loading="loading"
			stripe
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
		>
			<RelationGraph ref="relationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-node-expand="onNodeExpand" />
		</div>
		<ViewDrawer ref="viewDrawerRef" />
	</div>
</template>

<script>
import RelationGraph from "relation-graph"
import { getBlBcTreeByCountryId } from "@/api/resource/country"
import { exportBlbc, importInfoV2 } from "@/api/home/troops"
import ViewDrawer from "./viewDrawer.vue"
import { downloadBlob } from "@/utils"

export default {
	components: { RelationGraph, ViewDrawer },
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
						from: "left"
					},
				],
				allowShowMiniToolBar: false,
				defaultNodeShape: 1,
				defaultExpandHolderPosition: "right", //节点展开关闭的按钮位置
				defaultLineShape: 4,
				defaultJunctionPoint: "lr", //
				defaultNodeBorderWidth: 0.2, //节点边框粗细
				defaultLineColor: "#4ea2f0",
				defaultNodeColor: "#4ea2f0",
				defaultNodeWidth: "180", //节点宽度
				defaultNodeHeight: "50", //节点高度
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
			this.graph_json_data = Object.freeze(data)
			// 使用转换函数
			const transformedData = this.transformTree(data, 2)
			let graph_json_data = {
				rootId: data.id,
				...transformedData,
			}
			this.$refs.relationGraph &&
				this.$refs.relationGraph.setJsonData(graph_json_data, (seeksRGGraph) => {
					this.loading = false
				})
		},
		async handleExport() {
			const loading = this.$loading({
				lock: true,
				text: "等待下载中，请稍等",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			})
			const response = await exportBlbc(this.countryId)
			downloadBlob(response)
			loading.close()
		},
		onNodeClick(node) {
			if (!node.styleClass) this.$refs.viewDrawerRef.openDrawer(node.id)
		},
		//点击展开节点
		onNodeExpand(node) {
			this.loading = true
			const data = this.findNodeById(this.graph_json_data, node.id)
			const transformedData = this.transformTree(data, 2)
			let graph_json_data = {
				rootId: this.graph_json_data.id,
				...transformedData,
			}
			this.$refs.relationGraph.appendJsonData(graph_json_data, (seeksRGGraph) => {
				this.loading = false
			})
		},
		transformTree(tree, maxLevel = 3) {
			const result = { nodes: [], lines: [] }

			// 递归遍历树，maxLevel 限制最大层级
			function traverse(node, parentId = null, level = 1) {
				if (level > maxLevel) return // 超过最大层级时停止递归

				if (parentId) {
					// 将当前节点加入 nodes
					if (node.children && node.children.length > 0) {
						result.nodes.push({
							id: node.id,
							text: node.troopsName || "",
							expandHolderPosition: "right",
							expanded: level === maxLevel ? false : true,
						})
					} else {
						result.nodes.push({ id: node.id, text: node.troopsName || "" })
					}

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
					node.blbcTroopsList.forEach((child) => traverse(child, node.id, level + 1))
				}

				if (node.children) {
					node.children.forEach((child) => traverse(child, node.id, level + 1))
				}
			}

			// 开始递归遍历根节点
			traverse(tree)

			return result
		},

		findNodeById(tree, id) {
			// 如果当前节点的 id 和目标 id 匹配，返回当前节点
			if (tree.id === id) {
				return tree
			}

			// 如果当前节点有子节点，递归查找子节点
			let result = null

			if (tree.blbcTroopsList) {
				for (let child of tree.blbcTroopsList) {
					result = this.findNodeById(child, id)
					if (result) return result // 如果找到了节点，直接返回
				}
			}

			if (tree.children) {
				for (let child of tree.children) {
					result = this.findNodeById(child, id)
					if (result) return result // 如果找到了节点，直接返回
				}
			}

			// 如果未找到，返回 null
			return null
		},
		//导入
		handleChange(file, fileList) {
			let formData = new FormData()
			formData.append("file", file.raw)
			importInfoV2(formData)
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
		// border-bottom: 1px solid #e4e7ed;
	}
	::v-deep .relation-graph .rel-map {
		background-color: transparent;
	}
	::v-deep .relation-graph .c-rg-line-bg {
		stroke: transparent;
	}
	::v-deep .relation-graph .c-node-text {
		// writing-mode: vertical-rl;
		letter-spacing: 2px;
	}
	::v-deep .relation-graph .first_node .c-node-text {
		writing-mode: rl;
		font-size: 18px;
		font-weight: 600;
	}
}
</style>
