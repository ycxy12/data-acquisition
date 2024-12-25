<template>
	<div class="sub_menu">
		<template v-for="subItem in menuList">
			<el-sub-menu v-if="subItem.children?.length" :index="subItem.path" :key="subItem.path">
				<template #title>
					<el-icon v-if="subItem.meta.icon">
						<component :is="subItem.meta.icon"></component>
					</el-icon>
					<span class="sle">{{ subItem.meta.title }}</span>
				</template>
				<sub-menu :menu-list="subItem.children" />
			</el-sub-menu>
			<el-menu-item v-else :index="subItem.path" :key="subItem.name" @click="handleClickMenu(subItem)">
				<el-icon v-if="subItem.meta.icon">
					<component :is="subItem.meta.icon"></component>
				</el-icon>
				<template #title>
					<span class="sle">{{ subItem.meta.title }}</span>
				</template>
			</el-menu-item>
		</template>
	</div>
</template>

<script>
export default {
	name: "SubMenu",
	props: {
		menuList: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {}
	},
	methods: {
		handleClickMenu(subItem) {
			if (this.$route.path === subItem.path) return
			this.$router.push(subItem.path)
		},
	},
}
</script>

<style lang="scss" scoped>
.sub_menu {
	display: flex;
	height: 100%;
}
.el-menu-item.is-active {
	border-bottom: 2px solid;
}
.el-menu-item:focus,
.el-menu-item:hover {
	background-color: transparent;
}
.el-menu-item,
.el-submenu__title {
	height: 64px;
	line-height: 64px;
	font-size: 17px;
}
</style>
