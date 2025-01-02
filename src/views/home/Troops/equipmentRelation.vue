<template>
	<el-drawer title="装备关系" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="装备" prop="zbIds">
				<el-cascader v-model="ruleForm.zbIds" :options="options" :props="props" clearable style="width: 100%"></el-cascader>
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
import { listZbTypeTreeAndInfo } from "@/api/resource/equipment"
import { getBlbcByid } from "@/api/resource/troops"
import { setBlbcAndZbRelation, getBlbcAndZbRelation } from "@/api/home/troops"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {
				zbIds: [],
			},
			rules: {
				zbIds: [{ required: true, message: "请选择起始节点", trigger: "change" }],
				blbcName: [{ required: true, message: "请选择被指向节点", trigger: "change" }],
			},
			options: [],
			props: {
				label: "name",
				value: "id",
				children: "zbInfos",
				multiple: true,
			},
		}
	},
	mounted() {
		this.getEquipmentInfo()
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			//获取自己实体信息
			const { data } = await getBlbcByid(id)
			this.ruleForm.blbcId = data.id
			this.ruleForm.blbcName = data.troopsName

			//获取指向自己的实体关系
			this.getBlbcAndZbRelation(id)
			this.drawer = true
		},

		//获取指向自己的实体关系
		async getBlbcAndZbRelation(id) {
			//获取指向自己的实体关系
			const { data } = await getBlbcAndZbRelation(id)
			let zbIds = []
			data.forEach((element) => {
				let type = this.findParentIdByZbInfoId(element.zbId)
				if (type) zbIds.push([type, element.zbId])
			})
			this.ruleForm.zbIds = zbIds
			//赋值节点信息
			if (data && data.length) this.ruleForm.text = data[0].text
		},
		//查找父组件id
		findParentIdByZbInfoId(id) {
			// 遍历整个数据数组
			for (const node of this.options) {
				// 检查节点是否有 zbInfos 属性，并在其中查找目标 id
				if (node.zbInfos && node.zbInfos.some((zb) => zb.id === id)) {
					return node.id // 返回找到的父节点 id
				}
			}
			return null // 如果没有找到，返回 null
		},

		//提交表单
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					const { blbcId, zbIds, text } = this.ruleForm
					let query = {
						blbcId,
						zbIds: zbIds.map((item) => item[1]),
						text,
					}
					await setBlbcAndZbRelation(query)
					this.$message.success("操作成功")
					this.handleClose()
				}
			})
		},

		//获取装备类型-装备信息
		async getEquipmentInfo() {
			const { data } = await listZbTypeTreeAndInfo()
			this.options = data
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
