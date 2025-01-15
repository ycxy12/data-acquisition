<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="装备类型名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入装备类型名称"></el-input>
			</el-form-item>
			<el-form-item label="父级" prop="parentId">
				<el-cascader v-model="ruleForm.parentId" :options="treeData" :props="props" filterable style="width: 100%"></el-cascader>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addZbType, editZbType, getZbTypeByid, listZbTypeTree } from "@/api/resource/equipment"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入装备类型名称", trigger: "blur" }],
			},
			treeData: [],
			props: {
				label: "name",
				value: "id",
				checkStrictly: true,
			},
		}
	},
	methods: {
		async openDrawer(id) {
			//获取下拉信息
			await this.getTableData()
			if (id) {
				const { data } = await getZbTypeByid(id)
				let parentId = []
				if (data.parentId) {
					let type = this.findParentIdByZbInfoId(this.treeData, data.parentId)
					parentId = type
				}
				this.ruleForm = Object.assign({}, data, { parentId })
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
					let params = {
						...this.ruleForm,
						parentId: this.ruleForm.parentId ? this.ruleForm.parentId[this.ruleForm.parentId.length - 1] : undefined,
					}
					if (this.ruleForm.id) {
						await editZbType(params)
					} else {
						await addZbType(params)
					}
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
		// 获取表格数据
		async getTableData() {
			const { data } = await listZbTypeTree()
			let treeData = data
			function markLeafNodes(tree) {
				// 遍历树节点
				tree.forEach((node) => {
					if (!node.children || node.children.length === 0) {
						// 如果 children 为空或不存在，标记为 leaf
						node.leaf = true
						node.children = undefined
					} else {
						// 递归处理子节点
						markLeafNodes(node.children)
					}
				})
			}
			markLeafNodes(treeData)
			this.treeData = treeData
		},
		//查找父组件id
		findParentIdByZbInfoId(options, id) {
			for (const option of options) {
				if (option.id === id) return [option.id]
				if (option.children) {
					const path = this.findParentIdByZbInfoId(option.children, id)
					if (path) return [option.id, ...path]
				}
			}
			return null
		},
	},
}
</script>

<style lang="scss" scoped></style>
