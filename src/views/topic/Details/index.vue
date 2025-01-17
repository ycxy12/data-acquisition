<template>
	<div class="details">
		<div class="card">
			<div><span>专题名称：</span>{{ infoForm.name }}</div>
			<div><span>最新更新时间：</span>{{ infoForm.updateTime }}</div>
			<el-button icon="el-icon-back" size="small" @click="$router.back()" class="back">返回</el-button>
			<el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
		</div>
		<div class="box">
			<Table />
			<Article />
		</div>
	</div>
</template>

<script>
import Table from "./table.vue"
import Article from "./article.vue"
import { getSubjectByid } from "@/api/topic/subject.js"

export default {
	components: { Table, Article },
	data() {
		return {
			infoForm: {},
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
		handleAdd() {},
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
