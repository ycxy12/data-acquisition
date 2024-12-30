<template>
	<div class="container">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="部队名称">
				<el-input v-model="queryForm.troopsName" placeholder="请输入部队名称"></el-input>
			</el-form-item>
			<el-form-item label="所属国家">
				<el-select v-model="queryForm.countryId" placeholder="请选择所属国家" style="width: 100%">
					<el-option v-for="item in country" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
			<el-form-item style="float: right">
				<el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table ref="table" :data="tableData" size="small" border :height="`calc(100vh - 300px)`">
			<el-table-column type="index" width="55" label="序号" align="center" />
			<el-table-column prop="troopsName" label="部队名称" min-width="100" />
			<el-table-column prop="summary" label="简介" align="center" min-width="200" show-overflow-tooltip />
			<el-table-column prop="scale" label="规模(人数)" align="center" min-width="100" />
			<el-table-column prop="militaryService" label="军种" align="center" min-width="100" />
			<el-table-column prop="domicile" label="常住地" align="center" min-width="100" />
			<el-table-column label="操作" align="center">
				<template slot-scope="{ row }">
					<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
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
		<EditDrawer ref="editDrawerRef" @refresh="getTableData" />
	</div>
</template>

<script>
import { listBlbc, deleteBlbc } from "@/api/resource/troops"
import { listCountry } from "@/api/resource/country"
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
			country: [],
		}
	},
	created() {
		//列表数据
		this.getTableData()
		//国家
		this.getCountry()
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
			let query = Object.assign({}, this.queryForm, this.pagination)
			const { rows, total } = await listBlbc(query)
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
		handleDelete({ id }) {
			this.$confirm("确定将选择数据删除?", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(async () => {
				await deleteBlbc(id)
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

		//获取国家下拉框
		async getCountry() {
			const { data } = await listCountry()
			this.country = data
		},
	},
}
</script>
<style lang="scss" scoped></style>
