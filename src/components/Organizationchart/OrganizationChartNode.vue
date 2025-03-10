<template>
	<table class="p-organizationchart-table">
		<tbody>
			<tr v-if="node">
				<td :colspan="colspan">
					<div :class="nodeContentClass" @click="onNodeClick">
						<OrganizationChartNodeTemplate :node="node" :template="templates[node.type] || templates['default']" />
						<a v-if="toggleable" tabindex="0" class="p-node-toggler" @click="toggleNode" @keydown.enter="toggleNode">
							<!-- <i class="p-node-toggler-icon pi" :class="{ 'el-icon-arrow-down': expanded, 'el-icon-arrow-up': !expanded }"></i> -->
							<svg-icon v-if="expanded" name="retract" class="p-node-toggler-icon"></svg-icon>
							<svg-icon v-else name="expand" class="p-node-toggler-icon"></svg-icon>
						</a>
					</div>
				</td>
			</tr>
			<tr :style="childStyle" class="p-organizationchart-lines">
				<td :colspan="colspan">
					<div class="p-organizationchart-line-down"></div>
				</td>
			</tr>
			<tr :style="childStyle" class="p-organizationchart-lines">
				<template v-if="node.children && node.children.length === 1">
					<td :colspan="colspan">
						<div class="p-organizationchart-line-down"></div>
					</td>
				</template>
				<template v-if="node.children && node.children.length > 1">
					<template v-for="(child, i) of node.children">
						<td :key="child.key + '_left'" class="p-organizationchart-line-left" :class="{ 'p-organizationchart-line-top': !(i === 0) }">
							&nbsp;
						</td>
						<td
							:key="child.key + '_right'"
							class="p-organizationchart-line-right"
							:class="{ 'p-organizationchart-line-top': !(i === node.children.length - 1) }"
						>
							&nbsp;
						</td>
					</template>
				</template>
			</tr>
			<tr :style="childStyle" class="p-organizationchart-nodes">
				<td v-for="child of node.children" :key="child.key" colspan="2">
					<sub-node
						:node="child"
						:templates="templates"
						:collapsedKeys="collapsedKeys"
						@node-toggle="onChildNodeToggle"
						:collapsible="collapsible"
						:selectionMode="selectionMode"
						:selectionKeys="selectionKeys"
						@node-click="onChildNodeClick"
					/>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import DomHandler from "@/utils/DomHandler"

const OrganizationChartNodeTemplate = {
	functional: true,
	props: {
		node: {
			type: null,
			default: null,
		},
		template: {
			type: null,
			default: null,
		},
	},
	render(createElement, context) {
		const content = context.props.template({
			node: context.props.node,
		})
		return [content]
	},
}

export default {
	name: "sub-node",
	props: {
		node: {
			type: null,
			default: null,
		},
		templates: {
			type: null,
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
		selectionKeys: {
			type: null,
			default: null,
		},
		selectionMode: {
			type: String,
			default: null,
		},
	},
	methods: {
		onNodeClick(event) {
			if (DomHandler.hasClass(event.target, "p-node-toggler") || DomHandler.hasClass(event.target, "p-node-toggler-icon")) {
				return
			}

			if (this.selectionMode) {
				this.$emit("node-click", this.node)
			}
		},
		onChildNodeClick(node) {
			this.$emit("node-click", node)
		},
		toggleNode() {
			this.$emit("node-toggle", this.node)
		},
		onChildNodeToggle(node) {
			this.$emit("node-toggle", node)
		},
	},
	computed: {
		nodeContentClass() {
			return [
				"p-organizationchart-node-content",
				this.node.styleClass,
				{ "p-organizationchart-selectable-node": this.selectable, "p-highlight": this.selected },
			]
		},
		leaf() {
			return this.node.leaf === false ? false : !(this.node.children && this.node.children.length)
		},
		colspan() {
			return this.node.children && this.node.children.length ? this.node.children.length * 2 : null
		},
		childStyle() {
			return {
				visibility: !this.leaf && this.expanded ? "inherit" : "hidden",
			}
		},
		expanded() {
			return this.collapsedKeys[this.node.key] === undefined
		},
		selectable() {
			return this.selectionMode && this.node.selectable !== false
		},
		selected() {
			return this.selectable && this.selectionKeys && this.selectionKeys[this.node.key] === true
		},
		toggleable() {
			return this.collapsible && this.node.collapsible !== false && !this.leaf
		},
	},
	components: {
		OrganizationChartNodeTemplate: OrganizationChartNodeTemplate,
	},
}
</script>
<style lang="scss">
// .pi {
// 	font-family: "primeicons";
// 	speak: none;
// 	font-style: normal;
// 	font-weight: normal;
// 	font-variant: normal;
// 	text-transform: none;
// 	line-height: 1;
// 	display: inline-block;
// 	-webkit-font-smoothing: antialiased;
// 	-moz-osx-font-smoothing: grayscale;
// }
</style>
