<template>
	<div class="container tree" v-loading="loading">
		<h3>{{ typeForm.name }}</h3>
		<div class="list">
			<p v-for="item in lists" :key="item.id" :class="{ active: item.id === active }" @click="handleClick(item)">{{ item.name }}</p>
		</div>
	</div>
</template>

<script>
import { getZbTypeByid } from "@/api/resource/equipment"
import { listZbInfo } from "@/api/home/equipment"
export default {
	data() {
		return {
			active: undefined,
			lists: [],
			typeForm: {},
			loading: false,
		}
	},
	async created() {
		this.loading = true
		await this.getEquipmentType()
		await this.getEquipmentInfo()
		this.loading = false
	},
	watch: {
		active() {
			this.$emit("updateId", this.active)
		},
	},
	methods: {
		//获取 装备类型信息
		async getEquipmentType() {
			const { params } = this.$route
			const { data } = await getZbTypeByid(params.type)
			this.typeForm = data
		},
		//获取装备信息
		async getEquipmentInfo() {
			const { params } = this.$route
			let query = { pageNum: 1, pageSize: 1000, type: params.type }
			const { rows } = await listZbInfo(query)
			this.lists = rows
			this.active = params.id
		},
		//选中
		handleClick(item) {
			this.active = item.id
		},
	},
}
</script>

<style lang="scss" scoped>
.tree {
	width: 280px;
	height: 100%;
	margin-right: 15px;
	h3 {
		margin: 0 15px 10px;
	}
	.list {
		height: calc(100vh - 236px);
		overflow: auto;
		p {
			cursor: pointer;
			padding: 5px 15px;
			margin: 5px;
			color: #606266;
			&:hover {
				background-color: #f0f7ff;
			}
		}
		.active {
			color: #409eff;
			background-color: #f0f7ff;
		}
	}
}
</style>
