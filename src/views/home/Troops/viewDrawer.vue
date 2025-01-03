<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<div class="relationship">
			<el-button type="primary" size="small" @click="handleEquipmentRelationship">装备关系</el-button>
			<el-button type="primary" size="small" @click="handleWarRelationship">战例关系</el-button>
		</div>
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
		<!-- 设置兵力编程编组 与 装备关系 -->
		<EquipmentRelation ref="equipmentRelationRef" />
		<!-- 设置兵力编程编组 与 战例的关系 -->
		<WarRelation ref="warRelationRef" />
	</el-drawer>
</template>

<script>
import { getBlbcByid } from "@/api/resource/troops"
import { listCountry } from "@/api/resource/country"
import EquipmentRelation from "./equipmentRelation.vue"
import WarRelation from "./warRelation.vue"

export default {
	components: { EquipmentRelation, WarRelation },
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
		//设置兵力编程编组 与 装备关系
		handleEquipmentRelationship() {
			this.$refs.equipmentRelationRef.openDrawer(this.ruleForm.id)
		},
		//设置兵力编程编组 与 战例的关系
		handleWarRelationship() {
			this.$refs.warRelationRef.openDrawer(this.ruleForm.id)
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
.relationship {
	text-align: right;
	margin-bottom: 15px;
}
</style>
