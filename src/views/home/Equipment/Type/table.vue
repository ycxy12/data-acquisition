<template>
	<div class="container table">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="装备名称">
				<el-input v-model="queryForm.name" placeholder="请输入装备名称"></el-input>
			</el-form-item>
			<el-form-item label="国家/地区">
				<el-select v-model="queryForm.sourceCountryId" placeholder="请选择国家/地区" clearable style="width: 100%">
					<el-option v-for="item in countryOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
			<el-form-item style="float: right">
				<el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
				<el-button icon="el-icon-download" type="primary" @click="handleMultipleExport">情报资源导出</el-button>
			</el-form-item>
		</el-form>
		<el-table
			ref="table"
			:data="tableData"
			v-loading="loading"
			size="small"
			stripe
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
			@selection-change="handleSelectionChange"
			:height="`calc(100vh - 298px)`"
		>
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column type="index" width="55" label="序号" align="center" />
			<el-table-column prop="name" label="装备名称" min-width="100" show-overflow-tooltip>
				<template slot-scope="{ row }">
					<el-link type="primary" :underline="false" @click="handleDetail(row)">{{ row.name }}</el-link>
				</template>
			</el-table-column>
			<el-table-column prop="feature" label="装备特征" min-width="200" show-overflow-tooltip />
			<el-table-column label="操作" align="center" width="240">
				<template slot-scope="{ row }">
					<el-button type="text" size="small" @click="handleView(row)">详情</el-button>
					<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
					<el-button type="text" size="small" @click="handleExport(row)">导出</el-button>
					<el-button type="text" size="small" @click="handleRelation(row)">实体关系</el-button>
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
		<!-- 新增/编辑 -->
		<EditDrawer ref="editDrawerRef" @refresh="getTableData" />
		<!-- 详情 -->
		<ViewDrawer ref="viewDrawerRef" />
		<!-- 实体关系 -->
		<RelationDrawer ref="relationDrawerRef" />
	</div>
</template>

<script>
import { listZbInfo, deleteZbInfo, exportZbInfo } from "@/api/home/equipment"
import { listCountry } from "@/api/resource/country"
import { downloadBlob } from "@/utils"
import EditDrawer from "./editDrawer.vue"
import ViewDrawer from "./viewDrawer.vue"
import RelationDrawer from "./relationDrawer.vue"

export default {
	components: { EditDrawer, ViewDrawer, RelationDrawer },
	props: {
		equipmentTypeId: {
			type: String,
			default: undefined,
		},
	},
	data() {
		return {
			queryForm: {
				type: undefined,
			},
			tableData: [],
			pagination: {
				pageNum: 1,
				pageSize: 10,
			},
			total: 0,
			multipleSelection: [],
			countryOptions: [],
			loading: false,
		}
	},
	watch: {
		equipmentTypeId: {
			handler(newVal) {
				console.log(newVal)

				this.queryForm.type = newVal
				this.searchForm()
			},
		},
	},
	mounted() {
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
			this.queryForm = { type: this.equipmentTypeId }
			this.searchForm()
		},
		// 获取表格数据
		async getTableData() {
			this.loading = true
			let query = Object.assign({}, this.queryForm, this.pagination)
			const { rows, total } = await listZbInfo(query)
			this.tableData = rows
			this.total = total
			this.loading = false
		},
		//详情
		handleView({ id }) {
			this.$refs.viewDrawerRef.openDrawer(id)
		},
		//新增
		handleAdd() {
			this.$refs.editDrawerRef.openDrawer(null, this.equipmentTypeId)
		},
		//编辑
		handleEdit({ id }) {
			this.$refs.editDrawerRef.openDrawer(id)
		},
		//情报资源批量导出
		async handleMultipleExport() {
			if (this.multipleSelection.length === 0) {
				this.$message.warning("请选择数据!")
				return
			}
			let ids = this.multipleSelection.map((item) => item.id)
			const response = await exportZbInfo(ids)
			downloadBlob(response)
		},
		//导出
		async handleExport(row) {
			const response = await exportZbInfo([row.id])
			downloadBlob(response)
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

		//多选
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
		//获取国家/地区
		async getCountry() {
			const { data } = await listCountry()
			this.countryOptions = data
		},
		//实体关系
		handleRelation(row) {
			this.$refs.relationDrawerRef.openDrawer(row.id)
		},
		//跳转查看详情页面
		handleDetail(row) {
			this.$router.push(`/home/equipment/${this.equipmentTypeId}/${row.id}`)
		},
	},
}
</script>
<style lang="scss" scoped>
.table {
	flex: 1;
}
</style>
