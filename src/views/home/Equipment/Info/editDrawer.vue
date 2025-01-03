<template>
	<el-drawer title="编辑" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="数量" prop="num">
				<el-input v-model="ruleForm.num" placeholder="请输入数量"></el-input>
			</el-form-item>
			<el-form-item label="性能参数" prop="parameter">
				<el-input v-model="ruleForm.parameter" type="textarea" :rows="4" placeholder="请输入性能参数"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="ruleForm.remark" type="textarea" :rows="4" placeholder="请输入备注"></el-input>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addZbModule, editZbModule, getZbModuleByid } from "@/api/home/module"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入装备名称", trigger: "blur" }],
				num: [{ required: true, message: "请输入数量", trigger: "blur" }],
			},
			zbInfoId: undefined,
		}
	},
	methods: {
		//打开抽屉
		async openDrawer(id, zbInfoId) {
			this.zbInfoId = zbInfoId
			if (id) {
				const { data } = await getZbModuleByid(id)
				this.ruleForm = data
			}
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
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.ruleForm.zbInfoId = this.zbInfoId
					if (this.ruleForm.id) {
						await editZbModule(this.ruleForm)
					} else {
						await addZbModule(this.ruleForm)
					}
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
	},
}
</script>
