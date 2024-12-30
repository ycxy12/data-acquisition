<template>
	<div>
		<Tabs v-model="active" />
		<Subject />
	</div>
</template>

<script>
import Tabs from "./components/Tabs.vue"
import Subject from "./Subject/index.vue"

export default {
	components: { Tabs, Subject },
	data() {
		return {
			active: 0,
		}
	},
}
</script>
