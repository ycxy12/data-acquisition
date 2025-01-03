<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" append-to-body  :before-close="handleClose">
		<div class="view">
			<div>
				<label>名称：</label>
				<p>{{ ruleForm.name || "--" }}</p>
			</div>

			<div>
				<label>数量：</label>
				<p>{{ ruleForm.num || "--" }}</p>
			</div>
			<div>
				<label>性能参数：</label>
				<p>{{ ruleForm.parameter || "--" }}</p>
			</div>
			<div>
				<label>备注：</label>
				<p>{{ ruleForm.remark || "--" }}</p>
			</div>
		</div>
	</el-drawer>
</template>

<script>
import { getZbModuleByid } from "@/api/home/module"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
		}
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			const { data } = await getZbModuleByid(id)
			this.ruleForm = data
			this.drawer = true
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
		},
	},
}
</script>

<style lang="scss" scoped>
.view {
	& > div {
		display: flex;
		margin-bottom: 10px;
		label {
			width: 100px;
			text-align: right;
			margin-right: 10px;
			line-height: 30px;
			color: #fff;
		}
		p {
			flex: 1;
			margin: 0;
			line-height: 30px;
			color: #fff;
		}
	}
}
</style>
