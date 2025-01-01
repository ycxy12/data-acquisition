<template>
	<div class="equipment">
		<Tree @updateId="handleUpdateId" />
		<Table :equipmentId="id" />
	</div>
</template>

<script>
import Tree from "./tree.vue"
import Table from "./table.vue"

export default {
	name: "EquipmentInfo",
	components: { Tree, Table },
	data() {
		return {
			id: undefined,
		}
	},
	methods: {
		handleUpdateId(id) {
			this.id = id
		},
	},
}
</script>
<style lang="scss" scoped>
.equipment {
	display: flex;
}
</style>
