<template>
	<div class="container">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="项目名称">
				<el-input v-model="queryForm.projectName" placeholder="请输入项目名称"></el-input>
			</el-form-item>
			<el-form-item label="项目编号">
				<el-input v-model="queryForm.projectCode" placeholder="请输入项目编号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" size="small" border stripe :height="`calc(100vh - 238px)`">
			<el-table-column type="index" width="55" label="序号" align="center" />
			<el-table-column prop="controlledState" label="受控情况" align="center"></el-table-column>
			<el-table-column prop="projectName" label="项目名称" align="center" show-overflow-tooltip>
				<template slot-scope="{ row }">
					<span class="table_active" @click="gotoInfo(row)">{{ row.projectName }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="projectCode" label="项目编号" align="center" show-overflow-tooltip />
			<el-table-column prop="voltageLevel" label="电压等级" align="center" show-overflow-tooltip />
			<el-table-column prop="designDept" label="设计单位" align="center" show-overflow-tooltip />
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
	</div>
</template>

<script>
export default {
	data() {
		return {
			queryForm: {},
			tableData: [],
			pagination: {
				pageNum: 1,
				pageSize: 10,
			},
			total: 0,
		}
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		searchForm() {
			this.pagination.pageNum = 1
			this.getTableData()
		},
		resetForm() {
			this.queryForm = {}
			this.searchForm()
		},
		// 获取表格数据
		getTableData() {
			let query = Object.assign({}, this.queryForm, this.pagination)
			// getProjectList(query).then((res) => {
			// 	const data = res.data.data
			// 	this.tableData = data.records
			// 	this.total = data.total
			// })
		},
		handleSizeChange(val) {
			this.pagination.pageSize = val
			this.pagination.pageNum = 1
			this.getTableData()
		},
		handleCurrentChange(val) {
			this.pagination.pageNum = val
			this.getTableData()
		},
	},
}
</script>
