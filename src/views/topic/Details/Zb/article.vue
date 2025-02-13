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
					<label>装备名称：</label>
					<p>{{ detail.name || "--" }}</p>
				</div>
				<div>
					<label>装备特征：</label>
					<el-table
						:data="detail.attrs"
						stripe
						element-loading-text="拼命加载中"
						element-loading-spinner="el-icon-loading"
						element-loading-background="rgba(0, 0, 0, 0.5)"
					>
						<el-table-column prop="attrName" label="属性" align="center" />
						<el-table-column prop="value" label="属性值" align="center" class-name="attrs">
							<template slot-scope="{ row }">
								<div class="attr_cell">
									<div v-for="item in row.attrs" :key="item">{{ item }}</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div>
					<label>装备类型：</label>
					<p>{{ getEquipmentTypeName(detail.type) }}</p>
				</div>
				<div>
					<label>研制国家/地区：</label>
					<p>{{ getCountryName(detail.sourceCountryId) }}</p>
				</div>
				<div>
					<label>研制时间：</label>
					<p>{{ detail.devTime || "--" }}</p>
				</div>
				<div>
					<label>服役时间：</label>
					<p>{{ detail.attendedTime || "--" }}</p>
				</div>
				<div>
					<label>备注：</label>
					<p>{{ detail.remark || "--" }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getZbInfoByid } from "@/api/home/equipment"
import { listZbType } from "@/api/resource/equipment"
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
			countryOptions: [],
			equimentTypeOptions: [],
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
		this.getEquipmentType()
		this.getCountry()
	},
	methods: {
		async getArticleInfo() {
			if (!this.articleId) return

			this.loading = true
			const { data } = await getZbInfoByid(this.articleId)
			this.detail = data
			this.loading = false
		},
		//获取装备类型
		async getEquipmentType() {
			const { data } = await listZbType()
			this.equimentTypeOptions = data
		},
		//获取国家/地区
		async getCountry() {
			const { data } = await listCountry()
			this.countryOptions = data
		},
		//获取装备类型名称
		getEquipmentTypeName(id) {
			return this.equimentTypeOptions.find((item) => item.id === id)?.name || "--"
		},
		//获取国家/地区名称
		getCountryName(id) {
			return this.countryOptions.find((item) => item.id === id)?.name || "--"
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
				width: 120px;
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
		::v-deep .attrs {
			padding: 0;
		}
		::v-deep .cell {
			padding: 0;
		}
		.attr_cell {
			& > div {
				padding: 8px 10px;
				border-bottom: 1px solid rgba(112, 160, 255, 1);
			}
			& > div:last-child {
				border-bottom: none;
			}
		}
	}
}
</style>
