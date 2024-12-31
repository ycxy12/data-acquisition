<template>
	<div class="input-tag">
		<div class="tags">
			<el-tag v-for="(tag, index) in tags" :key="index" closable type="info" @close="removeTag(index)">{{ tag }}</el-tag>
		</div>
		<el-input
			type="text"
			v-model="inputValue"
			@keydown.native.enter.prevent="addTag"
			@keydown.native.backspace="handleBackspace"
			:placeholder="placeholder"
		/>
	</div>
</template>

<script>
export default {
	name: "InputTag",
	props: {
		value: {
			type: Array,
			default: () => [],
		},
		placeholder: {
			type: String,
			default: "请输入",
		},
	},
	data() {
		return {
			// tags: [], // 存储标签
			inputValue: "", // 输入框的值
		}
	},
	computed: {
		tags: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit("input", val)
			},
		},
	},
	methods: {
		addTag() {
			// 去掉前后空格并验证标签是否有效
			const tag = this.inputValue.trim()
			if (tag && !this.tags.includes(tag)) {
				this.tags.push(tag)
			}
			this.inputValue = "" // 清空输入框
		},
		removeTag(index) {
			this.tags.splice(index, 1) // 删除指定标签
		},
		handleBackspace() {
			// 如果输入框为空，删除最后一个标签
			if (!this.inputValue && this.tags.length > 0) {
				this.tags.pop()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.input-tag {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	border: 1px solid #dcdfe6;
	padding: 4px;
	border-radius: 4px;
	line-height: 24px;

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-right: 5px;
		.el-tag {
			height: 30px;
			line-height: 28px;
		}
	}

	::v-deep .el-input {
		flex: 1;
		min-width: 100px;
		.el-input__inner {
			border: none;
			outline: none;
			height: 30px;
			line-height: 30px;
			padding: 0;
		}
	}
}
</style>
