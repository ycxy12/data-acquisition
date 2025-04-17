<template>
	<div class="container">
		<div class="wiki_dialog" v-if="wikiForm && Object.keys(wikiForm).length > 0">
			<h3 @click="handleTitleClick">{{ wikiForm.title }}</h3>
			<div class="wiki_content">
				<div
					ref="rightRef"
					class="right"
					v-if="wikiForm.contentInfo && wikiForm.contentInfo.infoboxTable && wikiForm.contentInfo.infoboxTable.length > 0"
				>
					<div class="infobox">
						<template v-for="(item, index) in wikiForm.contentInfo.infoboxTable">
							<div class="info_title" v-if="item && item.length === 1">{{ item[0] }}</div>
							<img v-if="index === 0 && wikiForm.images && wikiForm.images.length > 0" :src="wikiForm.images[0].url" alt="" />
							<div class="info_content" v-if="item && item.length > 1">
								<p v-html="item[0].replace(/\n/g, '<br/>')"></p>
								<!-- 遇到 /n 换行 -->
								<div v-html="item[1].replace(/\n/g, '<br/>')"></div>
							</div>
						</template>
					</div>
				</div>
				<div ref="leftRef" class="left">
					<!-- 描述 -->
					<div
						class="desc"
						v-if="
							wikiForm.contentInfo &&
							wikiForm.contentInfo.segment &&
							wikiForm.contentInfo.segment.text &&
							wikiForm.contentInfo.segment.text.length > 0
						"
					>
						<p v-for="item in wikiForm.contentInfo.segment.text" :key="item.index">{{ item }}</p>
					</div>
					<!-- 段落 -->
					<div
						class="segment"
						v-if="
							wikiForm.contentInfo &&
							wikiForm.contentInfo.segment &&
							wikiForm.contentInfo.segment.children &&
							wikiForm.contentInfo.segment.children.length > 0
						"
					>
						<template v-for="(item, index) in wikiForm.contentInfo.segment.children">
							<h4>{{ item.title }}</h4>
							<p v-for="cell in item.text" :key="cell">{{ cell }}</p>
							<div v-if="item.children">
								<template v-for="(child, idx) in item.children">
									<h4>{{ child.title }}</h4>
									<p v-for="element in child.text" :key="element">{{ element }}</p>
								</template>
							</div>
						</template>
					</div>
					<!-- 参考文献 -->
					<div class="references">
						<div class="reference_list">
							<div class="reference_item" v-for="item in wikiForm.references" :key="item">
								<span>{{ JSON.parse(item).index }}. </span>
								<a :href="item.url" target="_blank">{{ JSON.parse(item).text }}</a>
							</div>
						</div>
					</div>
					<!-- 分类 -->
					<div class="categories">
						<span>分类：</span>
						<em v-for="item in wikiForm.categories" :key="item">{{ item }}</em>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		wikiForm: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			loading: false,
		}
	},
	// watch: {
	// 	"props.contentInfo": {
	// 		handler(newVal, oldVal) {
	// 			this.adjustLeftHeight()
	// 		},
	// 		deep: true,
	// 	},
	// },
	methods: {
		handleTitleClick() {
			window.open(this.wikiForm.url, "_blank")
		},
		adjustLeftHeight() {
			this.$nextTick(() => {
				if (this.$ref.rightRef && this.$refs.leftRef && this.wikiForm.contentInfo?.infoboxTable?.length > 0) {
					const rightHeight = this.$ref.rightRef.offsetHeight
					this.$refs.leftRef.style.minHeight = `${rightHeight}px`
					console.log("右侧高度:", rightHeight, "设置左侧最小高度")
				}
			})
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
	.wiki_dialog {
		color: #fff;
		h3 {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 20px;
			border-bottom: 1px solid #a2a9b1;
			padding-bottom: 10px;
			text-align: left;
			&:hover {
				color: #3056a9;
				cursor: pointer;
			}
		}
		.wiki_content {
			position: relative;
			overflow: hidden; /* 创建BFC以处理浮动元素 */
			h4 {
				font-size: 20px;
				font-weight: bold;
				border-bottom: 1px solid #a2a9b1;
				padding-bottom: 10px;
			}
			.left {
				/* 将会由JavaScript动态设置min-height */
				.desc {
					font-size: 16px;
					line-height: 24px;
					margin-bottom: 20px;
				}
				.segment {
					font-size: 16px;
					line-height: 24px;
					margin-bottom: 20px;
				}
				.references {
					font-size: 16px;
					line-height: 24px;
					margin-bottom: 20px;
					a {
						color: #3056a9;
					}
				}
				.categories {
					font-size: 16px;
					color: #3056a9;
					border: 1px solid #a2a9b1;
					background: #f8f9fa;
					padding: 5px;
					width: max-content;
					em {
						font-style: normal;
						&:not(:last-child) {
							margin-right: 10px;
							&::after {
								content: "|";
								margin-left: 10px;
							}
						}
					}
				}
				.reference_item {
					display: flex;
					margin-bottom: 10px;
					a {
						color: #409eff;
						cursor: pointer;
						margin-left: 5px;
					}
				}
			}
			.right {
				width: 350px;
				color: #000;
				background: #fff;
				float: right;
				clear: right;
				margin-left: 15px;
				margin-bottom: 15px;

				.infobox {
					margin-left: 15px;
					margin-top: 10px;
					margin-bottom: 10px;
					padding: 5px;
					border: 1px solid #a2a9b1;
					border-spacing: 3px;
					background-color: #f8f9fa;
					.info_title {
						font-size: 16px;
						font-weight: bold;
						margin-bottom: 10px;
						background: #eee;
						line-height: 30px;
						text-align: center;
					}
					img {
						width: 100%;
					}
					.info_content {
						display: flex;
						p {
							line-height: 30px;
							width: 100px;
							margin: 0;
							font-weight: bold;
							flex-shrink: 0;
							margin-right: 10px;
						}
						div {
							line-height: 30px;
						}
					}
				}
			}
		}
	}
}
</style>
