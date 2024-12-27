<template>
	<div>
		<Tabs />
		<router-view></router-view>
	</div>
</template>

<script>
import Tabs from "./components/Tabs.vue"

export default {
	components: { Tabs },
}
</script>
