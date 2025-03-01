<template>
	<div class="container">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="文件名称">
				<el-input v-model="queryForm.fileName" placeholder="请输入文件名称"></el-input>
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
			v-loading="loading"
			:data="tableData"
			size="small"
			stripe
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
			:height="`calc(100vh - 300px)`"
		>
			<el-table-column type="index" width="55" label="序号" align="center" />
			<el-table-column prop="fileName" label="文件名称" align="left" show-overflow-tooltip />
			<el-table-column prop="filePath" label="文件路径" align="left"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="{ row }">
					<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
					<el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
					<el-button type="text" size="small" @click="handleParse(row)">处理数据</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="table_pagination"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pagination.pageNum"
			:page-sizes="[10, 20, 30, 40]"
			:page-size="pagination.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
		>
		</el-pagination>
		<EditDrawer ref="editDrawerRef" @refresh="getTableData" />
	</div>
</template>

<script>
import { listDataImport, deleteDataImport, parseDataImport } from "@/api/resource/upload"
import EditDrawer from "./editDrawer.vue"

export default {
	components: { EditDrawer },
	data() {
		return {
			queryForm: {},
			tableData: [],
			pagination: {
				pageNum: 1,
				pageSize: 10,
			},
			total: 0,
			loading: false,
		}
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		//搜索
		searchForm() {
			this.pagination.pageNum = 1
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
			let query = Object.assign({}, this.queryForm, this.pagination)
			const { rows, total } = await listDataImport(query)
			this.loading = false
			this.tableData = rows
			this.total = total
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
		handleDelete(row) {
			this.$confirm("确定将选择数据删除?", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(async () => {
				await deleteDataImport(row.id)
				this.$message.success("操作成功!")
				this.getTableData()
			})
		},
		//处理数据
		handleParse(row) {
			this.$confirm("确定处理数据?", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(async () => {
				await parseDataImport(row.id)
				this.$message.success("操作成功!")
				this.getTableData()
			})
		},
		//改变每页显示数量
		handleSizeChange(val) {
			this.pagination.pageSize = val
			this.pagination.pageNum = 1
			this.getTableData()
		},
		//改变页码
		handleCurrentChange(val) {
			this.pagination.pageNum = val
			this.getTableData()
		},
	},
}
</script>
<style lang="scss" scoped></style>
