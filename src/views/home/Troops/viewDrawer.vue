<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<div class="view">
			<div>
				<label>部队名称：</label>
				<p>{{ ruleForm.troopsName || "--" }}</p>
			</div>

			<div>
				<label>所属国家：</label>
				<p>{{ getCountryName(ruleForm.countryId) }}</p>
			</div>
			<div>
				<label>简介：</label>
				<p>{{ ruleForm.summary || "--" }}</p>
			</div>
			<div>
				<label>规模(人数)：</label>
				<p>{{ ruleForm.scale || "--" }}</p>
			</div>
			<div>
				<label>军种：</label>
				<p>{{ ruleForm.militaryService || "--" }}</p>
			</div>
			<div>
				<label>常住地：</label>
				<p>{{ ruleForm.domicile || "--" }}</p>
			</div>
		</div>
	</el-drawer>
</template>

<script>
import { getBlbcByid } from "@/api/resource/troops"
import { listCountry } from "@/api/resource/country"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			country: [],
		}
	},
	mounted() {
		this.getCountry()
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			const { data } = await getBlbcByid(id)
			this.ruleForm = data
			this.drawer = true
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
		},
		//获取国家下拉框
		async getCountry() {
			const { data } = await listCountry()
			this.country = data
		},
		//获取国家名称
		getCountryName(id) {
			return this.country.find((item) => item.id === id)?.name || "--"
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
			color: #606266;
		}
		p {
			flex: 1;
			margin: 0;
			line-height: 30px;
			color: #606266;
		}
	}
}
</style>
