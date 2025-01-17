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
		<div
			class="table_box"
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
		>
			<div class="table">
				<div v-for="item in tableData" :key="item.id" class="item">
					<AspectRatio :ratio="16 / 7" class="top" :cover="item.cover">
						<el-tag effect="dark" v-if="item.isSubscribed" @click="updataSubscription(item.id, false)">已关注</el-tag>
						<el-tag effect="dark" v-else type="danger" class="danger" @click="updataSubscription(item.id, true)">未关注</el-tag>
						<div class="title" @click="handleDetail(item)">{{ item.name }}</div>
					</AspectRatio>
					<div class="bottom">
						<p>最新更新时间：{{ item.updateTime }}</p>
						<button class="new" v-if="isWithinLastSevenDays(item.lastUpdatedTime)">新</button>
						<span @click="handleEdit(item)">编辑</span>
						<span @click="handleDelete(item)">删除</span>
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
		<EditDrawer ref="editDrawerRef" @refresh="getTableData" />
	</div>
</template>

<script>
import { listSubject, deleteSubject, getMySubjectList, setSubjectSubscription } from "@/api/topic/subject.js"
import AspectRatio from "@/components/AspectRatio/index.vue"
import EditDrawer from "./editDrawer.vue"
import dayjs from "dayjs"

export default {
	components: { AspectRatio, EditDrawer },
	props: {
		active: {
			type: Number,
			default: 0,
		},
	},
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
			listRequest: getMySubjectList,
		}
	},
	watch: {
		active: {
			handler(newVal) {
				if (newVal === 0) {
					this.listRequest = getMySubjectList
				}
				if (newVal === 1) {
					this.listRequest = listSubject
				}
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
			this.queryForm = {}
			this.searchForm()
		},
		// 获取表格数据
		async getTableData() {
			this.loading = true
			let query = Object.assign({}, this.queryForm, this.pagination)
			const { rows, total } = await this.listRequest(query)
			this.tableData = rows
			this.total = total
			this.loading = false
		},
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
				await deleteSubject(id)
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
		//跳转情报详情页面
		handleDetail(item) {
			this.$router.push(`/topic/${item.id}`)
		},
		//情报专题订阅/取消订阅
		async updataSubscription(subjectId, isSubscribe) {
			await setSubjectSubscription({ subjectIds: [subjectId], isSubscribe })
			this.$message.success("操作成功")
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
		background-size: 100% 100%;
		.el-tag {
			cursor: pointer;
			position: absolute;
			top: 15px;
			right: 15px;
			height: 22px;
			line-height: 20px;
			color: #fff;
			border: 1px solid #409eff;
			background: rgba(0, 84, 251, 0.5);
		}
		.danger {
			background-color: rgba($color: #f56c6c, $alpha: 0.5);
			border-color: #f56c6c;
			&:hover {
				color: #f56c6c;
			}
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
