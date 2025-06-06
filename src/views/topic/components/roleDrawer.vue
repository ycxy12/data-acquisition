<template>
	<el-drawer title="角色" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-table :data="list" style="width: 100%" :row-key="row => row.roleName" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="roleName" label="角色名称"></el-table-column>
		</el-table>
		<div class="drawer-footer">
			<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
		</div>
	</el-drawer>
</template>

<script>
import { roleList } from "@/api/topic/wiki.js"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			list: [],
			selectedRoles: [],
		}
	},
	methods: {
		//打开抽屉
		async openDrawer() {
			await this.getRoleList()
			this.drawer = true
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
		},
		//提交表单
		submitForm() {
			if (this.selectedRoles.length === 0) {
				this.$message.warning("请选择角色")
				return
			}
			this.$emit("submit", this.selectedRoles)
			this.handleClose()
		},
		//获取战例下拉数据
		async getRoleList() {
			const { data } = await roleList()
			this.list = Object.freeze(data)
		},
		// 处理选中行
		handleSelectionChange(selection) {
			this.selectedRoles = selection.map(item => item.roleName)
		},
	},
}
</script>
