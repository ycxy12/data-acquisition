<template>
	<div class="container chart">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="实体名称">
				<el-input v-model="queryForm.entityName" placeholder="请输入实体名称"></el-input>
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
		layoutClassName: "seeks-layout-center",
		defaultExpandHolderPosition: "hide",
		defaultJunctionPoint: "border",
		force_node_repulsion: 2,
		force_line_elastic: 0.5,
	},
}
export default {
	components: { RelationGraph, EquipmentView, BlbcView },
	data() {
		return {
			queryForm: {},
			graphOptions,
			nodes: [],
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
			this.nodes = Object.freeze(data.nodes)
			const nodes = data.nodes.map((item) => {
				return {
					...item,
					color: colors[item.type],
				}
			})
			const __graph_json_data = {
				rootId: "2",
				nodes,
				lines: data.lines,
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
			console.log("onNodeClick:", nodeObject)
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
