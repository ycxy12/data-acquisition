<template>
	<div>
		<Tabs v-model="active" />
		<Equipment v-if="active === 0" />
		<Troops v-if="active === 1" />
		<War v-if="active === 2" />
	</div>
</template>

<script>
import Tabs from "./components/Tabs.vue"
import Equipment from "./Equipment/index.vue"
import Troops from "./Troops/index.vue"
import War from "./War/index.vue"

export default {
	components: { Tabs, Equipment, Troops, War },
	data() {
		return {
			active: 2,
		}
	},
	methods: {},
}
</script>

<style lang="scss" scoped></style>
