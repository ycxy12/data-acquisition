<template>
	<el-dialog title="提示" :visible="dialogVisible" append-to-body width="30%" :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="起始节点" prop="fromIds">
				<el-input v-model="ruleForm.fromIds" placeholder="请输入起始节点"></el-input>
			</el-form-item>
			<el-form-item label="被指向节点" prop="toId">
				<el-input v-model="ruleForm.toId" placeholder="请输入被指向节点"></el-input>
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
			selfEntity: undefined,
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入装备名称", trigger: "blur" }],
				num: [{ required: true, message: "请输入数量", trigger: "blur" }],
			},
		}
	},
	methods: {
		//打开抽屉
		async openDialog(selfEntity) {
			this.selfEntity = selfEntity
			// await listZbTypeTree()
			// await listZbTypeTreeAndInfo()
			// const { data } = await listzbRelation({ toId: id })
			// this.ruleForm = data
			this.dialogVisible = true
		},

		//关闭抽屉
		handleClose() {
			this.dialogVisible = false
			this.ruleForm = {}
		},
	},
}
</script>
