<template>
	<el-drawer title="实体关系详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
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
import { getZbInfoByid } from "@/api/home/equipment"
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
			entity: {},
		}
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			//获取自己实体信息
			const { data: entity } = await getZbInfoByid(id)
			this.entity = entity

			//获取指向自己的实体关系
			this.getRelationByToId(id)

			this.drawer = true
		},

		//获取指向自己的实体关系
		async getRelationByToId(id) {
			//获取指向自己的实体关系
			const { data } = await listzbRelation({ toId: id })
			//获取线条
			let lines = data.map((item) => {
				return { from: item.fromId, to: item.toId, text: item.text }
			})

			// //获取node节点
			// const { id, name: text } = this.entity
			// let nodes = [{ id, text }]
			// data.forEach(element => {
			//     let item =
			// });

			// let data = {
			// 	nodes: [
			// 		{ id: "1872699409610838018", text: "阿琼MK2主战坦克" },
			// 		{ id: "1872699433065385988", text: "夯锤88mm牵引式加农炮" },
			// 		{ id: "1872699433065385989", text: "M48式76mm山地牵引式加农炮" },
			// 	],
			// 	lines: [
			// 		{ toId: "1872699409610838018", fromId: "1872699433065385988", text: "搭载" },
			// 		{ toId: "1872699409610838018", fromId: "1872699433065385989", text: "搭载" },
			// 	],
			// }

			this.$nextTick(() => {
				this.showGraph()
			})
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
			this.$refs.graphRef.setJsonData(jsonData, (graphInstance) => {
				// Called when the relation-graph is completed
			})
		},
		//新增实体关系
		handleAddRelation() {
			this.$refs.relationDialog.openDialog(this.entity)
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
