<template>
	<div class="container">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="装备类型名称">
				<el-input v-model="queryForm.name" placeholder="请输入装备类型名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
			<el-form-item style="float: right">
				<el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table
			ref="table"
			row-key="id"
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
			:data="tableData"
			size="small"
			stripe
			:height="`calc(100vh - 255px)`"
			default-expand-all
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<el-table-column type="index" width="55" label="序号" align="center" />
			<el-table-column prop="name" label="装备类型名称" />
			<el-table-column prop="createTime" label="创建时间" align="center" />
			<el-table-column prop="updateTime" label="更新时间" align="center" />
			<el-table-column label="操作" align="center">
				<template slot-scope="{ row }">
					<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
					<el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<EditDrawer ref="editDrawerRef" @refresh="searchForm" />
	</div>
</template>

<script>
import { listZbTypeTree, deleteZbType } from "@/api/resource/equipment"
import EditDrawer from "./editDrawer.vue"

export default {
	components: { EditDrawer },
	data() {
		return {
			queryForm: {},
			tableData: [],
			loading: false,
		}
	},
	created() {
		this.getTableData()
	},
	methods: {
		//搜索
		searchForm() {
			this.getTableData()
		},
		//重置搜索条件
		resetForm() {
			this.queryForm = {}
			this.searchForm()
		},
		// 获取表格数据
		async getTableData() {
			this.loading = true
			const { data } = await listZbTypeTree(this.queryForm)
			this.tableData = data
			this.loading = false
		},
		//新增
		handleAdd() {
			this.$refs.editDrawerRef.openDrawer()
		},
		//编辑
		handleEdit({ id }) {
			this.$refs.editDrawerRef.openDrawer(id)
		},
		//删除
		handleDelete({ id }) {
			this.$confirm("确定将选择数据删除?", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(async () => {
				await deleteZbType(id)
				this.$message.success("操作成功!")
				this.getTableData()
			})
		},
	},
}
</script>
<style lang="scss" scoped></style>
