<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="装备类型名称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addZbType, editZbType, getZbTypeByid } from "@/api/resource/equipment"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入装备类型名称", trigger: "blur" }],
			},
		}
	},
	methods: {
		async openDrawer(id) {
			if (id) {
				const { data } = await getZbTypeByid(id)
				this.ruleForm = data
			}
			this.drawer = true
		},
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
			this.$refs.ruleForm.resetFields()
		},
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					if (this.ruleForm.id) {
						await editZbType(this.ruleForm)
					} else {
						await addZbType(this.ruleForm)
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

<style lang="scss" scoped></style>
