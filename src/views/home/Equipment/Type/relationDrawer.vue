<template>
	<el-drawer title="实体关系" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="起始节点" prop="fromIds">
				<el-cascader
					v-model="ruleForm.fromIds"
					:options="options"
					:props="props"
					clearable
					@change="handleChange"
					style="width: 100%"
				></el-cascader>
			</el-form-item>
			<el-form-item label="被指向节点" prop="toIds">
				<el-cascader
					v-model="ruleForm.toIds"
					:options="options"
					:props="props1"
					@change="handleChange"
					disabled
					style="width: 100%"
				></el-cascader>
			</el-form-item>
			<el-form-item label="指向描述" prop="text">
				<el-input v-model="ruleForm.text" type="textarea" :rows="4" placeholder="请输入指向描述"></el-input>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { listZbTypeTreeAndInfo } from "@/api/resource/equipment"
import { listzbRelation, updatezbRelation } from "@/api/home/module"
import { getZbInfoByid } from "@/api/home/equipment"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {
				fromIds: [],
				toIds: [],
				text: "",
			},
			rules: {
				fromIds: [{ required: true, message: "请选择起始节点", trigger: "change" }],
				toIds: [{ required: true, message: "请选择被指向节点", trigger: "change" }],
			},
			options: [],
			props: {
				label: "name",
				value: "id",
				children: "zbInfos",
				multiple: true,
			},
			props1: {
				label: "name",
				value: "id",
				children: "zbInfos",
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
			const { data } = await getZbInfoByid(id)
			this.ruleForm.toIds = [data.type, data.id]

			//获取指向自己的实体关系
			this.getRelationByToId(id)
			this.drawer = true
		},

		//获取指向自己的实体关系
		async getRelationByToId(id) {
			//获取指向自己的实体关系
			const { data } = await listzbRelation({ toId: id })
			let fromIds = []
			data.forEach((element) => {
				let type = this.findParentIdByZbInfoId(element.fromId)
				if (type) fromIds.push([type, element.fromId])
			})
			this.ruleForm.fromIds = fromIds
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
					const { toIds, fromIds, text } = this.ruleForm
					let query = {
						toId: toIds[1],
						fromIds: fromIds.map((item) => item[1]),
						text,
					}
					await updatezbRelation(query)
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

		handleChange(value) {
			console.log(value)
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
