<template>
	<div class="details">
		<div class="card">
			<div><span>专题名称：</span>对T作战问题研究</div>
			<div><span>最新更新时间：</span>2024-10-29 10:01:25</div>
		</div>
		<div class="container">
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
		display: flex;
		align-items: center;
		& > div:first-child {
			margin-right: 40px;
		}
	}
}
</style>
