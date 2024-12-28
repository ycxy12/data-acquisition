<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<div class="view">
			<div>
				<label>装备名称：</label>
				<p>{{ ruleForm.name || "--" }}</p>
			</div>
			<div>
				<label>装备特征：</label>
				<p>{{ ruleForm.feature || "--" }}</p>
			</div>
			<div>
				<label>装备类型：</label>
				<p>{{ getEquipmentTypeName(ruleForm.type) }}</p>
			</div>
			<div>
				<label>研制国家/地区：</label>
				<p>{{ getCountryName(ruleForm.sourceCountryId) }}</p>
			</div>
			<div>
				<label>研制时间：</label>
				<p>{{ ruleForm.devTime || "--" }}</p>
			</div>
			<div>
				<label>服役时间：</label>
				<p>{{ ruleForm.attendedTime || "--" }}</p>
			</div>
			<div>
				<label>备注：</label>
				<p>{{ ruleForm.remark || "--" }}</p>
			</div>
		</div>
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
			const { data } = await getZbInfoByid(id)
			this.ruleForm = data
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
		//获取装备类型名称
		getEquipmentTypeName(id) {
			return this.equimentTypeOptions.find((item) => item.id === id)?.name || "--"
		},
		//获取国家/地区名称
		getCountryName(id) {
			return this.countryOptions.find((item) => item.id === id)?.name || "--"
		},
	},
}
</script>

<style lang="scss" scoped>
.view {
	& > div {
		display: flex;
		margin-bottom: 10px;
		label {
			width: 120px;
			text-align: right;
			margin-right: 10px;
			line-height: 30px;
			color: #606266;
		}
		p {
			flex: 1;
			margin: 0;
			line-height: 30px;
			color: #606266;
		}
	}
}
</style>
