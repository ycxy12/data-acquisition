<template>
	<div class="virtual_scroller" ref="dropdown">
		<div class="title" :class="{ active: isExpand }" @click="handleClick">
			<template>
				<div class="value">
					<el-tag v-for="(item, index) in list" :key="index" type="info" closable @close="handleClose(index)">{{ item }}</el-tag>
					<el-input ref="inputRef" v-model="search" size="small" placeholder="请回车搜索" @keyup.enter.native="handleSearch"></el-input>
				</div>
				<i class="el-icon-arrow-down"></i>
			</template>
			<div
				class="down"
				v-show="isExpand"
				@click.stop
				v-loading="loading"
				element-loading-text="拼命加载中"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(0, 0, 0, 0.5)"
			>
				<RecycleScroller :items="searchOption" :item-size="34" :buffer="1000" key-field="id" class="virtual_dropdown">
					<template v-slot="{ item }">
						<div class="list-item" @click="handleCheck(item)" :class="{ active: ids.includes(item.id) }">{{ item.name }}</div>
					</template>
				</RecycleScroller>
			</div>
		</div>
	</div>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller"
import "vue-virtual-scroller/dist/vue-virtual-scroller.css"
import { dropDownWarfareExamples, listWarfareExamples } from "@/api/home/war"

export default {
	name: "VirtualScroller",
	components: { RecycleScroller },
	props: {
		value: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			list: [],
			options: [],
			isExpand: false,
			search: "",
			searchOption: [],
			loading: true,
		}
	},
	computed: {
		ids: {
			get() {
				return this.value
			},
			set(value) {
				this.$emit("input", value)
			},
		},
	},
	// watch: {
	// 	ids: {
	// 		async handler(newVal) {
	// 			if (this.options.length === 0) {
	// 				await this.getWarfareExamples()
	// 			}
	// 			console.log(this.value, "this.value")
	// 			console.log(this.list, "this.list---")
	// 			if (this.list && this.list.length > 0) return
	// 			this.setList()
	// 		},
	// 	},
	// },
	mounted() {
		document.addEventListener("click", this.handleClickOutside)
	},
	beforeDestroy() {
		document.removeEventListener("click", this.handleClickOutside)
	},
	methods: {
		handleClickOutside(event) {
			if (!this.$refs.dropdown.contains(event.target)) {
				this.isExpand = false
			}
		},
		handleClick() {
			const inputElement = this.$refs.inputRef.$el.querySelector("input")
			if (document.activeElement === inputElement && this.isExpand) {
				return
			}
			this.isExpand = !this.isExpand
			if (this.isExpand) {
				inputElement.focus()
			}
		},
		handleCheck(item) {
			this.search = ""
			let index = this.ids.findIndex((element) => element === item.id)
			if (index > -1) {
				this.ids.splice(index, 1)
				this.list.splice(index, 1)
			} else {
				this.ids.push(item.id)
				this.list.push(item.name)
			}
		},
		//关闭
		handleClose(index) {
			this.ids.splice(index, 1)
			this.list.splice(index, 1)
		},
		//获取战例下拉数据
		async getWarfareExamples() {
			this.loading = true
			const { data } = await dropDownWarfareExamples()
			// const { rows: data } = await listWarfareExamples({ pageNum: 1, pageSize: 100 })
			this.options = Object.freeze(data)
			this.searchOption = Object.freeze(data)
			this.loading = false
		},
		//搜索
		handleSearch() {
			this.searchOption = Object.freeze(
				this.options.filter((item) => item.name.includes(this.search)).slice(0, 100) // 限制最多100条结果
			)
		},
		async updateList(ids) {
			if (this.options.length === 0) {
				await this.getWarfareExamples()
			}
			await this.setList(ids)
		},
		setList(ids) {
			this.list = this.options.filter((item) => ids.includes(item.id)).map((item) => item.name)
		},
		close() {
			this.search = ""
			this.list = []
			this.ids = []
		},
	},
}
</script>

<style lang="scss">
.virtual_scroller {
	width: 100%;
	min-width: 240px;
	z-index: 1;
	.title {
		width: 100%;
		min-height: 40px;
		line-height: 40px;
		background-color: rgba(0, 84, 251, 0.2);
		border-radius: 4px;
		border: 1px solid rgb(112, 160, 255);
		box-sizing: border-box;
		color: #fff;
		padding: 5px 15px;
		padding-right: 30px;
		transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
		cursor: pointer;
		position: relative;
		.el-icon-arrow-down {
			transition: transform 0.3s;
			transform: rotate(0deg);
			position: absolute;
			right: 10px;
			top: 10px;
		}
	}
	.active {
		// border-color: #409eff;
		.el-icon-arrow-down {
			transform: rotate(180deg);
		}
	}
	.value {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 5px;
		width: 100%;
		height: 100%;
		.el-input {
			width: 100px;
			line-height: 22px;
		}
		.el-input__inner {
			border: none;
			height: 24px;
			line-height: 22px;
			padding: 0;
			background-color: transparent;
		}
		.el-tag.el-tag--info {
			color: #fff;
			background: rgba(0, 17, 50, 1);
			border-color: rgb(112, 160, 255);
		}
	}
	.el-tag {
		height: 24px;
		line-height: 22px;
	}
}
.down {
	width: 100%;
	height: 400px;
	position: absolute;
	bottom: -405px;
	left: 0;
	background-color: #fff;
	border-radius: 4px;
	padding: 6px 0;
	box-sizing: border-box;
	border: 1px solid #e4e7ed;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	z-index: 1;
}
.virtual_dropdown {
	width: 100%;
	height: 100%;
}
.list-item {
	height: 34px;
	line-height: 34px;
	color: #606266;
	padding: 0 20px;
	font-size: 14px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	box-sizing: border-box;
	&:hover {
		background-color: #f5f7fa;
	}
	&.active {
		color: #409eff;
	}
}
</style>
