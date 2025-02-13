<template>
	<div class="container">
		<div
			class="content"
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
		>
			<div v-if="detail && JSON.stringify(detail) !== '{}'">
				<h3>{{ detail.name }}</h3>
				<div class="sub_title">
					<span>发布时间：{{ getTime(detail.registerTime) }}</span>
					<span @click="handleGo">
						来源：<span>{{ detail.source }}</span>
					</span>
				</div>
				<div class="tags">
					<button v-for="(item, index) in getArray(detail.classifyLabel)" :key="index">{{ item }}</button>
				</div>
				<p class="abstract">
					<span>摘要:</span>
					<span v-if="detail.title">{{ detail.title }}。</span>
					<span v-if="detail.process">{{ detail.process }}。</span>
					<span v-if="detail.warResult">{{ detail.warResult }}。</span>
				</p>
				<div class="line"></div>

				<p><span>交战时间:</span> {{ getTime(detail.fightTime) }}</p>
				<p><span>交战地点:</span> {{ detail.fightAddress }}</p>
				<div class="line"></div>

				<p class="acticl" v-html="isTranslate ? detail.originalText : detail.translation"></p>
				<div class="line"></div>

				<el-descriptions title="战斗详情" :border="true" :column="2">
					<el-descriptions-item label="攻方">{{ detail.aggressor || "--" }}</el-descriptions-item>
					<el-descriptions-item label="守方">{{ detail.defense || "--" }}</el-descriptions-item>
					<el-descriptions-item label="攻方兵力">{{ detail.aggressorTroops || "--" }}</el-descriptions-item>
					<el-descriptions-item label="守方兵力">{{ detail.defenseTroops || "--" }}</el-descriptions-item>
					<el-descriptions-item label="攻方主要装备">{{ detail.aggressorEquip || "--" }}</el-descriptions-item>
					<el-descriptions-item label="守方主要装备">{{ detail.defenseEquip || "--" }}</el-descriptions-item>
					<el-descriptions-item label="作战外部条件">{{ detail.externalConditions || "--" }}</el-descriptions-item>
				</el-descriptions>

				<div class="translate" @click="isTranslate = !isTranslate" v-if="detail.originalText">
					<svg-icon name="translation" v-if="isTranslate" />
					<svg-icon name="original" v-else />
				</div>
				<!-- <el-button icon="el-icon-back" size="small" @click="$router.back()" class="back">返回</el-button> -->
			</div>
		</div>
	</div>
</template>

<script>
import { getWarfareExamplesByid } from "@/api/home/war"
import dayjs from "dayjs"

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
			isTranslate: false,
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
	methods: {
		async getArticleInfo() {
			if (!this.articleId) return

			this.loading = true
			const { data } = await getWarfareExamplesByid(this.articleId)
			this.detail = data
			this.loading = false
		},
		getArray(str) {
			if (!str) return []
			return str.split("、") || []
		},
		handleGo() {
			//跳转
			window.open(this.detail.url, "_blank")
		},
		//获取时间
		getTime(time) {
			if (!time) return ""
			return dayjs(time).format("YYYY-MM-DD")
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

		& > div {
			// max-width: 1000px;
			margin: 0 auto;
			position: relative;
		}
	}

	.translate {
		position: absolute;
		top: 0px;
		right: 20px;
		cursor: pointer;

		svg {
			width: 30px;
			height: 30px;
		}
	}

	h3 {
		color: #fff;
		font-size: 24px;
		margin-top: 20px;
		text-align: center;
		// font-weight: 500;
	}

	h4 {
		color: #fff;
		font-size: 16px;
		margin-top: 20px;
		margin-bottom: 10px;
		// font-weight: 500;
	}

	.sub_title {
		display: flex;
		justify-content: center;
		margin: 30px 0 20px;
		color: #fff;

		span {
			padding-right: 30px;
			span {
				padding-right: 0;
				cursor: pointer;
				&:hover {
					color: #409eff;
				}
			}
		}

		span:last-child {
			padding-right: 0;
		}
	}

	.tags {
		text-align: center;
		margin-bottom: 20px;

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

	p {
		font-size: 16px;
		margin: 0;
		color: #fff;
		line-height: 28px;
		letter-spacing: 1px;

		span {
			// font-weight: 600;
			// display: inline-block;
			// width: 120px;
			text-align: right;
			padding-right: 10px;
		}
	}

	.acticl {
		// text-indent: 2em;
		margin-top: 40px;
	}

	.line {
		margin: 10px 0;
	}

	.abstract {
		background: rgb(0, 17, 50);
		padding: 15px;
		border-radius: 4px;
	}

	.el-descriptions {
		color: #fff;
		margin-top: 40px;
	}

	::v-deep .el-descriptions__title {
		font-weight: 500;
	}

	::v-deep .el-descriptions__body {
		background: transparent;
	}

	::v-deep .el-descriptions-item__label.is-bordered-label {
		color: #fff;
		background: transparent;
	}

	::v-deep .el-descriptions .is-bordered .el-descriptions-item__cell {
		color: #fff;
		// border: 1px solid #70a0ff;
	}

	.back {
		position: fixed;
		top: 95px;
		right: 30px;
	}
}
</style>
