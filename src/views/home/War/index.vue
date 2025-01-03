<template>
	<div class="container">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="战例名称">
				<el-input v-model="queryForm.name" placeholder="请输入战例名称"></el-input>
			</el-form-item>
			<el-form-item label="战例标题">
				<el-input v-model="queryForm.title" placeholder="请输入战例标题"></el-input>
			</el-form-item>
			<el-form-item label="所属战争">
				<el-select v-model="queryForm.warfareId" placeholder="请选择所属战争" clearable style="width: 100%">
					<el-option v-for="item in WarfareList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
				</el-select>
			</el-form-item>
			<!-- <el-form-item label="分类标签">
				<el-input v-model="queryForm.classifyLabel" placeholder="请输入分类标签"></el-input>
			</el-form-item>
			<el-form-item label="装备标签">
				<el-input v-model="queryForm.equipLabel" placeholder="请输入装备标签"></el-input>
			</el-form-item> -->
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
			<el-table-column prop="name" label="战例名称" align="center" show-overflow-tooltip />
			<el-table-column prop="title" label="战例标题" align="center" show-overflow-tooltip />
			<el-table-column prop="warfareId" label="所属战争" align="center" show-overflow-tooltip />
			<!-- <el-table-column prop="classifyLabel" label="分类标签" align="center" show-overflow-tooltip />
			<el-table-column prop="equipLabel" label="装备标签" align="center" show-overflow-tooltip /> -->
			<el-table-column prop="fightTime" label="交战时间" align="center" show-overflow-tooltip />
			<el-table-column prop="fightAddress" label="交战地点" align="center" show-overflow-tooltip />
			<!-- <el-table-column prop="jd" label="地点经度" align="center" show-overflow-tooltip />
			<el-table-column prop="wd" label="地点纬度" align="center" show-overflow-tooltip /> -->
			<el-table-column prop="aggressor" label="攻方" align="center" show-overflow-tooltip />
			<el-table-column prop="defense" label="守方" align="center" show-overflow-tooltip />
			<!-- <el-table-column prop="aggressorTroops" label="攻方兵力" align="center" show-overflow-tooltip />
			<el-table-column prop="defenseTroops" label="守方兵力" align="center" show-overflow-tooltip />
			<el-table-column prop="aggressorEquip" label="攻方主要装备" align="center" show-overflow-tooltip />
			<el-table-column prop="defenseEquip" label="守方主要装备" align="center" show-overflow-tooltip />
			<el-table-column prop="environmentalFactor" label="环境因素" align="center" show-overflow-tooltip />
			<el-table-column prop="externalConditions" label="作战外部条件" align="center" show-overflow-tooltip />
			<el-table-column prop="process" label="作战过程" align="center" show-overflow-tooltip />
			<el-table-column prop="tactics" label="典型战术" align="center" show-overflow-tooltip />
			<el-table-column prop="warResult" label="战损及战果" align="center" show-overflow-tooltip /> -->
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
import { listWarfareExamples, deleteWarfareExamples } from "@/api/home/war"
import { dropDownQbWarfare } from "@/api/resource/war"
import { downloadBlob } from "@/utils"
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
			WarfareList: [],
		}
	},
	mounted() {
		//获取列表
		this.getTableData()
		//获取所属战争下拉框
		this.getWarfare()
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
			const { rows, total } = await listWarfareExamples(query)
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
				await deleteWarfareExamples(row.id)
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
		//获取所属战争下拉框
		async getWarfare() {
			const { data } = await dropDownQbWarfare()
			this.WarfareList = data
		},
	},
}
</script>
<style lang="scss" scoped></style>
