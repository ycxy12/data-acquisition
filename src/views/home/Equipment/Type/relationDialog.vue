<template>
	<el-dialog title="实体关系" :visible.sync="dialogVisible" width="50%" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="装备类型" prop="type">
				<el-cascader
					v-model="ruleForm.type"
					:options="optionsType"
					:props="props"
					clearable
					style="width: 100%"
					@change="onChange"
				></el-cascader>
			</el-form-item>
			<el-form-item label="起始节点" prop="fromIds">
				<el-select v-model="ruleForm.fromIds" multiple placeholder="请选择起始节点" style="width: 100%">
					<el-option v-for="item in optionsEquip" :key="item.id" :label="item.name" :value="item.id"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="被指向节点" prop="toIds">
				<el-cascader v-model="ruleForm.toIds" :options="options" :props="props1" disabled style="width: 100%"></el-cascader>
			</el-form-item>
			<el-form-item label="指向描述" prop="text">
				<el-input v-model="ruleForm.text" type="textarea" :rows="4" placeholder="请输入指向描述"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { listZbTypeTreeAndInfo, listZbTypeTree } from "@/api/resource/equipment"
import { listzbRelation, updatezbRelation } from "@/api/home/module"
import { getZbInfoByid } from "@/api/home/equipment"
import { listZbInfo } from "@/api/home/equipment"

export default {
	data() {
		return {
			dialogVisible: false,
			ruleForm: {
				type: [],
				fromIds: [],
				toIds: [],
				text: "",
			},
			rules: {
				type: [{ required: true, message: "请选择装备类型", trigger: "change" }],
				fromIds: [{ required: true, message: "请选择起始节点", trigger: "change" }],
				toIds: [{ required: true, message: "请选择被指向节点", trigger: "change" }],
			},
			options: [],
			optionsType: [],
			props: {
				label: "name",
				value: "id",
				children: "children",
				checkStrictly: true,
			},
			props1: {
				label: "name",
				value: "id",
				children: "zbInfos",
			},
			optionsEquip: [],
		}
	},
	mounted() {
		this.getEquipmentInfo()
		this.getEquipmentType()
	},
	methods: {
		//打开抽屉
		async openDialog(id) {
			//获取自己实体信息
			const { data } = await getZbInfoByid(id)
			this.ruleForm = Object.assign({}, this.ruleForm, { toIds: [data.type, data.id] })

			//获取指向自己的实体关系
			// this.getRelationByToId(id)
			this.dialogVisible = true
		},
		//获取指向自己的实体关系
		async getRelationByToId(id) {
			//获取指向自己的实体关系
			const { data } = await listzbRelation({ toId: id })
			let fromIds = []
			data.forEach((element) => {
				let type = this.findParentIdByZbInfoId(this.optionsType, element.fromId)
				console.log(type)
				if (type) fromIds.push(type)
			})
			console.log(fromIds)

			this.ruleForm.fromIds = fromIds
		},
		findPathById(options, id) {
			for (const option of options) {
				if (option.id === id) return [option.id]
				if (option.children) {
					const path = this.findPathById(option.children, id)
					if (path) return [option.id, ...path]
				}
			}
			return null
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

		//提交表单
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.$emit("submit", this.ruleForm)
					this.handleClose()
				}
			})
		},

		//获取装备类型-装备信息
		async getEquipmentInfo() {
			const { data } = await listZbTypeTreeAndInfo()
			this.options = data
		},

		//获取装备类型
		async getEquipmentType() {
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
			this.optionsType = treeData
		},
		async onChange(value) {
			if (!value) return
			let type = value.length > 0 ? value[value.length - 1] : undefined
			if (type) {
				let query = { pageNum: 1, pageSize: 1000, type }
				const { rows } = await listZbInfo(query)
				this.optionsEquip = rows
			} else {
				this.optionsEquip = []
			}
		},
		handleClose() {
			this.dialogVisible = false
			this.ruleForm = {}
			this.$refs.ruleForm.resetFields()
		},
		//获取装备信息
		async getEquipmentList() {},
	},
}
</script>

<style lang="scss" scoped></style>
