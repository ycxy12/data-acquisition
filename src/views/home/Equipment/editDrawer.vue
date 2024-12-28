<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
			<el-form-item label="装备名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入装备名称"></el-input>
			</el-form-item>
			<el-form-item label="装备特征" prop="feature">
				<el-input v-model="ruleForm.feature" type="textarea" :rows="4" placeholder="请输入装备特征"></el-input>
			</el-form-item>
			<el-form-item label="装备类型" prop="type">
				<el-select v-model="ruleForm.type" placeholder="请选择装备类型" style="width: 100%">
					<el-option v-for="item in equimentTypeOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="研制国家/地区" prop="sourceCountryId">
				<el-select v-model="ruleForm.sourceCountryId" placeholder="请选择研制国家/地区" clearable style="width: 100%">
					<el-option v-for="item in countryOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="研制时间" prop="devTime">
				<el-date-picker v-model="ruleForm.devTime" type="date" placeholder="选择研制时间" style="width: 100%"></el-date-picker>
			</el-form-item>
			<el-form-item label="服役时间" prop="attendedTime">
				<el-date-picker v-model="ruleForm.attendedTime" type="date" placeholder="选择服役时间" style="width: 100%"></el-date-picker>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="ruleForm.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addZbInfo, editZbInfo, getZbInfoByid } from "@/api/home/equipment"
import { listZbType } from "@/api/resource/equipment"
import { listCountry } from "@/api/resource/country"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入装备名称", trigger: "blur" }],
				feature: [{ required: true, message: "请输入装备特征", trigger: "blur" }],
				type: [{ required: true, message: "请选择装备类型", trigger: "change" }],
			},
			countryOptions: [],
			equimentTypeOptions: [],
		}
	},
	mounted() {
		this.getEquipmentType()
		this.getCountry()
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			if (id) {
				const { data } = await getZbInfoByid(id)
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
					if (this.ruleForm.id) {
						await editZbInfo(this.ruleForm)
					} else {
						await addZbInfo(this.ruleForm)
					}
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
		//获取装备类型
		async getEquipmentType() {
			const { data } = await listZbType()
			this.equimentTypeOptions = data
		},
		//获取国家/地区
		async getCountry() {
			const { data } = await listCountry()
			this.countryOptions = data
		},
	},
}
</script>

<style lang="scss" scoped></style>
