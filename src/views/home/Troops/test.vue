<template>
	<div class="virtual_scroller">
		<div class="title" :class="{ active: isExpand }" @click="handleClick">
			<template>
				<div class="value">
					<el-tag v-for="item in list" :key="item" type="info" closable>{{ item }}</el-tag>
				</div>
				<i class="el-icon-arrow-down"></i>
			</template>
			<div class="down" v-show="isExpand" @click.stop>
				<RecycleScroller :items="options" :item-size="34" :buffer="1000" key-field="id" class="virtual_dropdown">
					<template v-slot="{ item }">
						<div class="list-item" @click="handleCheck(item.label)" :class="{ active: list.includes(item.label) }">{{ item.label }}</div>
					</template>
				</RecycleScroller>
			</div>
		</div>
	</div>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller"
import "vue-virtual-scroller/dist/vue-virtual-scroller.css"

export default {
	name: "VirtualScroller",
	components: { RecycleScroller },
	data() {
		return {
			list: [],
			options: Array.from({ length: 1000 }, (_, index) => ({
				id: index,
				label: `Option ${index + 1}`,
				value: index + 1,
			})),
			isExpand: false,
		}
	},
	mounted() {
		console.log(this.options)
	},
	methods: {
		handleClick() {
			this.isExpand = !this.isExpand
		},
		handleCheck(value) {
			let index = this.list.findIndex((item) => item === value)
			if (index > -1) {
				this.list.splice(index, 1)
			} else {
				this.list.push(value)
			}
		},
	},
}
</script>

<style lang="scss">
.virtual_scroller {
	width: 240px;
	.title {
		width: 100%;
		min-height: 40px;
		line-height: 40px;
		background-color: #fff;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		box-sizing: border-box;
		color: #606266;
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
		border-color: #409eff;
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
	&:hover,
	&.active {
		background-color: #f5f7fa;
	}
}
</style>
