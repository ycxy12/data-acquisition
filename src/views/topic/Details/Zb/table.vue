<template>
	<div class="container">
		<el-form :inline="true" :model="queryForm" size="small" @keyup.enter.native="searchForm">
			<el-form-item label="装备名称">
				<el-input v-model="queryForm.zbName" placeholder="请输入装备名称"></el-input>
			</el-form-item>
			<el-form-item label="国家/地区">
				<el-select v-model="queryForm.zbSourceCountryId" placeholder="请选择国家/地区" clearable style="width: 100%">
					<el-option v-for="item in countryOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
		<div class="table">
			<div v-for="item in tableData" :key="item.id" :class="{ active: active === item.id }">
				<div class="title">
					<h3 @click="handleCheck(item)">{{ item.name }}</h3>
				</div>
				<div class="content">
					<div class="right">
						<p>{{ item.feature }}</p>
						<div class="tags">
							<button>{{ item.sourceCountryName }}</button>
						</div>
					</div>
				</div>
			</div>
			<div class="empty" v-if="tableData.length === 0">暂无数据</div>
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
import { listSubjectZb } from "@/api/topic/resource.js"
import { listCountry } from "@/api/resource/country"
import dayjs from "dayjs"

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
			loading: false,
			active: undefined,
			countryOptions: [],
		}
	},
	created() {
		const params = this.$route.params
		this.queryForm.subjectId = params.id
		this.getTableData()
		this.getCountry()
	},
	methods: {
		//搜索
		searchForm() {
			this.pagination.pageNum = 1
			this.active = undefined
			this.getTableData()
		},
		//重置搜索条件
		resetForm() {
			const params = this.$route.params
			this.queryForm = { subjectId: params.id }
			this.searchForm()
		},
		// 获取表格数据
		async getTableData() {
			this.loading = true
			let query = Object.assign({}, this.queryForm, this.pagination)
			const { rows, total } = await listSubjectZb(query)
			if (rows && rows.length > 0 && !this.active) {
				this.active = rows[0].id
			}
			this.$emit("updateArticle", this.active)
			this.tableData = rows
			this.total = total
			this.loading = false
		},
		//仅看最新
		handleUptoDate() {
			this.pagination.pageNum = 1
			this.queryForm.recentDays = 7
			this.getTableData()
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
		//是否是近七天
		isWithinLastSevenDays(date) {
			const inputDate = dayjs(date) // 将传入的日期转化为 dayjs 对象
			const currentDate = dayjs() // 获取当前日期

			// 计算当前日期和传入日期的差值，单位是天
			const diffInDays = currentDate.diff(inputDate, "day")

			// 判断是否在近七天内
			return diffInDays >= 0 && diffInDays <= 7
		},
		//返回数组
		parseString(input) {
			if (!input) return []
			// 使用正则表达式匹配英文逗号和中文逗号，并将其替换为统一的分隔符
			return input.split(/[,，]\s*/) // 匹配英文逗号 (`,`) 或中文逗号 (`，`)，并去除可能的空格
		},

		//选中
		handleCheck({ id }) {
			if (id === this.active) return
			this.active = id
			this.$emit("updateArticle", this.active)
		},
		//获取时间
		getTime(time) {
			if (!time) return ""
			return dayjs(time).format("YYYY-MM-DD")
		},
		//获取国家/地区
		async getCountry() {
			const { data } = await listCountry()
			this.countryOptions = data
		},
	},
}
</script>

<style lang="scss" scoped>
body .el-container .container .isNew {
	background: #0054fb;
	border: 1px solid #70a0ff;
}
.table {
	overflow-y: auto;
	overflow-x: hidden;
	height: calc(100vh - 295px);
	padding: 10px 0;
	& > div {
		margin-top: 5px;
		margin-bottom: 10px;
		padding: 15px;
		border-radius: 4px;
		background-color: rgba(14, 95, 255, 0.1);
		&.active {
			background: rgba(0, 84, 251, 0.4);
		}
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
			color: #fff;
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
	.empty {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20% 0;
		color: rgba($color: #ffffff, $alpha: 0.5);
	}
}
</style>
