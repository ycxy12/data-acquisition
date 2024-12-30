<template>
	<div class="equipment">
		<Tree @updateId="handleUpdateId" />
		<Table :countryId="countryId" />
	</div>
</template>

<script>
import Tree from "./tree.vue"
import Table from "./table1.vue"

export default {
	name: "Equipment",
	components: { Tree, Table },
	data() {
		return {
			countryId: undefined,
		}
	},
	methods: {
		handleUpdateId(countryId) {
			this.countryId = countryId
		},
	},
}
</script>
<style lang="scss" scoped>
.equipment {
	display: flex;
}
</style>
