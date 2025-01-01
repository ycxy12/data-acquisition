<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<div class="view">
			<div>
				<label>装备名称：</label>
				<p>{{ ruleForm.name || "--" }}</p>
			</div>
			<div>
				<label>装备特征：</label>
				<!-- <p>{{ ruleForm.feature || "--" }}</p> -->
				<el-table :data="ruleForm.attrs" border>
					<el-table-column prop="attrName" label="属性" />
					<el-table-column prop="value" label="属性值" class-name="attrs">
						<template slot-scope="{ row }">
							<div class="attr_cell">
								<div v-for="item in row.attrs" :key="item">{{ item }}</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div>
				<label>装备类型：</label>
				<p>{{ getEquipmentTypeName(ruleForm.type) }}</p>
			</div>
			<div>
				<label>研制国家/地区：</label>
				<p>{{ getCountryName(ruleForm.sourceCountryId) }}</p>
			</div>
			<div>
				<label>研制时间：</label>
				<p>{{ ruleForm.devTime || "--" }}</p>
			</div>
			<div>
				<label>服役时间：</label>
				<p>{{ ruleForm.attendedTime || "--" }}</p>
			</div>
			<div>
				<label>备注：</label>
				<p>{{ ruleForm.remark || "--" }}</p>
			</div>
		</div>
	</el-drawer>
</template>

<script>
import { getZbInfoByid } from "@/api/home/equipment"
import { listZbType } from "@/api/resource/equipment"
import { listCountry } from "@/api/resource/country"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			countryOptions: [],
			equimentTypeOptions: [],
		}
	},
	mounted() {
		this.getEquipmentType()
		this.getCountry()
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			const { data } = await getZbInfoByid(id)
			this.ruleForm = data
			this.drawer = true
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
		},
		//获取装备类型
		async getEquipmentType() {
			const { data } = await listZbType()
			this.equimentTypeOptions = data
		},
		//获取国家/地区
		async getCountry() {
			const { data } = await listCountry()
			this.countryOptions = data
		},
		//获取装备类型名称
		getEquipmentTypeName(id) {
			return this.equimentTypeOptions.find((item) => item.id === id)?.name || "--"
		},
		//获取国家/地区名称
		getCountryName(id) {
			return this.countryOptions.find((item) => item.id === id)?.name || "--"
		},
		//合并表格
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				if (rowIndex % 2 === 0) {
					return {
						rowspan: 2,
						colspan: 1,
					}
				} else {
					return {
						rowspan: 0,
						colspan: 0,
					}
				}
			}
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
			width: 120px;
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
	::v-deep .attrs {
		padding: 0;
	}
	::v-deep .cell {
		padding: 0;
	}
	.attr_cell {
		& > div {
			padding: 8px 10px;
			border-bottom: 1px solid #ebeef5;
		}
		& > div:last-child {
			border-bottom: none;
		}
	}
}
</style>
