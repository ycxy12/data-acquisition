<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="战例名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入战例名称"></el-input>
			</el-form-item>
			<el-form-item label="战例标题" prop="title">
				<el-input v-model="ruleForm.title" placeholder="请输入战例标题"></el-input>
			</el-form-item>
			<el-form-item label="所属战争" prop="warfareId">
				<el-select v-model="ruleForm.warfareId" placeholder="请选择所属战争" clearable style="width: 100%">
					<el-option v-for="item in WarfareList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="分类标签" prop="classifyLabel">
				<el-input v-model="ruleForm.classifyLabel" placeholder="请输入分类标签"></el-input>
			</el-form-item>
			<el-form-item label="装备标签" prop="equipLabel">
				<el-input v-model="ruleForm.equipLabel" placeholder="请输入装备标签"></el-input>
			</el-form-item>
			<el-form-item label="交战时间" prop="fightTime">
				<el-date-picker
					v-model="ruleForm.fightTime"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="请输入交战时间"
					style="width: 100%"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="交战地点" prop="fightAddress">
				<el-input v-model="ruleForm.fightAddress" placeholder="请输入交战地点"></el-input>
			</el-form-item>
			<el-form-item label="地点经度" prop="jd">
				<el-input v-model="ruleForm.jd" placeholder="请输入地点经度"></el-input>
			</el-form-item>
			<el-form-item label="地点纬度" prop="wd">
				<el-input v-model="ruleForm.wd" placeholder="请输入地点纬度"></el-input>
			</el-form-item>
			<el-form-item label="攻方" prop="aggressor">
				<el-input v-model="ruleForm.aggressor" placeholder="请输入攻方"></el-input>
			</el-form-item>
			<el-form-item label="守方" prop="defense">
				<el-input v-model="ruleForm.defense" placeholder="请输入守方"></el-input>
			</el-form-item>
			<el-form-item label="攻方兵力" prop="aggressorTroops">
				<el-input v-model="ruleForm.aggressorTroops" placeholder="请输入攻方兵力"></el-input>
			</el-form-item>
			<el-form-item label="守方兵力" prop="defenseTroops">
				<el-input v-model="ruleForm.defenseTroops" placeholder="请输入守方兵力"></el-input>
			</el-form-item>
			<el-form-item label="攻方主要装备" prop="aggressorEquip">
				<el-input v-model="ruleForm.aggressorEquip" placeholder="请输入攻方主要装备"></el-input>
			</el-form-item>
			<el-form-item label="守方主要装备" prop="defenseEquip">
				<el-input v-model="ruleForm.defenseEquip" placeholder="请输入守方主要装备"></el-input>
			</el-form-item>
			<el-form-item label="环境因素" prop="environmentalFactor">
				<el-input v-model="ruleForm.environmentalFactor" placeholder="请输入环境因素"></el-input>
			</el-form-item>
			<el-form-item label="作战外部条件" prop="externalConditions">
				<el-input v-model="ruleForm.externalConditions" placeholder="请输入作战外部条件"></el-input>
			</el-form-item>
			<el-form-item label="作战过程" prop="process">
				<el-input v-model="ruleForm.process" placeholder="请输入作战过程"></el-input>
			</el-form-item>
			<el-form-item label="典型战术" prop="tactics">
				<el-input v-model="ruleForm.tactics" placeholder="请输入典型战术"></el-input>
			</el-form-item>
			<el-form-item label="战损及战果" prop="warResult">
				<el-input v-model="ruleForm.warResult" placeholder="请输入战损及战果"></el-input>
			</el-form-item>

			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addWarfareExamples, editWarfareExamples, getWarfareExamplesByid } from "@/api/home/war"
import { dropDownQbWarfare } from "@/api/resource/war"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入战例名称", trigger: "blur" }],
				title: [{ required: true, message: "请输入战例标题", trigger: "blur" }],
			},
			WarfareList: [],
		}
	},
	mounted() {
		//获取所属战争下拉框
		this.getWarfare()
	},
	methods: {
		async openDrawer(id) {
			if (id) {
				const { data } = await getWarfareExamplesByid(id)
				this.ruleForm = data
			}
			this.drawer = true
		},
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
			this.$refs.ruleForm.resetFields()
		},
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					if (this.ruleForm.id) {
						await editWarfareExamples(this.ruleForm)
					} else {
						await addWarfareExamples(this.ruleForm)
					}
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
		//获取所属战争下拉框
		async getWarfare() {
			const { data } = await dropDownQbWarfare()
			this.WarfareList = data
		},
	},
}
</script>

<style lang="scss" scoped></style>
