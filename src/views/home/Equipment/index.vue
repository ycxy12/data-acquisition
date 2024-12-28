<template>
	<div class="equipment">
		<Tree @updateId="handleUpdateId" />
		<InfoTable v-if="isEquipment" :equipmentTypeId="id" />
		<ModuleTable v-else :equipmentId="id" />
	</div>
</template>

<script>
import Tree from "./tree.vue"
import InfoTable from "./Info/index.vue"
import ModuleTable from "./Module/index.vue"

export default {
	name: "Equipment",
	components: { Tree, InfoTable, ModuleTable },
	data() {
		return {
			id: undefined,
			isEquipment: true,
		}
	},
	methods: {
		handleUpdateId(node) {
			console.log(node)
			if (node.isLeaf) this.isEquipment = false
			else this.isEquipment = true
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
