<template>
	<el-drawer title="实体关系" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="起始节点" prop="fromIds">
				<el-cascader v-model="ruleForm.fromIds" :options="optionsType" :props="props" clearable
					@change="handleChange" style="width: 100%"></el-cascader>
			</el-form-item>
			<el-form-item label="被指向节点" prop="toIds">
				<el-cascader v-model="ruleForm.toIds" :options="options" :props="props1" @change="handleChange" disabled
					style="width: 100%"></el-cascader>
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
import { listZbTypeTreeAndInfo, listZbTypeTree } from "@/api/resource/equipment"
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
			optionsType: [],
			props: {
				label: "name",
				value: "id",
				children: "children",
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
		this.getEquipmentType()
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
				let type = this.findParentIdByZbInfoId(this.optionsType, element.fromId)
				console.log(type);
				if (type) fromIds.push(type)
			})
			console.log(fromIds);

			this.ruleForm.fromIds = fromIds
			//赋值节点信息
			if (data && data.length) this.ruleForm.text = data[0].text
		},
		findPathById(options, id) {
			for (const option of options) {
				if (option.id === id) return [option.id];
				if (option.children) {
					const path = this.findPathById(option.children, id);
					if (path) return [option.id, ...path];
				}
			}
			return null;
		},

		//查找父组件id
		findParentIdByZbInfoId(options, id) {
			for (const option of options) {
				if (option.id === id) return [option.id];
				if (option.children) {
					const path = this.findParentIdByZbInfoId(option.children, id);
					if (path) return [option.id, ...path];
				}
			}
			return null;
		},

		//提交表单
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					const { toIds, fromIds, text } = this.ruleForm
					let query = {
						toId: toIds[1],
						fromIds: fromIds.map((item) => item[item.length - 1]),
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

		//获取装备类型
		async getEquipmentType() {
			const { data } = await listZbTypeTree()
			let treeData = data
			function markLeafNodes(tree) {
				// 遍历树节点
				tree.forEach(node => {
					if (!node.children || node.children.length === 0) {
						// 如果 children 为空或不存在，标记为 leaf
						node.leaf = true;
						node.children = undefined
					} else {
						// 递归处理子节点
						markLeafNodes(node.children);
					}
				});
			}
			markLeafNodes(treeData)
			this.optionsType = treeData

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
