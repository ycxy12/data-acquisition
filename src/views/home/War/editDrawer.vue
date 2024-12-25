<template>
	<el-drawer title="我是标题" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<span>我来啦!</span>
	</el-drawer>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
		}
	},
	methods: {
		openDrawer(row) {
			this.drawer = true
		},
		handleClose() {
			this.drawer = false
		},
	},
}
</script>

<style lang="scss" scoped></style>
