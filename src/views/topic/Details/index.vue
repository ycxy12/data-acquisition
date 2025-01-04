<template>
	<div class="details">
		<div class="card">
			<div><span>专题名称：</span>对T作战问题研究</div>
			<div><span>最新更新时间：</span>2024-10-29 10:01:25</div>
			<el-button icon="el-icon-back" size="small" @click="$router.back()" class="back">返回</el-button>
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

export default {
	components: { Table, Article },
	data() {
		return {}
	},
	methods: {},
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
