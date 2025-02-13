<template>
	<el-drawer title="新增" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="装备名称" prop="zbIds">
				<el-select v-model="ruleForm.zbIds" placeholder="请选择装备名称" filterable multiple collapse-tags style="width: 100%">
					<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>

			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addSubjectZb } from "@/api/topic/resource.js"
import { dropDownZbInfo } from "@/api/home/equipment.js"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				zbIds: [{ required: true, message: "请选择战例", trigger: ["change", "blur"] }],
			},
			options: [],
		}
	},
	methods: {
		//打开抽屉
		async openDrawer() {
			await this.getWarfareExamples()
			this.drawer = true
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
			this.$refs.ruleForm.resetFields()
		},
		//提交表单
		submitForm(formName) {
			console.log(this.ruleForm)
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					const params = this.$route.params
					this.ruleForm.subjectId = params.id
					await addSubjectZb(this.ruleForm)
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
		//获取战例下拉数据
		async getWarfareExamples() {
			const { data } = await dropDownZbInfo()
			this.options = Object.freeze(data)
		},
	},
}
</script>
