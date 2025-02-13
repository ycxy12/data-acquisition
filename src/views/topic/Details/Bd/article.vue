<template>
	<div class="container">
		<div
			class="content"
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
		>
			<div v-if="detail && JSON.stringify(detail) !== '{}'" class="view">
				<div>
					<label>部队名称：</label>
					<p>{{ detail.troopsName || "--" }}</p>
				</div>

				<div>
					<label>所属国家：</label>
					<p>{{ getCountryName(detail.countryId) }}</p>
				</div>
				<div>
					<label>简介：</label>
					<p>{{ detail.summary || "--" }}</p>
				</div>
				<div>
					<label>规模(人数)：</label>
					<p>{{ detail.scale || "--" }}</p>
				</div>
				<div>
					<label>军种：</label>
					<p>{{ detail.militaryService || "--" }}</p>
				</div>
				<div>
					<label>常住地：</label>
					<p>{{ detail.domicile || "--" }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getBlbcByid } from "@/api/resource/troops"
import { listCountry } from "@/api/resource/country"

export default {
	props: {
		articleId: {
			type: String,
			default: undefined,
		},
	},
	data() {
		return {
			loading: false,
			detail: {},
			country: [],
		}
	},
	watch: {
		articleId: {
			handler(newVal) {
				if (newVal) {
					this.getArticleInfo()
				} else {
					this.detail = {}
				}
			},
		},
	},
	mounted() {
		this.getCountry()
	},
	methods: {
		async getArticleInfo() {
			if (!this.articleId) return

			this.loading = true
			const { data } = await getBlbcByid(this.articleId)
			this.detail = data
			this.loading = false
		},
		//获取国家/地区
		async getCountry() {
			const { data } = await listCountry()
			this.country = data
		},
		//获取国家名称
		getCountryName(id) {
			return this.country.find((item) => item.id === id)?.name || "--"
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	overflow: hidden;
	height: calc(100vh - 148px);

	.content {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.view {
		& > div {
			display: flex;
			margin-bottom: 10px;
			label {
				width: 100px;
				text-align: right;
				margin-right: 10px;
				line-height: 30px;
				color: #fff;
			}
			p {
				flex: 1;
				margin: 0;
				line-height: 30px;
				color: #fff;
			}
		}
	}
}
</style>
