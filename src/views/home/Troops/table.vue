<template>
	<div class="container table">
		<div class="btn">
			<el-button icon="el-icon-download" type="primary" @click="handleExport">情报资源导出</el-button>
		</div>
		<OrganizationChart
			ref="organizationChart"
			:value="countryData"
			:collapsible="true"
			class="company"
			selectionMode="single"
			:selectionKeys.sync="selection"
			@node-select="onNodeSelect"
			@node-unselect="onNodeUnselect"
			@node-collapse="onNodeCollapse"
			@node-expand="onNodeExpand"
		>
			<template #default="slotProps">
				<span>{{ slotProps.node.data.label }}</span>
			</template>
		</OrganizationChart>
	</div>
</template>

<script>
import { listZbInfo, deleteZbInfo, exportUser } from "@/api/home/equipment"
import { downloadBlob } from "@/utils"
import OrganizationChart from "@/components/Organizationchart/OrganizationChart.vue"

export default {
	components: { OrganizationChart },
	props: {
		equipmentTypeId: {
			type: String,
			default: undefined,
		},
	},
	data() {
		return {
			selection: {},
			countryData: {
				key: "0",
				data: { label: "美军" },
				styleClass: "p-country",
				children: Array.from({ length: 2 }, (_, i) => ({
					key: `0_${i}`,
					data: { label: `0_${i} 旅` },
					styleClass: "belong",
					children: Array.from({ length: 4 }, (_, j) => ({
						key: `0_${i}_${j}`,
						data: { label: `0_${i}_${j} 团` },
						styleClass: "belong",
						children: Array.from({ length: 3 }, (_, k) => ({
							key: `0_${i}_${j}_${k}`,
							data: { label: `0_${i}_${j}_${k} 连` },
							styleClass: "belong",
							children: [],
						})),
					})),
				})),
			},
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.scrollToMiddle()
		})
	},
	methods: {
		onNodeSelect(node) {
			// this.$toast.add({ severity: "success", summary: "Node Selected", detail: node.data.label, life: 3000 })
		},
		onNodeUnselect(node) {
			// this.$toast.add({ severity: "success", summary: "Node Unselected", detail: node.data.label, life: 3000 })
		},
		onNodeExpand(node) {
			// this.$toast.add({ severity: "success", summary: "Node Expanded", detail: node.data.label, life: 3000 })
		},
		onNodeCollapse(node) {
			// this.$toast.add({ severity: "success", summary: "Node Collapsed", detail: node.data.label, life: 3000 })
		},
		//导出
		async handleExport() {
			// const { data } = await exportUser()
			// downloadBlob(data, `国家或地区.excel`)
		},
		scrollToMiddle() {
			const container = this.$refs.organizationChart
			const containerEl = container.$el || container
			if (containerEl) {
				const middle = (containerEl.scrollWidth - containerEl.clientWidth) / 2
				console.log(middle)
				console.log(containerEl)
				containerEl.scrollLeft = middle // 直接设置 scrollLeft
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.table {
	flex: 1;
	.btn {
		display: flex;
		justify-content: flex-end;
		padding-bottom: 15px;
		border-bottom: 1px solid #e4e7ed;
	}
}
.company {
	height: calc(100vh - 305px);
	padding: 30px 0 15px;
	overflow-x: auto;
	overflow-y: auto;
}
:deep(.p-organizationchart) {
	.p-country {
		color: #000000;
		font-weight: 600;
		padding: 10px 55px;
		background-color: #d7dcef;
		border: 1px solid #d7dcef;
		border-radius: 4px;
		letter-spacing: 1px;
	}
	.belong {
		color: #000000;
		padding: 1.25rem 10px;
		background-color: #d7dcef;
		border: 1px solid #d7dcef;
		border-radius: 4px;
		writing-mode: vertical-rl;
	}
}
</style>
