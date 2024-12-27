<template>
	<div class="container table">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="装备名称">
				<el-input v-model="queryForm.name" placeholder="请输入装备名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
			<el-form-item style="float: right">
				<el-button icon="el-icon-download" type="primary" @click="handleMultipleExport">情报资源导出</el-button>
			</el-form-item>
		</el-form>
		<el-table ref="table" :data="tableData" size="small" border @selection-change="handleSelectionChange" :height="`calc(100vh - 298px)`">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column type="index" width="55" label="序号" align="center" />
			<el-table-column prop="name" label="装备名称" min-width="100" show-overflow-tooltip />
			<el-table-column prop="feature" label="装备特征" min-width="200" show-overflow-tooltip />
			<el-table-column label="操作" align="center" width="200">
				<template slot-scope="{ row }">
					<el-button type="text" size="small" @click="handleView(row)">详情</el-button>
					<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
					<el-button type="text" size="small" @click="handleExport(row)">导出</el-button>
					<el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
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
		<EditDrawer ref="editDrawerRef" />
	</div>
</template>

<script>
import { listZbInfo, deleteZbInfo, exportUser } from "@/api/home/equipment"
import { downloadBlob } from "@/utils"
import EditDrawer from "./editDrawer.vue"

export default {
	components: { EditDrawer },
	props: {
		equipmentTypeId: {
			type: String,
			default: undefined,
		},
	},
	data() {
		return {
			queryForm: {
				sourceCountryId: undefined,
			},
			tableData: [],
			pagination: {
				pageNum: 1,
				pageSize: 10,
			},
			total: 0,
			multipleSelection: [],
		}
	},
	watch: {
		equipmentTypeId(newVal) {
			// this.queryForm.sourceCountryId = newVal
			this.searchForm()
		},
	},
	methods: {
		//搜索
		searchForm() {
			this.pagination.pageNum = 1
			this.getTableData()
		},
		//重置搜索条件
		resetForm() {
			this.queryForm = { sourceCountryId: this.equipmentTypeId }
			this.searchForm()
		},
		// 获取表格数据
		async getTableData() {
			let query = Object.assign({}, this.queryForm, this.pagination)
			const { rows, total } = await listZbInfo(query)
			this.tableData = rows
			this.total = total
		},
		//详情
		handleView(row) {
			this.$refs.editDrawerRef.openDrawer(row, "view")
		},
		//编辑
		handleEdit(row) {
			this.$refs.editDrawerRef.openDrawer(row, "edit")
		},
		//导出
		async handleExport(row) {
			const { data } = await exportUser([row.id])
			downloadBlob(data, `${row.name}.excel`)
		},
		//删除
		handleDelete(row) {
			this.$confirm("确定将选择数据删除?", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(async () => {
				await deleteZbInfo(row.id)
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
		//情报资源批量导出
		async handleMultipleExport() {
			const { data } = await exportUser(this.multipleSelection)
			downloadBlob(data, "情报资源.zip")
		},
		//多选
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
	},
}
</script>
<style lang="scss" scoped>
.table {
	flex: 1;
}
</style>
