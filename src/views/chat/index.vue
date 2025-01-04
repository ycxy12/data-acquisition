<template>
	<div class="qa">
		<Conversation />
		<router-view></router-view>
	</div>
</template>

<script>
import Conversation from "./components/conversation.vue"

export default {
	components: { Conversation },
}
</script>

<style lang="scss" scoped>
.qa {
	height: calc(100vh - 64px);
	display: flex;
	// background-image: url(~@/assets/images/ai-bg.png);
	// background-size: 100% 100%;
	background-color: #172034;
	overflow: hidden;
}
</style>
