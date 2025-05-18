<template>
	<div class="container">
		<el-table
			ref="table"
			row-key="id"
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
			:data="tableData"
			size="small"
			stripe
			:height="`calc(100vh - 255px)`"
		>
			<el-table-column type="index" width="55" label="序号" align="center" />
			<el-table-column prop="title" label="名称" />
			<el-table-column prop="source" label="来源" align="center" />
			<el-table-column prop="releaseTime" label="发布时间" align="center" />
			<el-table-column label="操作" align="center">
				<template slot-scope="{ row }">
					<el-button type="text" size="small" @click="handleMessage(row.id)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { mapGetters, } from "vuex"
import { publishedCount, publishedArticles, readMsg } from "@/api/topic/wiki.js"


export default {
	data() {
		return {
			queryForm: {},
			tableData: [],
			loading: false,
		}
	},
	computed: {
        ...mapGetters(["getUserId", "getUserInfo"]),
    },
	created() {
		this.getTableData()
	},
	methods: {
		//搜索
		searchForm() {
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
			let userId = this.getUserId ? this.getUserId : this.getUserInfo.id
			const { data } = await publishedArticles(userId)
			this.tableData = data
			this.loading = false
		},
		async handleMessage(id) {
            this.$router.push(`/topic/news/${id}`)
			let userId = this.getUserId ? this.getUserId : this.getUserInfo.id
            await readMsg({ msgId: id, userId: userId })
            this.getPublishedArticles()
        },
	},
}
</script>
<style lang="scss" scoped></style>
