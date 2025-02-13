<template>
	<div class="container">
		<div
			v-if="articleInfo"
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
		>
			<h3>{{ articleInfo.title }}</h3>
			<div class="sub_title">
				<span>{{ articleInfo.releaseTime }}</span>
				<span>{{ articleInfo.source }}</span>
			</div>
			<div class="tags">
				<button v-for="(element, index) in parseString(articleInfo.keywords)" :key="index">{{ element }}</button>
			</div>
			<p v-html="articleInfo.content"></p>
			<div class="cover">
				<img v-if="articleInfo.cover" :src="articleInfo.cover" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
import { getArticleByid } from "@/api/topic/article.js"
export default {
	props: {
		articleId: {
			type: String,
			default: undefined,
		},
	},
	data() {
		return {
			articleInfo: null,
			loading: false,
		}
	},
	watch: {
		articleId: {
			handler(newVal) {
				if (newVal) {
					this.getArticleInfo()
				} else {
					this.articleInfo = null
				}
			},
		},
	},
	methods: {
		async getArticleInfo() {
			if (!this.articleId) return

			this.loading = true
			const { data } = await getArticleByid(this.articleId)
			this.articleInfo = data
			this.loading = false
		},
		//返回数组
		parseString(input) {
			if (!input) return []
			// 使用正则表达式匹配英文逗号和中文逗号，并将其替换为统一的分隔符
			return input.split(/[,，]\s*/) // 匹配英文逗号 (`,`) 或中文逗号 (`，`)，并去除可能的空格
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	height: calc(100vh - 148px);
	& > div {
		overflow-y: auto;
		height: 100%;
	}
	h3 {
		color: #fff;
		font-size: 20px;
		margin-top: 20px;
		text-align: center;
		font-weight: 500;
	}
	.sub_title {
		display: flex;
		justify-content: center;
		margin: 30px 0 20px;
		color: #fff;
		span {
			padding-right: 15px;
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
		margin: 10px 0;
		color: #fff;
		text-indent: 2em;
		line-height: 28px;
		::v-deep img {
			width: calc(100% - 4em);
		}
	}
	.cover {
		width: 100%;
		text-align: center;
		margin-bottom: 50px;
		img {
			width: 60%;
		}
	}
}
</style>
