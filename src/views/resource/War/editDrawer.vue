<template>
	<el-drawer title="详情" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="战争名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入战争名称"></el-input>
			</el-form-item>
			<el-form-item label="开始时间" prop="startTime">
				<el-date-picker
					v-model="ruleForm.startTime"
					type="date"
					value-format="yyyy-MM-dd 00:00:00"
					placeholder="选择开始时间"
					style="width: 100%"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间" prop="endTime">
				<el-date-picker
					v-model="ruleForm.endTime"
					type="date"
					value-format="yyyy-MM-dd 00:00:00"
					placeholder="选择结束时间"
					style="width: 100%"
				></el-date-picker>
			</el-form-item>

			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addQbWarfare, editQbWarfare, getQbWarfareByid } from "@/api/resource/war"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入战争名称", trigger: "blur" }],
				endTime: [
					{
						validator: this.validateEndTime,
						trigger: "change",
					},
				],
			},
		}
	},
	methods: {
		async openDrawer(id) {
			if (id) {
				const { data } = await getQbWarfareByid(id)
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
						await editQbWarfare(this.ruleForm)
					} else {
						await addQbWarfare(this.ruleForm)
					}
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
		validateEndTime(rule, value, callback) {
			const startTime = new Date(this.ruleForm.startTime).getTime()
			const endTime = new Date(value).getTime()
			if (!value || !startTime) {
				callback(new Error("请先选择开始时间"))
			} else if (endTime < startTime) {
				callback(new Error("结束时间不能小于开始时间"))
			} else {
				callback()
			}
		},
	},
}
</script>
