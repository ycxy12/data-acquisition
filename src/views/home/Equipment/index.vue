<template>
	<div class="equipment">
		<Tree @updateId="handleUpdateId" />
		<Table :equipmentTypeId="equipmentTypeId" />
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
			equipmentTypeId: undefined,
		}
	},
	methods: {
		handleUpdateId(equipmentTypeId) {
			this.equipmentTypeId = equipmentTypeId
		},
	},
}
</script>
<style lang="scss" scoped>
.equipment {
	display: flex;
}
</style>
