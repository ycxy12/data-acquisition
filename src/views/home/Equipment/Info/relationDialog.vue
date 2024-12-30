<template>
	<el-dialog title="实体关系" :visible="dialogVisible" append-to-body width="30%" :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="起始节点" prop="fromIds">
				<el-cascader v-model="ruleForm.fromIds" :options="options" :props="props" @change="handleChange" style="width: 100%"></el-cascader>
			</el-form-item>
			<el-form-item label="被指向节点" prop="toIds">
				<el-cascader
					v-model="ruleForm.toIds"
					:options="options"
					:props="props"
					@change="handleChange"
					disabled
					style="width: 100%"
				></el-cascader>
			</el-form-item>
			<el-form-item label="指向描述" prop="text">
				<el-input v-model="ruleForm.text" type="textarea" :rows="4" placeholder="请输入指向描述"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { listZbTypeTree, listZbTypeTreeAndInfo } from "@/api/resource/equipment"

export default {
	data() {
		return {
			dialogVisible: false,
			entity: undefined,
			ruleForm: {
				fromIds: [],
				toIds: [],
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
			},
		}
	},
	mounted() {
		this.getEquipmentInfo()
	},
	methods: {
		//打开抽屉
		async openDialog(entity) {
			console.log(entity)
			this.ruleForm.toIds = [entity.type, entity.id]

			this.entity = entity
			// const { data } = await listzbRelation({ toId: id })
			// this.ruleForm = data
			this.dialogVisible = true
		},

		//关闭抽屉
		handleClose() {
			this.dialogVisible = false
			this.ruleForm = {}
		},
		//
		handleChange(value) {
			console.log(value)
		},

		//获取装备类型-装备信息
		async getEquipmentInfo() {
			const { data } = await listZbTypeTreeAndInfo()
			this.options = data
		},
	},
}
</script>
