<template>
	<el-drawer title="编辑" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
			<el-form-item label="装备名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入装备名称"></el-input>
			</el-form-item>
			<el-form-item label="装备特征" prop="attrs">
				<el-table
					:data="ruleForm.attrs"
					stripe
					element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0, 0, 0, 0.5)"
				>
					<el-table-column prop="attrName" label="属性" align="center">
						<template slot-scope="{ row }">
							<el-input v-model="row.attrName" placeholder="请输入属性"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="value" label="属性值" align="center" class-name="attrs">
						<template slot-scope="{ row }">
							<div class="attr_cell">
								<div v-for="(item, index) in row.attrs" :key="index">
									<el-input v-model="row.attrs[index]" placeholder="请输入属性值"></el-input>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="value" label="操作" align="center">
						<template slot="header">
							<el-button type="text" size="small" @click="handleAdd" style="color: #f56c6c; font-weight: bold">添加一行</el-button>
						</template>
						<template slot-scope="{ row }">
							<el-button type="text" size="small" @click="handleAddAttr(row)">添加属性值</el-button>
						</template>
					</el-table-column>
				</el-table>
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
				<el-date-picker
					v-model="ruleForm.devTime"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="选择研制时间"
					style="width: 100%"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="服役时间" prop="attendedTime">
				<el-date-picker
					v-model="ruleForm.attendedTime"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="选择服役时间"
					style="width: 100%"
				></el-date-picker>
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
import { addZbInfo, editZbInfo, getZbInfoByid } from "@/api/home/equipment"
import { listZbType } from "@/api/resource/equipment"
import { listCountry } from "@/api/resource/country"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {
				attrs: [{ attrName: "", attrs: [""] }],
			},
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
		async openDrawer(id, equipmentTypeId) {
			if (id) {
				const { data } = await getZbInfoByid(id)
				this.ruleForm = data
			}
			if (equipmentTypeId) this.ruleForm.type = equipmentTypeId
			this.drawer = true
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = { attrs: [{ attrName: "", attrs: [""] }] }
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
		//添加属性
		handleAdd() {
			this.ruleForm.attrs.push({ attrName: "", attrs: [""] })
		},
		//添加属性值
		handleAddAttr(row) {
			row.attrs.push("") // 向该行添加一个属性值
		},
	},
}
</script>

<style lang="scss" scoped>
.el-icon-circle-plus {
	font-size: 28px;
	color: #409eff;
	cursor: pointer;
}
::v-deep .attrs {
	padding: 0;
}
::v-deep .attrs .cell {
	padding: 0;
}
.attr_cell {
	& > div {
		padding: 8px 10px;
		border-bottom: 1px solid rgba(112, 160, 255, 1);
	}
	& > div:last-child {
		border-bottom: none;
	}
}
.ruleForm {
	::v-deep .el-table th.el-table__cell {
		line-height: 23px;
		padding: 6px 0;
	}
}
</style>
