<template>
	<el-drawer title="实体关系" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<div class="btn">
			<el-button type="primary" size="small" @click="handleAdd">新增实体关系</el-button>
		</div>
		<div style="height: calc(100vh - 145px)">
			<RelationGraph ref="graphRef" :options="graphOptions" />
		</div>
		<RelationDialog ref="relationDialogRef" @update="handleUpdate" />
	</el-drawer>
</template>

<script>
import RelationGraph from "relation-graph"
import { listZbTypeTreeAndInfo, listZbTypeTree } from "@/api/resource/equipment"
import { listzbRelation, updatezbRelation } from "@/api/home/module"
import { getZbInfoByid } from "@/api/home/equipment"
import RelationDialog from "./relationDialog.vue"

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
	},
}

export default {
	components: { RelationGraph, RelationDialog },
	data() {
		return {
			drawer: false,
			direction: "rtl",
			graphOptions,
			id: undefined,
			homeData: {},
			relationList: [],
		}
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			this.id = id
			this.getRelationByToId(id)
			this.drawer = true
		},
		//获取指向自己的实体关系
		async getRelationByToId(id) {
			let _this = this
			//获取自己实体信息
			const { data: homeData } = await getZbInfoByid(id)
			//获取指向自己的实体关系
			const { data } = await listzbRelation({ toId: id })
			//保存关系数据
			this.relationList = data
			let requestApi = []
			data.forEach((element) => {
				requestApi.push(getZbInfoByid(element.fromId))
			})
			Promise.all(requestApi).then((res) => {
				console.log(res, homeData)
				let nodes = []
				let lines = []
				nodes.push({ id: homeData.id, text: homeData.name })
				//挂在节点

				res.forEach((item, index) => {
					if (item.data) {
						nodes.push({ id: item.data.id, text: item.data.name })
						lines.push({ from: item.data.id, to: homeData.id, text: data[index].text })
					}
				})
				console.log(nodes, lines)

				const __graph_json_data = {
					rootId: id,
					nodes,
					lines,
				}
				const rgInstanceRef = _this.$refs.graphRef
				rgInstanceRef.setJsonData(__graph_json_data, (graphInstance) => {
					// 这些写上当图谱初始化完成后需要执行的代码.
					graphInstance.setZoom(80)
				})
			})
		},
		//提交表单
		async handleUpdate() {
			this.getRelationByToId(this.id)
		},
		//新增实体关系
		handleAdd() {
			this.$refs.relationDialogRef.openDialog(this.id)
		},

		//关闭抽屉
		handleClose() {
			this.drawer = false
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
