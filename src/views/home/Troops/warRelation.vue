<template>
	<el-drawer title="战例关系" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="战例" prop="warfareExamplesIds">
				<virtual-scroller v-model="ruleForm.warfareExamplesIds" />
			</el-form-item>
			<el-form-item label="兵力编成编组" prop="blbcName">
				<el-input v-model="ruleForm.blbcName" placeholder="请输入兵力编成编组" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="关系描述" prop="text">
				<el-input v-model="ruleForm.text" placeholder="请输入关系描述"></el-input>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { dropDownWarfareExamples, listWarfareExamples } from "@/api/home/war"
import { getBlbcByid } from "@/api/resource/troops"
import { setBlbcWarfareExamplesRelation, getBlbcWarfareExamplesRelation } from "@/api/home/troops"
import VirtualScroller from "./components/virtualScroller.vue"

export default {
	components: { VirtualScroller },
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {
				warfareExamplesIds: [],
			},
			rules: {
				warfareExamplesIds: [{ required: true, message: "请选择战例", trigger: "change" }],
				blbcName: [{ required: true, message: "请选择兵力编成编组", trigger: "change" }],
			},
			// options: [],
			options: Array.from({ length: 1000 }, (_, index) => ({
				id: index,
				name: `Option ${index + 1}`,
				value: index + 1,
			})),
		}
	},
	computed: {
		visibleOptions() {
			// You can add any custom logic to determine visible options here
			return this.options.slice(0, 10) // For example, just show the first 10 options
		},
	},
	mounted() {
		// this.getWarfareExamples()
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			//获取自己实体信息
			const { data } = await getBlbcByid(id)
			this.ruleForm.blbcId = data.id
			this.ruleForm.blbcName = data.troopsName

			//获取指向自己的实体关系
			this.getBlbcWarfareExamplesRelation(id)
			this.drawer = true
		},

		//获取指向自己的实体关系
		async getBlbcWarfareExamplesRelation(id) {
			//获取指向自己的实体关系
			const { data } = await getBlbcWarfareExamplesRelation(id)
			let warfareExamplesIds = []
			data.forEach((element) => {
				warfareExamplesIds.push(element.warfareExamplesId)
			})
			this.ruleForm.warfareExamplesIds = warfareExamplesIds
			//赋值节点信息
			if (data && data.length) this.ruleForm.text = data[0].text
		},

		//提交表单
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					await setBlbcWarfareExamplesRelation(this.ruleForm)
					this.$message.success("操作成功")
					this.handleClose()
				}
			})
		},

		//获取战例下拉数据
		async getWarfareExamples() {
			// const { data } = await dropDownWarfareExamples()
			const { rows: data } = await listWarfareExamples({ pageNum: 1, pageSize: 100 })
			this.options = Object.freeze(data)
		},

		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
			this.$refs.ruleForm.resetFields()
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
