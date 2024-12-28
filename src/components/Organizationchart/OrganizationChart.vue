<template>
	<div class="p-organizationchart p-component">
		<OrganizationChartNode
			:node="value"
			:templates="$scopedSlots"
			@node-toggle="onNodeToggle"
			:collapsedKeys="d_collapsedKeys"
			:collapsible="collapsible"
			@node-click="onNodeClick"
			:selectionMode="selectionMode"
			:selectionKeys="selectionKeys"
		/>
	</div>
</template>

<script>
import OrganizationChartNode from "./OrganizationChartNode"

export default {
	props: {
		value: {
			type: null,
			default: null,
		},
		selectionKeys: {
			type: null,
			default: null,
		},
		selectionMode: {
			type: String,
			default: null,
		},
		collapsible: {
			type: Boolean,
			default: false,
		},
		collapsedKeys: {
			type: null,
			default: null,
		},
	},
	data() {
		return {
			d_collapsedKeys: this.collapsedKeys || {},
		}
	},
	watch: {
		collapsedKeys(newValue) {
			this.d_collapsedKeys = newValue
		},
	},
	methods: {
		onNodeClick(node) {
			const key = node.key

			if (this.selectionMode) {
				let _selectionKeys = this.selectionKeys ? { ...this.selectionKeys } : {}

				if (_selectionKeys[key]) {
					delete _selectionKeys[key]
					this.$emit("node-unselect", node)
				} else {
					if (this.selectionMode === "single") {
						_selectionKeys = {}
					}

					_selectionKeys[key] = true
					this.$emit("node-select", node)
				}

				this.$emit("update:selectionKeys", _selectionKeys)
			}
		},
		onNodeToggle(node) {
			const key = node.key

			if (this.d_collapsedKeys[key]) {
				delete this.d_collapsedKeys[key]
				this.$emit("node-expand", node)
			} else {
				this.d_collapsedKeys[key] = true
				this.$emit("node-collapse", node)
			}

			this.d_collapsedKeys = { ...this.d_collapsedKeys }
			this.$emit("update:collapsedKeys", this.d_collapsedKeys)
		},
	},
	components: {
		OrganizationChartNode: OrganizationChartNode,
	},
}
</script>

<style>
.p-organizationchart .p-organizationchart-node-content.p-highlight {
	background: #007bff;
	color: #ffffff;
}
.p-organizationchart .p-organizationchart-node-content.p-highlight .p-node-toggler i {
	color: #003e80;
}
.p-organizationchart .p-organizationchart-line-down {
	background: #dee2e6;
}
.p-organizationchart .p-organizationchart-line-left {
	border-right: 1px solid #dee2e6;
	border-color: #dee2e6;
}
.p-organizationchart .p-organizationchart-line-top {
	border-top: 1px solid #dee2e6;
	border-color: #dee2e6;
}
.p-organizationchart .p-organizationchart-node-content {
	border: 1px solid #dee2e6;
	background: #ffffff;
	color: #212529;
	padding: 1.25rem;
}
.p-organizationchart .p-organizationchart-node-content .p-node-toggler {
	background: inherit;
	color: inherit;
	border-radius: 50%;
}

.p-organizationchart-table {
	border-spacing: 0;
	border-collapse: separate;
	margin: 0 auto;
}

.p-organizationchart-table > tbody > tr > td {
	text-align: center;
	vertical-align: top;
	padding: 0 0.75rem;
}

.p-organizationchart-node-content {
	display: inline-block;
	position: relative;
}

.p-organizationchart-node-content .p-node-toggler {
	position: absolute;
	bottom: -1rem;
	margin-left: -0.5rem;
	z-index: 2;
	left: 50%;
	user-select: none;
	cursor: pointer;
	width: 1rem;
	height: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
}

.p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon {
	width: 1rem;
	height: 1rem;
}

.p-organizationchart-line-down {
	margin: 0 auto;
	height: 40px;
	width: 1px;
}

.p-organizationchart-line-right {
	border-radius: 0px;
}

.p-organizationchart-line-left {
	border-radius: 0;
}

.p-organizationchart-selectable-node {
	cursor: pointer;
}
</style>
