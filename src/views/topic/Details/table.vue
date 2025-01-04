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
				<el-button type="primary" @click="handleUptoDate">仅看最新</el-button>
			</el-form-item>
		</el-form>
		<div class="table">
			<div v-for="item in 10" :key="item">
				<div class="title">
					<h3>赖清德：强化台湾民主防卫能力巩固全球民主韧性</h3>
					<button class="new">新</button>
				</div>
				<div class="content">
					<img src="./u38.png" alt="" />
					<div class="right">
						<p>
							近年来，台海局势持续紧张，尤其是在2024年12月，随着一系列军事动作的曝光，台海局势更是进入了一个新的敏感阶段。近日，台媒爆出台特勤队与美方人员合作进行攻坚训练，而解放军则通过40艘
						</p>
						<div class="tags">
							<button>台湾</button>
							<button>美国</button>
						</div>
						<div class="time">
							<span>新浪军事</span>
							<span>2021-10-29 10:01:25</span>
						</div>
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
	</div>
</template>

<script>
export default {
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
		//仅看最新
		handleUptoDate() {},
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

<style lang="scss" scoped>
.table {
	overflow-y: auto;
	height: calc(100vh - 295px);
	padding: 10px 0;
	& > div {
		margin-top: 5px;
		margin-bottom: 10px;
		padding: 15px;
		border-radius: 4px;
	}
	& > div:nth-child(even) {
		background-color: rgba(14, 95, 255, 0.2);
	}
	.title {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		h3 {
			margin: 0;
			color: #fff;
			font-weight: 500;
			cursor: pointer;
			&:hover {
				color: #409eff;
			}
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
	}
	.content {
		display: flex;
		gap: 10px;
		img {
			width: 155px;
			height: 100px;
			flex-shrink: 0;
		}
		.right {
			p {
				margin: 0;
				line-height: 22px;
				font-size: 14px;
				color: #fff;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
		.tags {
			margin: 8px 0 6px;
			button {
				font-size: 12px;
				border-radius: 4px;
				padding: 4px 10px;
				color: #409eff;
				background: rgba(0, 84, 251, 0.2);
				border: 1px solid #70a0ff;
				margin-right: 15px;
			}
		}
		.time {
			span {
				font-size: 14px;
				padding-right: 15px;
				color: #fff;
			}
		}
	}
}
</style>
