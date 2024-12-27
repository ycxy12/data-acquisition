<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="战例名称" prop="name">
				<el-input v-if="isEdit" v-model="ruleForm.name"></el-input>
				<span v-else>{{ ruleForm.name }}</span>
			</el-form-item>
			<el-form-item label="所属战争" prop="war">
				<el-input v-if="isEdit" v-model="ruleForm.war"></el-input>
				<span v-else>{{ ruleForm.war }}</span>
			</el-form-item>
			<el-form-item label="发生时间" prop="time">
				<el-date-picker v-if="isEdit" v-model="ruleForm.time" type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
				<span v-else>{{ ruleForm.time }}</span>
			</el-form-item>
			<el-form-item label="发生地点" prop="location">
				<el-input v-if="isEdit" v-model="ruleForm.location"></el-input>
				<span v-else>{{ ruleForm.location }}</span>
			</el-form-item>
			<el-form-item label="攻方" prop="attackSide">
				<el-input v-if="isEdit" v-model="ruleForm.attackSide"></el-input>
				<span v-else>{{ ruleForm.attackSide }}</span>
			</el-form-item>
			<el-form-item label="守方" prop="defenseSide">
				<el-input v-if="isEdit" v-model="ruleForm.defenseSide"></el-input>
				<span v-else>{{ ruleForm.defenseSide }}</span>
			</el-form-item>
			<div class="drawer-footer" v-if="isEdit">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			isEdit: false,
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入战例名称", trigger: "blur" }],
				war: [{ required: true, message: "请输入所属战争", trigger: "blur" }],
				time: [{ required: true, message: "请选择发生时间", trigger: "change" }],
				location: [{ required: true, message: "请输入发生地点", trigger: "blur" }],
			},
		}
	},
	methods: {
		openDrawer(row, type) {
			if (type === "edit") this.isEdit = true
			else this.isEdit = false

			this.ruleForm = row
			this.drawer = true
		},
		handleClose() {
			this.drawer = false
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert("submit!")
				} else {
					console.log("error submit!!")
					return false
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped></style>
