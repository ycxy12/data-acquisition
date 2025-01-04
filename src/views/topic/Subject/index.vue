<template>
	<div class="container">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="专题名称">
				<el-input v-model="queryForm.name" placeholder="请输入专题名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
			<el-form-item style="float: right">
				<el-button icon="el-icon-plus" type="primary" @click="handleAdd">创建专题</el-button>
			</el-form-item>
		</el-form>
		<!-- 表格 -->
		<div class="table_box">
			<div class="table">
				<div v-for="item in 12" :key="item" class="item">
					<AspectRatio :ratio="16 / 7" class="top">
						<el-tag effect="dark">已关注</el-tag>
						<div class="title" @click="handleDetail(item)">中美之战——中国的复兴之战</div>
					</AspectRatio>
					<div class="bottom">
						<p>最新更新时间：10/29 10:01:25</p>
						<button class="new">新</button>
						<span @click="handleEdit(row)">编辑</span>
						<span @click="handleDelete(row)">删除</span>
					</div>
				</div>
			</div>
		</div>
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
import AspectRatio from "@/components/AspectRatio/index.vue"
import EditDrawer from "./editDrawer.vue"

export default {
	components: { AspectRatio, EditDrawer },
	data() {
		return {
			queryForm: {},
			pagination: {
				pageNum: 1,
				pageSize: 10,
			},
			total: 0,
		}
	},
	methods: {
		//搜索
		searchForm() {},
		//重置搜索条件
		resetForm() {
			this.queryForm = {}
			this.searchForm()
		},
		getTableData() {},
		// 创建专题
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
				// await deleteCountry(id)
				// this.$message.success("操作成功!")
				// this.getTableData()
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
		//跳转情报详情页面
		handleDetail(item) {
			this.$router.push({
				path: "/topic/details",
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.btn {
	display: flex;
	justify-content: flex-end;
	padding-bottom: 15px;
}
.table_box {
	height: calc(100vh - 330px);
	overflow-y: auto;
	padding: 15px 0;
	// border-top: 1px solid rgba(112, 160, 255, 1);
	// border-bottom: 1px solid rgba(112, 160, 255, 1);
}
.table {
	display: grid;
	grid-template-columns: repeat(4, auto);
	grid-gap: 15px;
	.item {
		border-radius: 10px;
		border: 1px solid rgba(112, 160, 255, 1);
		overflow: hidden;
	}
	::v-deep .top .content {
		background: url("./123.png");
		background-size: 100% 100%;
		.el-tag {
			position: absolute;
			top: 15px;
			right: 15px;
			height: 22px;
			line-height: 20px;
			color: #fff;
			border: 1px solid #409eff;
			background: rgba(0, 84, 251, 0.5);
		}
		.title {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			box-sizing: border-box;
			border-radius: 10px 10px 0 0;
			padding: 8px 15px;
			color: #fff;
			font-size: 16px;
			font-weight: 600;
			letter-spacing: 1px;
			cursor: pointer;
			&:hover {
				color: #409eff;
			}
		}
	}
	.bottom {
		display: flex;
		align-items: center;
		background-color: rgba(0, 17, 50, 1);
		padding: 10px 15px;
		p {
			margin: 0;
			font-size: 14px;
			white-space: nowrap;
			color: #fff;
		}
		.new {
			width: 20px;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 12px;
			border: none;
			color: #fff;
			border-radius: 50%;
			background-color: #f56c6c;
			margin-left: 10px;
		}
		span {
			font-size: 14px;
			color: #f56c6c;
			margin-left: 10px;
			cursor: pointer;
			white-space: nowrap;
		}
		span:nth-of-type(1) {
			margin-left: auto;
			color: #409eff;
		}
	}
}
</style>
