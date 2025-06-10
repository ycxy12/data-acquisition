<template>
	<div>
		<Tabs v-if="!getUserId" />
		<router-view></router-view>
	</div>
</template>

<script>
import Tabs from "./components/Tabs.vue"
import { mapGetters } from "vuex"

export default {
	components: { Tabs },
	computed: {
		...mapGetters(["getUserId", "getRoleName"]),
	},
	mounted() {
		console.log(this.getUserId, "getUserId")
	},
}
</script>
