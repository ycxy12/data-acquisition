<template>
	<div class="container chart">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm" @submit.native.prevent>
			<el-form-item label="实体名称">
				<el-input v-model="queryForm.entityName" placeholder="您可以搜索装备名称/部队名称/战役名称" style="width: 400px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
		<div style="height: calc(100vh - 175px)">
			<RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
			<div v-if="!nodes || nodes.length == 0" class="empty">暂无数据</div>
		</div>
		<!-- 装备详情 -->
		<EquipmentView ref="EquipmentViewRef" />
		<!-- 兵力编成详情 -->
		<BlbcView ref="BlbcViewRef" />
	</div>
</template>

<script>
import RelationGraph from "relation-graph"
import { getQbRelation } from "@/api/home/troops"
import EquipmentView from "../home/Equipment/Type/viewDrawer.vue"
import BlbcView from "../home/Troops/viewDrawer.vue"

const colors = {
	ZB: "#519633",
	BLBC: "#409eff",
	ZL: "#00ced1",
}

const graphOptions = {
	allowShowMiniToolBar: false,
	backgrounImageNoRepeat: true,
	moveToCenterWhenRefresh: true,
	zoomToFitWhenRefresh: true,
	// placeOtherGroup: true,
	debug: false,
	layout: {
		label: "自动布局",
		layoutName: "force",
		// from: "left",
		// layoutClassName: "seeks-layout-center",
		defaultExpandHolderPosition: "hide",
		defaultJunctionPoint: "border",
		force_node_repulsion: 2,
		force_line_elastic: 0.5,
		min_per_width: "300",
		max_per_width: "300",
		min_per_height: "40",
		max_per_height: "60",
	},
}
export default {
	components: { RelationGraph, EquipmentView, BlbcView },
	data() {
		return {
			queryForm: {},
			graphOptions,
			nodes: [],
			lines: [],
			clickCount: 0, // 记录点击次数
			clickTimer: null, // 用于延迟单击事件的定时器
		}
	},
	mounted() {
		this.getQbRelation()
	},
	methods: {
		//搜索
		searchForm() {
			this.getQbRelation()
		},
		//重置搜索条件
		resetForm() {
			this.queryForm = {}
			this.searchForm()
		},
		//获取数据
		async getQbRelation() {
			const { data } = await getQbRelation(this.queryForm)

			let nodes = data.nodes.map((item) => {
				return {
					...item,
					color: colors[item.type],
				}
			})
			this.nodes = Object.freeze(nodes)

			let lines = data.lines
			this.lines = Object.freeze(lines)

			let filteredNodes = nodes
			let filteredLines = lines
			// 限制节点数量
			if (nodes.length >= 100) {
				// 统计每个节点的连接次数
				const nodeConnections = nodes.reduce((acc, node) => {
					acc[node.id] = 0 // 初始化连接次数
					return acc
				}, {})

				lines.forEach((line) => {
					nodeConnections[line.from]++
					nodeConnections[line.to]++
				})

				// 找出只有一条连接线的节点
				const isolatedNodes = Object.keys(nodeConnections).filter((nodeId) => nodeConnections[nodeId] <= 5)

				// 删除节点和与这些节点相关的连线
				filteredNodes = nodes.filter((node) => !isolatedNodes.includes(node.id))
				filteredLines = lines.filter((line) => !isolatedNodes.includes(line.from) && !isolatedNodes.includes(line.to))
			}

			const __graph_json_data = {
				rootId: "2",
				nodes: filteredNodes,
				lines: filteredLines,
			}
			console.log("__graph_json_data:", __graph_json_data)

			console.time("render")
			const rgInstanceRef = this.$refs.graphRef
			rgInstanceRef.setJsonData(__graph_json_data, (graphInstance) => {
				// 这些写上当图谱初始化完成后需要执行的代码.
				// 由于自动布局位置稳定下来需要时间，所以这里在1.8秒后重新让画面居中并缩放
				graphInstance.setZoom(30)
				console.timeEnd("render")
			})
		},
		onNodeClick(nodeObject, $event) {
			this.clickCount++ // 点击次数加 1

			if (this.clickCount === 1 || this.nodes.length <= 100) {
				// 第一次点击，设置定时器
				this.clickTimer = setTimeout(() => {
					this.onSingleClick(nodeObject) // 执行单击事件
					this.clickCount = 0 // 重置点击次数
					console.log("onSingleClick")
				}, 300)
			} else if (this.clickCount === 2) {
				// 第二次点击，清除定时器并执行双击事件
				clearTimeout(this.clickTimer)
				this.onDoubleClick(nodeObject) // 执行双击事件
				console.log("onDoubleClick")

				this.clickCount = 0 // 重置点击次数
			}
		},
		onSingleClick(nodeObject) {
			// console.log("onNodeClick:", nodeObject)
			if (nodeObject.type === "ZB") {
				this.$refs.EquipmentViewRef.openDrawer(nodeObject.id)
			}
			if (nodeObject.type === "BLBC") {
				this.$refs.BlbcViewRef.openDrawer(nodeObject.id)
			}
			if (nodeObject.type === "ZL") {
				this.$router.push(`/home/war/${nodeObject.id}`)
			}
		},
		onDoubleClick(nodeObject) {
			// 找到当前节点
			const node = this.nodes.find((n) => n.id === nodeObject.id)
			if (!node) return

			// 查找与该节点相连接的所有相关节点
			const relatedNodesIds = new Set()
			const relatedLines = this.lines.filter((line) => {
				if (line.from === nodeObject.id) {
					relatedNodesIds.add(line.to)
				} else if (line.to === nodeObject.id) {
					relatedNodesIds.add(line.from)
				}
				return line.from === nodeObject.id || line.to === nodeObject.id
			})

			// 获取所有相关节点
			const relatedNodes = this.nodes.filter((n) => relatedNodesIds.has(n.id))

			const __graph_json_data = {
				rootId: "2",
				nodes: relatedNodes,
				lines: relatedLines,
			}

			const graphInstance = this.$refs.graphRef.getInstance()
			console.log(graphInstance.getLinks())

			graphInstance.addNodes(__graph_json_data.nodes)
			graphInstance.addLines(__graph_json_data.lines)
			graphInstance.refresh()
			graphInstance.setZoom(30)

			// console.time("render")
			// const rgInstanceRef = this.$refs.graphRef
			// rgInstanceRef.appendJsonData(__graph_json_data, (graphInstance) => {
			// 	// 这些写上当图谱初始化完成后需要执行的代码.
			// 	// 由于自动布局位置稳定下来需要时间，所以这里在1.8秒后重新让画面居中并缩放
			// 	graphInstance.setZoom(30)
			// 	console.timeEnd("render")
			// })
		},
		onLineClick(lineObject, $event) {
			console.log("onLineClick:", lineObject)
		},
	},
}
</script>

<style lang="scss" scoped>
.chart {
	margin-top: 0;

	::v-deep .relation-graph .rel-map {
		background-color: transparent;
	}
	.empty {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #909399;
	}
}
</style>
