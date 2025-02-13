<template>
	<el-drawer title="新增" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="国家/地区">
				<el-select v-model="ruleForm.sourceCountryId" placeholder="请选择国家/地区" clearable style="width: 100%" @change="handleChange">
					<el-option v-for="item in countryOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="部队名称" prop="blbcIds">
				<el-cascader
					v-model="ruleForm.blbcIds"
					:options="options"
					:props="props"
					filterable
					clearable
					collapse-tags
					style="width: 100%"
				></el-cascader>
			</el-form-item>

			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addSubjectBlbc } from "@/api/topic/resource.js"
import { listCountry, getBlBcTreeByCountryId } from "@/api/resource/country"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				blbcIds: [{ required: true, message: "请选择部队名称", trigger: ["change", "blur"] }],
			},
			options: [],
			countryOptions: [],
			props: {
				value: "id",
				label: "troopsName",
				multiple: true,
				checkStrictly: true,
			},
		}
	},
	methods: {
		//打开抽屉
		async openDrawer() {
			await this.getCountry()
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
					const blbcIds = this.ruleForm.blbcIds.map((item) => item[item.length - 1])
					await addSubjectBlbc({ blbcIds, subjectId: params.id })
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
		handleChange(val) {
			if (val) {
				this.getTroopsByCountry(val)
			} else {
				this.options = []
			}
		},

		//获取国家/地区
		async getCountry() {
			const { data } = await listCountry()
			this.countryOptions = data
		},
		//通过国家/地区获取兵力编成编组
		async getTroopsByCountry(countryId) {
			const { data } = await getBlBcTreeByCountryId(countryId)
			this.options = Object.freeze(data.blbcTroopsList)
		},
	},
}
</script>
<style lang="scss">
.demo-ruleForm {
	.el-cascader__search-input {
		background-color: transparent;
	}
}
</style>
