<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="国家/地区" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addCountry, editCountry, getCountryByid } from "@/api/resource/country"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入国家/地区", trigger: "blur" }],
			},
		}
	},
	methods: {
		async openDrawer(id) {
			if (id) {
				const { data } = await getCountryByid(id)
				this.ruleForm = data
			}
			console.log(this.ruleForm)
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
						await editCountry(this.ruleForm)
					} else {
						await addCountry(this.ruleForm)
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
