<template>
	<div class="container table">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="装备组件名称">
				<el-input v-model="queryForm.name" placeholder="请输入装备组件名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
			<el-form-item style="float: right">
				<el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table ref="table" :data="tableData" v-loading="loading" size="small" border :height="`calc(100vh - 298px)`">
			<el-table-column type="index" width="55" label="序号" align="center" />
			<el-table-column prop="name" label="装备组件名称" min-width="100" show-overflow-tooltip />
			<el-table-column prop="num" label="数量" min-width="100" show-overflow-tooltip />
			<el-table-column prop="parameter" label="性能参数" min-width="200" show-overflow-tooltip />
			<el-table-column prop="remark" label="备注" min-width="100" show-overflow-tooltip />
			<el-table-column label="操作" align="center" width="200">
				<template slot-scope="{ row }">
					<el-button type="text" size="small" @click="handleView(row)">详情</el-button>
					<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
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
		<EditDrawer ref="editDrawerRef" @refresh="getTableData" />
		<ViewDrawer ref="viewDrawerRef" />
	</div>
</template>

<script>
import { listZbModule, deleteZbModule } from "@/api/home/module"
import EditDrawer from "./editDrawer.vue"
import ViewDrawer from "./viewDrawer.vue"

export default {
	components: { EditDrawer, ViewDrawer },
	props: {
		equipmentId: {
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
		equipmentId: {
			handler(newVal) {
				this.queryForm.zbInfoId = newVal
				this.searchForm()
			},
			immediate: true,
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
			this.queryForm = { zbInfoId: this.equipmentId }
			this.searchForm()
		},
		// 获取表格数据
		async getTableData() {
			this.loading = true
			let query = Object.assign({}, this.queryForm, this.pagination)
			const { rows, total } = await listZbModule(query)
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
			this.$refs.editDrawerRef.openDrawer(null, this.equipmentId)
		},
		//编辑
		handleEdit({ id, zbInfoId }) {
			this.$refs.editDrawerRef.openDrawer(id, zbInfoId)
		},
		//删除
		handleDelete(row) {
			this.$confirm("确定将选择数据删除?", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(async () => {
				await deleteZbModule(row.id)
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
		//实体关系
		handleRelation(row) {
			// this.$router.push({ name: "EquipmentRelation", query: { id: row.id } })
		},
	},
}
</script>
<style lang="scss" scoped>
.table {
	flex: 1;
}
</style>
