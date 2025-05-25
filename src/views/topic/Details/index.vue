<template>
	<div class="details">
		<div class="card">
			<div><span>专题名称：</span>{{ infoForm.name }}</div>
			<div><span>最新更新时间：</span>{{ infoForm.updateTime }}</div>
			<div class="back">
				<el-button icon="el-icon-back" size="small" @click="$router.back()">返回</el-button>
				<el-button icon="el-icon-plus" size="small" @click="handleAdd"
					v-if="infoForm.type !== 'wiki'">新增</el-button>
				<el-button icon="el-icon-edit-outline" size="small" @click="handleEdit"
					v-if="!infoForm.type || infoForm.type === 'news'">
					编辑
				</el-button>
				<el-button icon="el-icon-delete" size="small" @click="handleDelete"
					v-if="infoForm.type !== 'wiki'">删除</el-button>
				<template v-if="infoForm.type == 'news'">
					<el-button v-if="wikiForm && wikiForm.isPublish" icon="el-icon-s-promotion" size="small"
						@click="handleDispath">取消发布</el-button>
					<el-button v-else icon="el-icon-s-promotion" size="small" @click="handleDispath">发布</el-button>
				</template>

			</div>
		</div>
		<div class="box">
			<!-- 新闻 -->
			<template v-if="infoForm.type === 'news'">
				<NewsTable ref="tableRef" @updateArticle="handleWiki" />
				<NewsArticle ref="articleRef" :articleId="wikiForm ? wikiForm.id :''" />
			</template>
			<!-- 装备 -->
			<template v-if="infoForm.type === 'zb'">
				<ZbTable ref="tableRef" @updateArticle="handleArticle" />
				<ZbArticle ref="articleRef" :articleId="articleId" />
			</template>
			<!-- 编成编组 -->
			<template v-if="infoForm.type === 'bd'">
				<BdTable ref="tableRef" @updateArticle="handleArticle" />
				<BdArticle ref="articleRef" :articleId="articleId" />
			</template>
			<!-- 战例 -->
			<template v-if="infoForm.type === 'zl'">
				<ZlTable ref="tableRef" @updateArticle="handleArticle" />
				<ZlArticle ref="articleRef" :articleId="articleId" />
			</template>
			<!-- 维基百科 -->
			<template v-if="infoForm.type === 'wiki'">
				<WikiTable ref="tableRef" @updateArticle="handleWiki" />
				<WikiArticle ref="articleRef" :wikiForm="wikiForm" />
			</template>
		</div>
		<!-- 新闻 -->
		<NewsEditDrawer ref="newsEditDrawerRef" @refresh="onRefresh" />
		<!-- 装备 -->
		<ZbEditDrawer ref="zbEditDrawerRef" @refresh="onRefresh" />
		<!-- 编成编组 -->
		<BdEditDrawer ref="bdEditDrawerRef" @refresh="onRefresh" />
		<!-- 战例 -->
		<ZlEditDrawer ref="zlEditDrawerRef" @refresh="onRefresh" />
		<!-- 维基百科 -->
		<!-- <WikiEditDrawer ref="WikiEditDrawerRef" @refresh="onRefresh" /> -->
	</div>
</template>

<script>
import NewsTable from "./News/table.vue"
import NewsArticle from "./News/article.vue"
import NewsEditDrawer from "./News/editDrawer.vue"
import ZlTable from "./Zl/table.vue"
import ZlArticle from "./Zl/article.vue"
import ZlEditDrawer from "./Zl/editDrawer.vue"
import ZbTable from "./Zb/table.vue"
import ZbArticle from "./Zb/article.vue"
import ZbEditDrawer from "./Zb/editDrawer.vue"
import BdTable from "./Bd/table.vue"
import BdArticle from "./Bd/article.vue"
import BdEditDrawer from "./Bd/editDrawer.vue"
import WikiTable from "./Wiki/table.vue"
import WikiArticle from "./Wiki/article.vue"
// import WikiEditDrawer from "./Wiki/editDrawer.vue"
import { getSubjectByid } from "@/api/topic/subject.js"
import { deleteArticle } from "@/api/topic/article.js"
import { publishNews } from "@/api/topic/wiki.js"
import { deleteSubjectZl, deleteSubjectZb, deleteSubjectBlbc } from "@/api/topic/resource.js"

export default {
	components: {
		NewsTable,
		NewsArticle,
		NewsEditDrawer,
		ZlTable,
		ZlArticle,
		ZlEditDrawer,
		ZbTable,
		ZbArticle,
		ZbEditDrawer,
		BdTable,
		BdArticle,
		BdEditDrawer,
		WikiTable,
		WikiArticle,
	},
	data() {
		return {
			infoForm: {},
			articleId: undefined,
			wikiForm: undefined,
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
			if (this.infoForm.type === "zl") {
				this.$refs.zlEditDrawerRef.openDrawer()
			} else if (this.infoForm.type === "bd") {
				this.$refs.bdEditDrawerRef.openDrawer()
			} else if (this.infoForm.type === "zb") {
				this.$refs.zbEditDrawerRef.openDrawer()
			} else {
				this.$refs.newsEditDrawerRef.openDrawer()
			}
		},
		//编辑
		handleEdit() {
			this.$refs.newsEditDrawerRef.openDrawer(this.articleId)
		},
		//删除
		handleDelete() {
			this.$confirm("确定将选择数据删除?", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(async () => {
				let params = this.$route.params
				if (this.infoForm.type === "zl") {
					await deleteSubjectZl({ subjectId: params.id, zlIds: [this.articleId] })
				} else if (this.infoForm.type === "bd") {
					await deleteSubjectBlbc({ subjectId: params.id, blbcIds: [this.articleId] })
				} else if (this.infoForm.type === "zb") {
					await deleteSubjectZb({ subjectId: params.id, zbIds: [this.articleId] })
				} else {
					await deleteArticle(this.articleId)
				}
				this.$message.success("操作成功!")
				this.$refs.tableRef.searchForm()
			})
		},
		//发布
		async handleDispath() {
			await publishNews({ id: this.wikiForm.id, isPublish: !this.wikiForm.isPublish })
			this.wikiForm.isPublish = !this.wikiForm.isPublish
			this.$message.success("操作成功!")
			this.$refs.articleRef.getArticleInfo()
		},
		handleArticle(id) {
			this.articleId = id
		},
		handleWiki(item) {
			this.wikiForm = item
			this.articleId = item.id
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

		&>div:first-child {
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

		&>div {
			flex: 1;
		}
	}
}
</style>
