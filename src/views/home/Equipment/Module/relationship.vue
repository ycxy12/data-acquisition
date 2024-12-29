<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<div class="btn">
			<el-button type="primary" @click="handleAddRelation">新增实体关系</el-button>
		</div>
		<div style="height: calc(100vh - 155px)">
			<RelationGraph ref="graphRef" :options="graphOptions" />
		</div>
		<RelationDialog ref="relationDialog" />
	</el-drawer>
</template>

<script>
import RelationGraph from "relation-graph"
import { listzbRelation, getZbModuleByid } from "@/api/home/module"
import RelationDialog from "./relationDialog.vue"

export default {
	components: { RelationGraph, RelationDialog },
	data() {
		return {
			drawer: false,
			direction: "rtl",
			graphOptions: {
				defaultJunctionPoint: "border",
				// 这里可以参考"Graph 图谱"中的参数进行设置 https://www.relation-graph.com/#/docs/graph
			},
			selfEntity: {},
		}
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			//获取自己实体信息
			const { data: entityData } = await getZbModuleByid(id)
			this.selfEntity = entityData
			//获取指向自己的实体关系
			const { data } = await listzbRelation({ toId: "1872699409610838018" })
			// this.ruleForm = data
			this.drawer = true
			this.$nextTick(() => {
				this.showGraph()
			})
		},
		//新增实体关系
		handleAddRelation() {
			this.$refs.relationDialog.openDialog(this.selfEntity)
		},
		showGraph() {
			const jsonData = {
				rootId: "a",
				nodes: [
					{ id: "a", text: "A", borderColor: "yellow" },
					{ id: "b", text: "B", color: "#43a2f1", fontColor: "yellow" },
					{ id: "c", text: "C", nodeShape: 1, width: 80, height: 60 },
					{ id: "e", text: "E", nodeShape: 0, width: 150, height: 150 },
				],
				lines: [
					{ from: "a", to: "b", text: "关系1", color: "#43a2f1" },
					{ from: "a", to: "c", text: "关系2" },
					{ from: "a", to: "e", text: "关系3" },
					{ from: "b", to: "e", color: "#67C23A" },
				],
			}
			// 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
			console.log(this.$refs.graphRef)

			this.$refs.graphRef.setJsonData(jsonData, (graphInstance) => {
				// Called when the relation-graph is completed
			})
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
		},
	},
}
</script>

<style lang="scss" scoped>
.btn {
	display: flex;
	justify-content: flex-end;
	padding-bottom: 15px;
}
</style>
