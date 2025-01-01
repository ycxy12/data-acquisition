<template>
	<div class="equipment">
		<Tree @updateId="handleUpdateId" />
		<Table :equipmentTypeId="id" />
	</div>
</template>

<script>
import Tree from "./tree.vue"
import Table from "./table.vue"

export default {
	name: "Equipment",
	components: { Tree, Table },
	data() {
		return {
			id: undefined,
		}
	},
	methods: {
		handleUpdateId(node) {
			this.id = node.id
		},
	},
}
</script>
<style lang="scss" scoped>
.equipment {
	display: flex;
}
</style>
