<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="部队名称" prop="troopsName">
				<el-input v-model="ruleForm.troopsName" placeholder="请输入部队名称"></el-input>
			</el-form-item>
			<el-form-item label="所属国家" prop="countryId">
				<el-select v-model="ruleForm.countryId" placeholder="请选择所属国家" style="width: 100%">
					<el-option v-for="item in country" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="简介" prop="summary">
				<el-input v-model="ruleForm.summary" placeholder="请输入简介" type="textarea" :rows="4"></el-input>
			</el-form-item>
			<el-form-item label="规模(人数)" prop="scale">
				<el-input-number v-model="ruleForm.scale" :step="1" :min="0" :max="99999999" step-strictly style="width: 100%"></el-input-number>
			</el-form-item>
			<el-form-item label="军种" prop="militaryService">
				<el-input v-model="ruleForm.militaryService" placeholder="请输入军种"></el-input>
			</el-form-item>
			<el-form-item label="常住地" prop="domicile">
				<el-input v-model="ruleForm.domicile" placeholder="请输入常住地"></el-input>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addBlbc, editBlbc, getBlbcByid } from "@/api/resource/troops"
import { listCountry } from "@/api/resource/country"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				troopsName: [{ required: true, message: "请输入部队名称", trigger: "blur" }],
				countryId: [{ required: true, message: "请选择所属国家", trigger: "change" }],
			},
			country: [],
		}
	},
	mounted() {
		this.getCountry()
	},
	methods: {
		async openDrawer(id) {
			if (id) {
				const { data } = await getBlbcByid(id)
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
						await editBlbc(this.ruleForm)
					} else {
						await addBlbc(this.ruleForm)
					}
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
		//获取国家下拉框
		async getCountry() {
			const { data } = await listCountry()
			this.country = data
		},
	},
}
</script>

<style lang="scss" scoped></style>
