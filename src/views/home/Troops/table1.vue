<template>
	<div class="container table">
		<div class="btn">
			<el-button icon="el-icon-download" type="primary" @click="handleExport">情报资源导出</el-button>
		</div>
		<div style="height: calc(100vh - 305px)">
			<RelationGraph ref="relationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-node-expand="onNodeExpand" />
		</div>
	</div>
</template>

<script>
import RelationGraph from "relation-graph"
export default {
	components: { RelationGraph },
	props: {
		equipmentTypeId: {
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
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.showSeeksGraph()
		})
	},
	methods: {
		handleExport() {
			console.log("Export")
		},
		onNodeClick(node) {
			console.log("Clicked node:", node)
		},
		onNodeExpand(node) {
			console.log("Expanded node:", node)
		},
		//初始化节点数据
		showSeeksGraph(query) {
			this.graph_json_data = {
				rootId: "0", //根节点唯一id
				nodes: [
					{ id: "0", text: "美军", width: 250, height: 50, color: "#2e4e8f", fontColor: "#ffffff", styleClass: "first_node" },
					{ id: "101", text: "战斗旅" },
					{ id: "102", text: "支援旅" },
					{ id: "103", text: "特种部队旅" },
					{ id: "104", text: "火力支援旅" },
					{ id: "105", text: "军警旅" },
					{ id: "106", text: "后勤支援旅" },
					{ id: "1011", text: "步兵旅战斗队" },
					{ id: "1012", text: "装甲旅战斗队" },
					{ id: "1013", text: "斯特瑞克旅战斗队" },
					{ id: "1014", text: "步兵旅战斗队" },
					{ id: "1021", text: "战区支援旅" },
					{ id: "1022", text: "工兵旅" },
					{ id: "1023", text: "防空炮兵旅" },
					{ id: "1024", text: "军事情报旅" },
					{ id: "1031", text: "特种作战旅" },
					{ id: "1032", text: "游骑兵旅" },
					{ id: "1033", text: "心理作战旅" },
					{ id: "1041", text: "火炮旅" },
					{ id: "1042", text: "导弹旅" },
					{ id: "1043", text: "火箭炮旅" },
					{ id: "1051", text: "宪兵旅" },
					{ id: "1052", text: "军事警察旅" },
					{ id: "1061", text: "后勤保障旅" },
					{ id: "1062", text: "医疗支援旅" },
					{ id: "1063", text: "运输旅" },
				],
				links: [
					{ from: "0", to: "101" },
					{ from: "0", to: "102" },
					{ from: "0", to: "103" },
					{ from: "0", to: "104" },
					{ from: "0", to: "105" },
					{ from: "0", to: "106" },
					{ from: "0", to: "106" },
					{ from: "0", to: "106" },
					{ from: "101", to: "1011" },
					{ from: "101", to: "1012" },
					{ from: "101", to: "1013" },
					{ from: "101", to: "1014" },
					{ from: "102", to: "1021" },
					{ from: "102", to: "1022" },
					{ from: "102", to: "1023" },
					{ from: "102", to: "1024" },
					{ from: "103", to: "1031" },
					{ from: "103", to: "1032" },
					{ from: "103", to: "1033" },
					{ from: "104", to: "1041" },
					{ from: "104", to: "1042" },
					{ from: "104", to: "1043" },
					{ from: "105", to: "1051" },
					{ from: "105", to: "1052" },
					{ from: "106", to: "1061" },
					{ from: "106", to: "1062" },
					{ from: "106", to: "1063" },
				],
			}
			//将根节点渲染进图谱中
			this.$refs.relationGraph.setJsonData(this.graph_json_data, (seeksRGGraph) => {})
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
