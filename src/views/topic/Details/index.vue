<template>
	<div class="details">
		<div class="card">
			<div><span>专题名称：</span>{{ infoForm.name }}</div>
			<div><span>最新更新时间：</span>{{ infoForm.updateTime }}</div>
			<div class="back">
				<el-button icon="el-icon-back" size="small" @click="$router.back()">返回</el-button>
				<el-button icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
				<el-button icon="el-icon-edit-outline" size="small" @click="handleEdit">编辑</el-button>
				<el-button icon="el-icon-delete" size="small" @click="handleDelete">删除</el-button>
			</div>
		</div>
		<div class="box">
			<Table ref="tableRef" @updateArticle="handleArticle" />
			<Article ref="articleRef" :articleId="articleId" />
		</div>
		<EditDrawer ref="editDrawerRef" @refresh="onRefresh" />
	</div>
</template>

<script>
import Table from "./table.vue"
import Article from "./article.vue"
import EditDrawer from "./editDrawer.vue"
import { getSubjectByid } from "@/api/topic/subject.js"
import { deleteArticle } from "@/api/topic/article.js"

export default {
	components: { Table, Article, EditDrawer },
	data() {
		return {
			infoForm: {},
			articleId: undefined,
		}
	},
	created() {
		this.getSubjectInfo()
	},
	methods: {
		async getSubjectInfo() {
			let params = this.$route.params
			const { data } = await getSubjectByid(params.id)
			this.infoForm = data
		},
		// 创建专题
		handleAdd() {
			this.$refs.editDrawerRef.openDrawer()
		},
		//编辑
		handleEdit() {
			this.$refs.editDrawerRef.openDrawer(this.articleId)
		},
		//删除
		handleDelete() {
			this.$confirm("确定将选择数据删除?", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(async () => {
				await deleteArticle(this.articleId)
				this.$message.success("操作成功!")
				this.$refs.tableRef.searchForm()
			})
		},
		handleArticle(id) {
			this.articleId = id
		},
		//刷新列表
		onRefresh() {
			this.$refs.tableRef.getTableData()
			this.$refs.articleRef.getArticleInfo()
		},
	},
}
</script>

<style lang="scss" scoped>
.details {
	.card {
		color: #fff;
		display: flex;
		align-items: center;
		position: relative;
		& > div:first-child {
			margin-right: 40px;
		}
	}
	.back {
		position: absolute;
		top: 8px;
		right: 15px;
	}
	.box {
		display: flex;
		gap: 15px;
		& > div {
			flex: 1;
		}
	}
}
</style>
