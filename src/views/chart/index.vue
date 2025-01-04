<template>
	<div class="container chart">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="实体名称">
				<el-input v-model="queryForm.name" placeholder="请输入实体名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
		<div style="height: calc(100vh - 175px)">
			<RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
		</div>
	</div>
</template>

<script>
import RelationGraph from "relation-graph"

const graphOptions = {
	allowShowMiniToolBar: false,
	backgrounImageNoRepeat: true,
	moveToCenterWhenRefresh: true,
	zoomToFitWhenRefresh: true,
	placeOtherGroup: true,
	debug: false,
	layout: {
		label: "中心",
		layoutName: "center",
		from: "left",
		layoutClassName: "seeks-layout-center",
		defaultExpandHolderPosition: "hide",
		defaultJunctionPoint: "border",
	},
}
export default {
	components: { RelationGraph },
	data() {
		return {
			queryForm: {},
			graphOptions,
		}
	},
	mounted() {
		this.showGraph()
	},
	methods: {
		//搜索
		searchForm() {},
		//重置搜索条件
		resetForm() {
			this.queryForm = {}
			this.searchForm()
		},
		showGraph() {
			const __graph_json_data = {
				rootId: "2",
				nodes: [
					{
						id: "2",
						text: "ALTXX",
						data: null,
					},
					{
						id: "3",
						text: "CH2 TTN",
						data: null,
					},
					{
						id: "4",
						text: "CH1 AlCu",
						data: null,
					},
					{
						id: "5",
						text: "MainFrame",
						data: null,
					},
					{
						id: "6",
						text: "TestMainSys",
						data: null,
					},
					{
						id: "7",
						text: "汽车部件",
						data: null,
					},
					{
						id: "8",
						text: "汽车工艺",
						data: null,
					},
					{
						id: "9",
						text: "过程质检",
						data: null,
					},
					{
						id: "10",
						text: "卓立制造",
						data: null,
					},
					{
						id: "11",
						text: "压电开关",
						data: null,
					},
					{
						id: "12",
						text: "电子产品",
						data: null,
					},
					{
						id: "13",
						text: "集成电路",
						data: null,
					},
					{
						id: "14",
						text: "ArHigh",
						data: null,
					},
					{
						id: "15",
						text: "ArLow",
						data: null,
					},
					{
						id: "16",
						text: "ShowerHead",
						data: null,
					},
					{
						id: "17",
						text: "CrypoPump",
						data: null,
					},
					{
						id: "18",
						text: "DryPump",
						data: null,
					},
					{
						id: "19",
						text: "Ti Target",
						data: null,
					},
					{
						id: "20",
						text: "N2",
						data: null,
					},
					{
						id: "21",
						text: "Shutter",
						data: null,
					},
					{
						id: "22",
						text: "Cool Chbr",
						data: null,
					},
					{
						id: "23",
						text: "Transfer Chbr",
						data: null,
					},
					{
						id: "24",
						text: "Alignment Unit",
						data: null,
					},
					{
						id: "25",
						text: "齿轮箱",
						data: null,
					},
					{
						id: "26",
						text: "车门内部人工涂蜡",
						data: null,
					},
					{
						id: "27",
						text: "原材料检验",
						data: null,
					},
					{
						id: "28",
						text: "地板RTV硅胶密封",
						data: null,
					},
					{
						id: "29",
						text: "热保护焊接",
						data: null,
					},
					{
						id: "30",
						text: "电热管导线焊接",
						data: null,
					},
					{
						id: "31",
						text: "温控器安装",
						data: null,
					},
					{
						id: "32",
						text: "蒸汽硅胶座配装",
						data: null,
					},
					{
						id: "33",
						text: "温度调试",
						data: null,
					},
					{
						id: "34",
						text: "压电开关的模型塑料外壳",
						data: null,
					},
					{
						id: "35",
						text: "安装开关",
						data: null,
					},
					{
						id: "36",
						text: "ASIC IC",
						data: null,
					},
					{
						id: "37",
						text: "SENSOR",
						data: null,
					},
					{
						id: "38",
						text: "CON",
						data: null,
					},
					{
						id: "39",
						text: "Flash",
						data: null,
					},
					{
						id: "40",
						text: "Flite",
						data: null,
					},
				],
				lines: [
					{
						from: "2",
						to: "5",
						text: "子系统",
						data: null,
					},
					{
						from: "2",
						to: "3",
						text: "子系统",
						data: null,
					},
					{
						from: "2",
						to: "4",
						text: "子系统",
						data: null,
					},
					{
						from: "3",
						to: "21",
						text: "子系统",
						data: null,
					},
					{
						from: "3",
						to: "20",
						text: "子系统",
						data: null,
					},
					{
						from: "3",
						to: "19",
						text: "子系统",
						data: null,
					},
					{
						from: "4",
						to: "18",
						text: "子系统",
						data: null,
					},
					{
						from: "4",
						to: "17",
						text: "子系统",
						data: null,
					},
					{
						from: "4",
						to: "16",
						text: "子系统",
						data: null,
					},
					{
						from: "4",
						to: "15",
						text: "子系统",
						data: null,
					},
					{
						from: "4",
						to: "14",
						text: "子系统",
						data: null,
					},
					{
						from: "5",
						to: "24",
						text: "子系统",
						data: null,
					},
					{
						from: "5",
						to: "23",
						text: "子系统",
						data: null,
					},
					{
						from: "5",
						to: "22",
						text: "子系统",
						data: null,
					},
					{
						from: "6",
						to: "13",
						text: "子系统",
						data: null,
					},
					{
						from: "6",
						to: "12",
						text: "子系统",
						data: null,
					},
					{
						from: "6",
						to: "11",
						text: "子系统",
						data: null,
					},
					{
						from: "6",
						to: "9",
						text: "子系统",
						data: null,
					},
					{
						from: "6",
						to: "8",
						text: "子系统",
						data: null,
					},
					{
						from: "6",
						to: "7",
						text: "子系统",
						data: null,
					},
					{
						from: "7",
						to: "25",
						text: "子系统",
						data: null,
					},
					{
						from: "8",
						to: "26",
						text: "子系统",
						data: null,
					},
					{
						from: "9",
						to: "27",
						text: "子系统",
						data: null,
					},
					{
						from: "10",
						to: "33",
						text: "子系统",
						data: null,
					},
					{
						from: "10",
						to: "32",
						text: "子系统",
						data: null,
					},
					{
						from: "10",
						to: "31",
						text: "子系统",
						data: null,
					},
					{
						from: "10",
						to: "30",
						text: "子系统",
						data: null,
					},
					{
						from: "10",
						to: "29",
						text: "子系统",
						data: null,
					},
					{
						from: "10",
						to: "28",
						text: "子系统",
						data: null,
					},
					{
						from: "11",
						to: "35",
						text: "子系统",
						data: null,
					},
					{
						from: "11",
						to: "34",
						text: "子系统",
						data: null,
					},
					{
						from: "12",
						to: "39",
						text: "子系统",
						data: null,
					},
					{
						from: "12",
						to: "38",
						text: "子系统",
						data: null,
					},
					{
						from: "12",
						to: "37",
						text: "子系统",
						data: null,
					},
					{
						from: "12",
						to: "36",
						text: "子系统",
						data: null,
					},
					{
						from: "13",
						to: "40",
						text: "子系统",
						data: null,
					},
				],
			}
			const rgInstanceRef = this.$refs.graphRef
			rgInstanceRef.setJsonData(__graph_json_data, (graphInstance) => {
				// 这些写上当图谱初始化完成后需要执行的代码.
				// 由于自动布局位置稳定下来需要时间，所以这里在1.8秒后重新让画面居中并缩放
				setTimeout(async () => {
					await graphInstance.setZoom(100)
					await graphInstance.moveToCenter()
					await graphInstance.zoomToFit()
				}, 1800)
			})
		},
		onNodeClick(nodeObject, $event) {
			console.log("onNodeClick:", nodeObject)
			// this.graphOptions.layouts = [
			//   {
			//     layoutName: 'center'
			//   }
			// ]
			// this.$refs.graphRef.setOptions(this.graphOptions)
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
}
</style>
